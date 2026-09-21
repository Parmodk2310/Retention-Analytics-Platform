# Implementation phases

This ledger records delivered outcomes and the current deployment state. Detailed ownership lives
in the [repository guide](Project_Guide.md).

| Phase | Outcome | Status |
|---|---|---|
| 0 | Monorepo, typed configuration, Compose and health probes | Complete |
| 1 | Synthetic users, events, experiment data and migrations | Complete |
| 2 | SQL-first activity, funnel, cohort, revenue and channel analytics | Complete |
| 3 | React/TypeScript analyst dashboard | Complete |
| 4 | Leakage-safe churn pipeline, artifacts, scores and health | Complete |
| 5 | Assignment, exposure, SRM, inference, power and decisions | Complete |
| 6 | Authentication, validation, limits and security scanning | Complete |
| 7 | Redis Streams reliability, observability and product polish | Complete |
| 8 | Modular AWS Terraform and gated deployment workflow | Complete, reference only |
| 9 | Public single-node cloud demo with HTTPS and operational verification | Complete |

## Phase 7 validation snapshot

The Phase 7 freeze recorded 167 backend tests passing with four skipped, eight frontend tests,
clean security checks, healthy monitoring targets and a 2,000-event reliability benchmark ending
with zero backlog, pending messages and consumer lag.

These are historical validation results, not permanent service-level guarantees.

## Phase 8 — AWS reference architecture

Phase 8 delivered the AWS reference architecture, including network and data boundaries, ECS API
and worker services, ECR, RDS, ElastiCache, load balancing, private object delivery, monitoring,
scheduled tasks, OIDC and gated deployment controls.

The AWS environment is retained as infrastructure-as-code and is not the active public demo.

`AWS_DEPLOY_ENABLED=false` remains the authorization and cost-control gate.

## Phase 9 — Public cloud demo

The original low-cost deployment path targeted Oracle Cloud ARM64 capacity. Those deployment assets
remain in the repository, but Oracle A1 capacity prevented that environment from becoming the
public demo.

The public deployment was completed on Google Compute Engine using the production-oriented
single-node service boundary:

- Caddy HTTPS gateway
- React + Nginx frontend
- FastAPI backend
- PostgreSQL
- Redis Streams
- Event worker

Public HTTPS endpoint:

`https://retentionos.34-0-15-46.sslip.io/`

Verification included:

- external HTTPS access;
- API liveness;
- healthy persistent services;
- realtime event acceptance;
- Redis Streams consumption;
- PostgreSQL persistence;
- zero pending consumer messages;
- zero consumer lag;
- responsive frontend verification;
- protected pull-request workflow;
- backend, frontend and security CI gates.

The public demo is intentionally single-node and uses synthetic data. It is a demonstration
environment, not a highly available customer production deployment.
