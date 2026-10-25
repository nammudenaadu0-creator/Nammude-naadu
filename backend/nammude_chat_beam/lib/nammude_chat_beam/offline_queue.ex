defmodule NammudeChatBeam.OfflineQueue do
  @moduledoc """
  High-Performance Erlang NoSQL Store-and-Forward Message Queue.
  Uses Erlang's in-memory Concurrent ETS/Mnesia Key-Value engine.
  Stores messages when a recipient is offline and flushes them immediately
  over the persistent TCP connection as soon as they come online.
  Once delivered, messages are automatically purged (WhatsApp privacy model).
  """
  use GenServer
  require Logger

  @table_name :nammude_offline_messages_queue

  ## Client API

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @doc """
  Pushes an undelivered message into the recipient's offline queue.
  """
  def push(recipient_phone, message) when is_binary(recipient_phone) do
    clean_phone = String.replace(recipient_phone, ~r/\D/, "")
    if byte_size(clean_phone) > 0 do
      GenServer.cast(__MODULE__, {:enqueue, clean_phone, message})
    end
  end

  @doc """
  Drains and returns all queued messages for a recipient who just came online,
  then purges them from the queue.
  """
  def drain(recipient_phone) when is_binary(recipient_phone) do
    clean_phone = String.replace(recipient_phone, ~r/\D/, "")
    GenServer.call(__MODULE__, {:drain, clean_phone})
  end

  @doc """
  Returns the number of pending messages waiting in the offline queue for a user.
  """
  def pending_count(recipient_phone) when is_binary(recipient_phone) do
    clean_phone = String.replace(recipient_phone, ~r/\D/, "")
    case :ets.lookup(@table_name, clean_phone) do
      [{^clean_phone, queue}] -> length(queue)
      [] -> 0
    end
  end

  ## Server Callbacks (Erlang OTP GenServer)

  @impl true
  def init(_opts) do
    # Create high-concurrency Erlang In-Memory ETS Table (sub-microsecond reads & writes)
    table = :ets.new(@table_name, [
      :set,
      :public,
      :named_table,
      read_concurrency: true,
      write_concurrency: true
    ])

    Logger.info("⚡ [Erlang NoSQL] Offline Message Queue Engine initialized (ETS Engine: #{inspect(table)})")
    {:ok, %{table: table}}
  end

  @impl true
  def handle_cast({:enqueue, phone, message}, state) do
    msg_id = Map.get(message, "id") || "msg_#{System.system_time(:millisecond)}"
    timestamp = Map.get(message, "timestamp") || System.system_time(:millisecond)

    queued_item =
      message
      |> Map.put("queued_offline", true)
      |> Map.put("stored_at", timestamp)

    # Retrieve existing queue or start fresh
    current_queue =
      case :ets.lookup(@table_name, phone) do
        [{^phone, list}] -> list
        [] -> []
      end

    # Prevent duplicate entries of the same message ID
    updated_queue =
      if Enum.any?(current_queue, fn m -> m["id"] == msg_id end) do
        current_queue
      else
        current_queue ++ [queued_item]
      end

    :ets.insert(@table_name, {phone, updated_queue})
    Logger.info("📥 [Offline Queue] Stored message '#{msg_id}' for offline user #{phone}. Queue size: #{length(updated_queue)}")

    {:noreply, state}
  end

  @impl true
  def handle_call({:drain, phone}, _from, state) do
    messages =
      case :ets.lookup(@table_name, phone) do
        [{^phone, list}] ->
          # WhatsApp Privacy Rule: Purge messages from server memory upon delivery!
          :ets.delete(@table_name, phone)
          Logger.info("🚀 [Offline Queue] Flushed and purged #{length(list)} pending messages for #{phone} (User Came Online!)")
          list

        [] ->
          []
      end

    {:reply, messages, state}
  end
end
