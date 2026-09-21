# Public release checklist

Use this checklist before publishing a stable release or changing the advertised public demo.

## Source and security

- [ ] Scan the complete Git history with Gitleaks.
- [ ] Confirm production environment files are ignored and not staged.
- [ ] Confirm private keys, Terraform state, saved plans and cloud credentials are absent from the repository history.
- [ ] Confirm public datasets and screenshots contain synthetic rather than customer data.
- [ ] Review dependency and container security workflow results.

## Documentation and evidence

- [ ] Verify README claims against the active deployment and current source.
- [ ] Verify screenshots match the current interface and contain no private infrastructure details.
- [ ] Verify relative documentation links.
- [ ] Label benchmark results as point-in-time validation rather than service-level guarantees.
- [ ] Keep limitations and responsible-use boundaries visible.
- [ ] Distinguish the active GCP demo from the AWS reference architecture and retained OCI path.

## Deployment

- [ ] Verify public HTTPS from an external network.
- [ ] Verify API liveness and readiness.
- [ ] Confirm only the gateway publishes public application ports.
- [ ] Confirm persistent services are healthy.
- [ ] Exercise the primary dashboard workflow.
- [ ] Verify realtime ingestion, persistence and consumer-group state.
- [ ] Review backup, recovery and cost controls for the active environment.

## GitHub release

- [ ] Confirm the Apache-2.0 license is detected correctly.
- [ ] Review repository description, topics and social preview.
- [ ] Confirm the `main` ruleset and required pull-request checks are active.
- [ ] Merge release changes only after required CI and security checks pass.
- [ ] Create the release tag from the intended `main` commit.
- [ ] Verify release notes, source archives and advertised demo links.
