# Portfolio review guide

## Thirty-second summary

RetentionOS is an end-to-end product analytics and ML engineering case study. Behavioral events can
enter through a reliable asynchronous pipeline, PostgreSQL computes inspectable product metrics,
offline ML produces persisted churn scores, and experimentation separates assignment from exposure
before estimating effects.

The public reviewer environment is live at:

`https://retentionos.34-0-15-46.sslip.io/`

It uses synthetic data and is not a production customer workload.

## Five-minute review path

1. Open the live dashboard and review Overview for product-health metrics.
2. Open Funnel and Cohorts to inspect conversion and retention behavior.
3. Open Churn Intelligence to review persisted scores, operational risk bands and reason codes.
4. Open Model Health to inspect temporal evaluation, calibration and threshold policy.
5. Open Experiments to review treatment effect, SRM and analysis health.
6. Open Settings to inspect runtime health and the six-service live deployment.
7. Review `backend/app/analytics/queries/` for SQL-first metric definitions.
8. Review `backend/app/realtime/` and the event worker for delivery semantics.
9. Review `backend/app/ml/` for temporal boundaries, calibration and artifact lineage.
10. Review GitHub Actions, security workflows and Terraform for delivery controls.

## Evidence map

| Claim | Evidence |
|---|---|
| Metrics are not hard-coded in the UI | SQL queries, typed routes and frontend API clients |
| Churn evaluation avoids temporal leakage | Snapshot boundaries, temporal tests and model metadata |
| Churn predictions are persisted | Batch scoring job and churn prediction tables |
| Exposure is modeled correctly | Separate assignment/exposure records and lifecycle validation |
| Event retries are safe | Stable IDs, recovery, ACK-after-commit and database uniqueness |
| Realtime delivery is observable | Redis consumer-group state and pipeline freshness metadata |
| Security is part of delivery | Required CI checks, Gitleaks, Trivy and noncommitted secrets |
| Operations are testable | Health endpoints, metrics, runbooks and live HTTPS verification |
| Public delivery exists | Google Compute Engine, Docker Compose, Caddy and live HTTPS endpoint |

## Current deployment

The public demo runs on a single Google Compute Engine VM using six persistent services:

- Caddy
- React + Nginx
- FastAPI
- PostgreSQL
- Redis Streams
- Event Worker

The repository also retains AWS Terraform as a reference architecture.

See the [GCP public-demo runbook](runbooks/gcp-public-demo.md).

## Current limitations

- Data is synthetic; observed patterns are demonstrations, not customer outcomes.
- The public GCP environment is single-node and intentionally not highly available.
- AWS Terraform is a reference deployment path and is not the active public environment.
- Legacy `/ml/churn/*` handlers are not the active scoring interface.
- Real customer data would require additional privacy, backup, recovery, access-review and
  compliance controls.

## Interview prompts

- Why does assignment differ from exposure?
- Why is PR-AUC more useful than accuracy for churn ranking?
- Why are calibrated probabilities useful for retention prioritization?
- Where does at-least-once delivery create duplicate risk?
- Why does the analytics reporting anchor ignore anonymous-only events?
- When should SQL analytics move to aggregates or a warehouse?
- What changes for multi-zone recovery, regulated data or ten times the traffic?
- Why is the live deployment smaller than the AWS reference architecture?

Strong answers should connect each design choice to a concrete failure mode, operational constraint
or trade-off.
