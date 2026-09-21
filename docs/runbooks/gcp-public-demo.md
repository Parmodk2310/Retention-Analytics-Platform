# GCP public-demo runbook

## Purpose

This runbook describes the public RetentionOS deployment on Google Compute Engine.

The environment exists for technical demonstration and uses synthetic data. It is not a production
customer workload.

## Public endpoint

- Application: `https://retentionos.34-0-15-46.sslip.io/`
- Liveness: `https://retentionos.34-0-15-46.sslip.io/api/v1/health/live`

## Runtime architecture

The public deployment uses a single Compute Engine VM with six persistent Docker Compose services:

1. Caddy gateway
2. React + Nginx frontend
3. FastAPI backend
4. PostgreSQL
5. Redis Streams
6. Event worker

Only Caddy publishes public host ports. PostgreSQL, Redis, the backend and the event worker remain
on the private Docker network.

Architecture:

    Internet
       |
      HTTPS
       |
     Caddy
       |
    React/Nginx
       |
     FastAPI
       |
       +------------------+
       |                  |
    PostgreSQL       Redis Streams
                          |
                     Event Worker
                          |
                     PostgreSQL

## Production configuration

Production configuration is loaded from `.env.production`.

That file is intentionally excluded from Git and must never be committed.

Important production configuration includes:

- `PUBLIC_HOST`
- `ACME_EMAIL`
- `SECRET_KEY`
- `EVENT_INGEST_KEY`
- database credentials
- allowed origins
- trusted hosts

Generate random secrets with:

    openssl rand -hex 32

## Verify services

From the repository root:

    docker compose       --env-file .env.production       -f compose.production.yml       ps

Expected persistent services:

- backend
- event-worker
- frontend
- gateway
- postgres
- redis

Verify the public liveness endpoint:

    curl -fsS       https://retentionos.34-0-15-46.sslip.io/api/v1/health/live

Expected response:

    {"status":"ok"}

## Realtime event pipeline

The realtime event path is:

    HTTPS request
        |
      FastAPI
        |
    Redis Streams
        |
    Event Worker
        |
    PostgreSQL

Inspect the Redis consumer group with:

    docker compose       --env-file .env.production       -f compose.production.yml       exec -T redis       redis-cli XINFO GROUPS events:ingest

Healthy steady state should show:

    pending = 0
    lag = 0

Pipeline freshness metadata is stored in:

    events:pipeline:freshness

A stale freshness timestamp can simply mean that no realtime producer has sent a recent event.
It does not by itself indicate backlog or worker failure.

## Safe update procedure

1. Pull the reviewed `main` branch.
2. Rebuild only affected services.
3. Recreate dependent proxy services if container addresses change.
4. Wait for health checks.
5. Verify public HTTPS.
6. Verify the primary dashboard workflow.

Example:

    git switch main
    git pull --ff-only origin main

    docker compose       --env-file .env.production       -f compose.production.yml       build backend frontend

    docker compose       --env-file .env.production       -f compose.production.yml       up -d --force-recreate backend frontend gateway

## Data boundary

The public environment contains synthetic users, events, experiments and model outputs.

Displayed revenue, retention, churn and experimentation results are demonstrations and must not be
interpreted as customer outcomes.

## Availability boundary

This is a single-node demo deployment.

It does not provide:

- multi-zone high availability
- managed database failover
- enterprise disaster recovery
- production backup guarantees
- customer-data compliance controls

The repository's AWS Terraform remains a separate reference architecture for a more distributed
cloud deployment model.
