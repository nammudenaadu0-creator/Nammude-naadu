defmodule NammudeChatBeamWeb.Router do
  use Phoenix.Router
  import Plug.Conn

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", NammudeChatBeamWeb do
    pipe_through :api

    get "/health", HealthController, :check
    get "/status", HealthController, :status
  end

  # Fallback error handler
  def call(conn, _opts) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{
      service: "Nammude Naadu Erlang/BEAM Chat Gateway",
      status: "online",
      engine: "Erlang/OTP + Phoenix",
      time: DateTime.utc_now()
    }))
  end
end
