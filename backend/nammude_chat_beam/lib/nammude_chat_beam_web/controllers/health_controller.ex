defmodule NammudeChatBeamWeb.HealthController do
  use Phoenix.Controller, namespace: NammudeChatBeamWeb
  import Plug.Conn

  def check(conn, _params) do
    json(conn, %{status: "healthy", engine: "Erlang/OTP + BEAM", uptime_ms: :erlang.statistics(:wall_clock) |> elem(0)})
  end

  def status(conn, _params) do
    memory = :erlang.memory()
    process_count = :erlang.system_info(:process_count)

    json(conn, %{
      status: "online",
      vm: "BEAM (Erlang/OTP 26)",
      active_processes: process_count,
      memory_mb: Float.round(memory[:total] / 1_048_576, 2),
      features: ["WhatsApp Double Ticks", "Presence CRDT", "Sub-5ms Messaging", "Voice Chunks"]
    })
  end
end
