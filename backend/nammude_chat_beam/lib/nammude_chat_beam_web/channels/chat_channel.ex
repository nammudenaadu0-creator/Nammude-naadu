defmodule NammudeChatBeamWeb.ChatChannel do
  @moduledoc """
  Erlang BEAM Actor Channel for Realtime 1-on-1 and Community Messages.
  Implements WhatsApp-style instant delivery, 3-stage delivery receipts (Single, Double, Blue ticks),
  and live typing broadcast.
  """
  use Phoenix.Channel
  alias NammudeChatBeamWeb.Presence

  @impl true
  def join("chat:thread:" <> _thread_key, _payload, socket) do
    reject_unverified_socket(socket)
  end

  def join("chat:lobby", _payload, socket) do
    reject_unverified_socket(socket)
  end

  def join("user:" <> user_target, _payload, socket) do
    if socket.assigns.authenticated do
      join_user_channel(user_target, socket)
    else
      {:error, %{reason: "authentication_required"}}
    end
  end

  defp join_user_channel(user_target, socket) do
    my_clean = String.replace(socket.assigns.phone || "", ~r/\D/, "")
    target_clean = String.replace(user_target, ~r/\D/, "")

    if my_clean == target_clean or socket.assigns.user_id == user_target do
      send(self(), :after_join)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  defp reject_unverified_socket(socket) do
    if socket.assigns.authenticated do
      {:error, %{reason: "thread_authorization_required"}}
    else
      {:error, %{reason: "authentication_required"}}
    end
  end

  @impl true
  def handle_info(:after_join, socket) do
    # Track presence on BEAM CRDT
    {:ok, _} =
      Presence.track(socket, socket.assigns.phone || socket.assigns.user_id || "anonymous", %{
        online_at: inspect(System.system_time(:second)),
        name: socket.assigns.name,
        phone: socket.assigns.phone
      })

    push(socket, "presence_state", Presence.list(socket))

    # Store-and-Forward: Flush pending offline messages for user upon reconnect
    user_phone = socket.assigns.phone || ""
    clean_phone = String.replace(user_phone, ~r/\D/, "")
    if byte_size(clean_phone) > 0 do
      pending_msgs = NammudeChatBeam.OfflineQueue.drain(clean_phone)
      if length(pending_msgs) > 0 do
        Enum.each(pending_msgs, fn msg ->
          push(socket, "chat_message", msg)
        end)
      end
    end

    {:noreply, socket}
  end

  # WhatsApp Step 1: Send Message (Instant Server Ack: Single Tick ✔ + Offline Storage)
  @impl true
  def handle_in("new_msg", payload, socket) do
    msg_id = Map.get(payload, "id") || "msg_#{System.system_time(:millisecond)}"
    now_ms = System.system_time(:millisecond)

    enriched_msg =
      payload
      |> Map.put("id", msg_id)
      |> Map.put_new("timestamp", now_ms)
      |> Map.put_new("senderPhone", socket.assigns.phone)
      |> Map.put_new("senderName", socket.assigns.name)
      |> Map.put("status", "sent")

    # 1. Immediate broadcast to all subscribers of this thread
    broadcast_from!(socket, "chat_message", enriched_msg)

    # 2. Forward to recipient or store in Erlang NoSQL Offline Queue
    recipient_phone = Map.get(payload, "recipientPhone", "") |> String.replace(~r/\D/, "")
    if byte_size(recipient_phone) == 10 do
      # Attempt live broadcast to recipient channel
      NammudeChatBeamWeb.Endpoint.broadcast("user:#{recipient_phone}", "chat_message", enriched_msg)

      # Store in Offline Queue (Store-and-Forward) so message is guaranteed if peer is offline
      NammudeChatBeam.OfflineQueue.push(recipient_phone, enriched_msg)
    end

    # 3. Respond with Server Ack (Single Tick confirmation)
    {:reply, {:ok, %{id: msg_id, status: "sent", timestamp: now_ms}}, socket}
  end

  # WhatsApp Step 2: Recipient Delivered Ack (Double Gray Ticks ✔✔)
  def handle_in("ack_delivered", %{"msg_id" => msg_id} = payload, socket) do
    broadcast_from!(socket, "chat_delivered", %{
      msg_id: msg_id,
      by_phone: socket.assigns.phone,
      delivered_at: System.system_time(:millisecond)
    })

    {:reply, :ok, socket}
  end

  # WhatsApp Step 3: Recipient Read Receipt (Double Blue Ticks ✔✔)
  def handle_in("ack_seen", payload, socket) do
    broadcast_from!(socket, "chat_seen", %{
      chat_key: Map.get(payload, "chat_key"),
      by_phone: socket.assigns.phone,
      seen_at: System.system_time(:millisecond)
    })

    {:reply, :ok, socket}
  end

  # WhatsApp Live Typing Indicator ("Typing...")
  def handle_in("typing", %{"is_typing" => is_typing} = payload, socket) do
    broadcast_from!(socket, "chat_typing", %{
      is_typing: is_typing,
      sender_phone: socket.assigns.phone,
      sender_name: socket.assigns.name,
      chat_key: Map.get(payload, "chat_key")
    })

    {:noreply, socket}
  end

  # WhatsApp Delete For Everyone
  def handle_in("delete_msg", _payload, socket) do
    {:reply, {:error, %{reason: "message_deletion_not_supported"}}, socket}
  end
end
