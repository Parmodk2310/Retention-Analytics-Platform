# Documentation index

Use the shortest path that matches your goal.

## System overview

- [System review guide](portfolio-review.md): five-minute tour, evidence and deployment status.
- [System design](architecture/system-design.md): components, boundaries and scaling path.
- [Architecture decisions](architecture-decisions/): why the monorepo and SQL-first approach exist.

## Developers

- [Repository guide](Project_Guide.md): ownership by directory and common workflows.
- [API contracts](api-contracts/README.md): endpoints, protection and failure semantics.
- [Dependencies](DEPENDENCIES.md): runtime and tooling inventory.
- [Contributing](../CONTRIBUTING.md): change and review expectations.

## Data, ML and operations

- [Data model](architecture/data-model.md)
- [Event pipeline](architecture/event-pipeline.md)
- [Churn ML design](architecture/ml-design.md)
- [Experiment SRM runbook](runbooks/experiment-srm.md)
- [API latency runbook](runbooks/api-latency.md)
- [Threat model](security/threat-model.md)
- [GCP public-demo runbook](runbooks/gcp-public-demo.md): live public demo deployment and operations.
- [OCI deployment assets](../infrastructure/oci/README.md): alternative single-node deployment path.
- [Public release checklist](public-release-checklist.md)

## Delivery history

- [Implementation phases](PHASES.md): completed milestones and final public-deployment state.

Documentation uses **implemented**, **validated**, and **deployed** deliberately. These states are
not interchangeable.
