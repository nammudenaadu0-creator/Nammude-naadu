# Nammude Naadu - WhatsApp-Grade Erlang / BEAM Realtime Chat Gateway 🚀

This is the high-concurrency **Erlang/OTP (BEAM VM)** chat microservice for **Nammude Naadu**, built with Elixir and Phoenix Channels (the exact same architecture that powers WhatsApp and Discord at scale).

## Key Features
- **Ultra-low latency (sub-5ms)** WebSocket message delivery.
- **WhatsApp 3-Stage Tick Pipeline:**
  - `✔` (Single Gray Tick): Server Received & Acknowledged.
  - `✔✔` (Double Gray Tick): Recipient device received & cached.
  - `✔✔` (Double Blue Tick): Recipient opened & viewed thread.
- **Erlang CRDT Presence:** Real-time Online / Offline / Last Seen status.
- **Live Typing Indicator:** Instant streaming of typing state.
- **Fault-tolerant:** Uses Erlang OTP Supervision trees ("Let it crash" philosophy).

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
