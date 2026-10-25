defmodule NammudeChatBeam.Application do
  @moduledoc """
  OTP Application for Nammude Naadu WhatsApp-style Realtime Chat Service.
  Runs on Erlang BEAM VM with fault-tolerant supervision trees.
  """
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Telemetry / Metrics
      {Phoenix.PubSub, name: NammudeChatBeam.PubSub},
      # Erlang CRDT Distributed Presence tracker for Online / Last Seen
      NammudeChatBeamWeb.Presence,
      # High-performance NoSQL In-Memory Message Queue for Offline Store-and-Forward
      NammudeChatBeam.OfflineQueue,
      # High-performance HTTP & WebSocket Cowboy Endpoint
      NammudeChatBeamWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: NammudeChatBeam.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    NammudeChatBeamWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
