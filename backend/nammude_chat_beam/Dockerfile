# ==============================================================
# Erlang/OTP + Elixir Multi-Stage Alpine Production Dockerfile
# Builds a lightweight, standalone, self-executing BEAM release
# ==============================================================

# Build Stage
FROM hexpm/elixir:1.15.7-erlang-26.2-alpine-3.18.4 AS build

# Install build dependencies
RUN apk add --no-cache build-base git

WORKDIR /app

# Install Hex and Rebar
RUN mix local.hex --force && \
    mix local.rebar --force

ENV MIX_ENV=prod

# Copy dependency definitions
COPY mix.exs mix.lock* ./
RUN mix deps.get --only $MIX_ENV
RUN mix deps.compile

# Copy application source
COPY config config
COPY lib lib

# Compile and assemble standalone BEAM release
RUN mix compile
RUN mix release

# -------------------------------------------------------------
# Runtime Stage: Minimal Alpine image (contains NO Elixir/Erlang compiler, only release runner)
# -------------------------------------------------------------
FROM alpine:3.18.4 AS app

RUN apk add --no-cache libstdc++ openssl ncurses-libs

WORKDIR /app

ENV MIX_ENV=prod
ENV PORT=4000

# Copy assembled release from build stage
COPY --from=build /app/_build/prod/rel/nammude_chat_beam ./

EXPOSE 4000

# Start Cowboy + Phoenix WebSocket cluster on Erlang BEAM
CMD ["bin/nammude_chat_beam", "start"]
