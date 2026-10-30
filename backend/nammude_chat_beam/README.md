# Nammude Naadu - WhatsApp-Grade Erlang / BEAM Realtime Chat Gateway 🚀

This is the high-concurrency **Erlang/OTP (BEAM VM)** chat microservice for **Nammude Naadu**, built with Elixir and Phoenix Channels (the exact same architecture that powers WhatsApp and Discord at scale).

## Security status

The current app does not provide a verifiable authentication token to this service. As a result, BEAM socket connections are not authorized to join chat channels; the WebSocket chat features below remain disabled until server-verified authentication and per-thread membership checks are implemented. Deployments currently provide health/status endpoints only. Do not enable channel access based on the `phone` or `user_id` socket parameters; clients can choose those values.

## Key Features
- **Planned:** Ultra-low latency WebSocket message delivery.
- **Planned:** WhatsApp 3-Stage Tick Pipeline:
  - `✔` (Single Gray Tick): Server Received & Acknowledged.
  - `✔✔` (Double Gray Tick): Recipient device received & cached.
  - `✔✔` (Double Blue Tick): Recipient opened & viewed thread.
- **Planned:** Erlang CRDT Presence and live typing indicators.
- **Fault-tolerant runtime:** Uses Erlang OTP supervision trees.

---

## 1-Click Free Cloud Deployment

### Option A: Render.com (Free)
1. Push this repository to GitHub.
2. Go to [render.com](https://render.com) -> New Web Service.
3. Select your repository, set Root Directory to `backend/nammude_chat_beam`.
4. Choose **Docker** as Runtime.
5. Click **Deploy**. You will get an address like `wss://nammude-chat.onrender.com/socket`.

### Option B: Fly.io (Free)
```bash
cd backend/nammude_chat_beam
fly launch
fly deploy
```

---

## Local Development (If Erlang/Elixir installed)
```bash
mix deps.get
mix phx.server
# Server will run on http://localhost:4000 (WebSocket at ws://localhost:4000/socket)
```
