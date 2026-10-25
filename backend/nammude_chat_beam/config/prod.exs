import Config

config :nammude_chat_beam, NammudeChatBeamWeb.Endpoint,
  url: [host: System.get_env("PHX_HOST") || "example.com", port: 443, scheme: "https"],
  http: [
    ip: {0, 0, 0, 0},
    port: String.to_integer(System.get_env("PORT") || "4000")
  ],
  secret_key_base: System.get_env("SECRET_KEY_BASE") || "prod_fallback_secret_key_base_for_nammude_naadu_chat_cluster_min_64_bytes",
  server: true,
  check_origin: false

config :logger, level: :info
