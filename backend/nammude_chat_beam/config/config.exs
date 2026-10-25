import Config

config :nammude_chat_beam,
  namespace: NammudeChatBeam

config :nammude_chat_beam, NammudeChatBeamWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [json: NammudeChatBeamWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: NammudeChatBeam.PubSub,
  live_view: [signing_salt: "NammudeNaaduSalt2026"]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix, :json_library, Jason

import_config "#{config_env()}.exs"
