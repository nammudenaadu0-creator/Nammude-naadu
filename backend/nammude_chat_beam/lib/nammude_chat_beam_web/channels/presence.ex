defmodule NammudeChatBeamWeb.Presence do
  @moduledoc """
  Provides distributed presence tracking using Erlang BEAM CRDTs.
  Enables WhatsApp-style "Online / Last Seen" indicators across all connected mobile devices.
  """
  use Phoenix.Presence,
    otp_app: :nammude_chat_beam,
    pubsub_server: NammudeChatBeam.PubSub
end
