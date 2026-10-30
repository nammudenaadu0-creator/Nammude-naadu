defmodule NammudeChatBeamWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "chat:lobby", NammudeChatBeamWeb.ChatChannel
  channel "chat:thread:*", NammudeChatBeamWeb.ChatChannel
  channel "user:*", NammudeChatBeamWeb.ChatChannel

  @impl true
  def connect(params, socket, _connect_info) do
    phone = Map.get(params, "phone", "")
    user_id = Map.get(params, "user_id", "")
    name = Map.get(params, "name", "സുഹൃത്ത്")

    socket =
      socket
      |> assign(:phone, phone)
      |> assign(:user_id, user_id)
      |> assign(:name, name)
      |> assign(:authenticated, false)

    {:ok, socket}
  end

  @impl true
  def id(socket), do: "users_socket:#{socket.assigns.phone || socket.assigns.user_id || "anonymous"}"
end
