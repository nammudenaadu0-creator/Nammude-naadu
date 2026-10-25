import Config

config :nammude_chat_beam, NammudeChatBeamWeb.Endpoint,
  http: [ip: {0, 0, 0, 0}, port: 4000],
  check_origin: false,
  code_reloader: false,
  debug_errors: true,
  secret_key_base: "dev_secret_key_base_for_nammude_naadu_local_development_must_be_64_bytes_long"
