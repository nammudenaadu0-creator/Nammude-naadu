defmodule NammudeChatBeamWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :nammude_chat_beam

  # Erlang WebSocket connection point for WhatsApp-speed messaging
  socket "/socket", NammudeChatBeamWeb.UserSocket,
    websocket: [
      timeout: 45_000,
      connect_info: [:peer_data, :x_headers]
    ],
    longpoll: false

  # CORS configuration for cross-origin web/Capacitor requests
  plug CORSPlug, origin: ["*"]

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug NammudeChatBeamWeb.Router
end
