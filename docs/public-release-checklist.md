# Public release checklist

Use this checklist before tagging a release or advertising the live demonstration.

Status snapshot: 2026-09-22.

## Source and security

- [ ] Scan the complete Git history with Gitleaks.
- [x] Confirm the production environment file is ignored and not staged.
- [ ] Independently confirm private keys, Terraform state, saved plans and cloud credentials are
      absent from the complete repository history.
- [x] Confirm the public demo contains synthetic rather than customer data.
- [x] Review current dependency/container security workflow results.

## Documentation and evidence

- [x] README claims match the active public deployment.
- [x] Replace final README screenshots with the latest polished live captures.
- [ ] Verify all relative documentation links.
- [x] Historical benchmark results are labelled as snapshots rather than service-level guarantees.
- [x] Limitations and responsible-use constraints remain visible.
- [x] Public GCP deployment and AWS reference architecture are distinguished.

## Deployment

- [x] HTTPS works from the public endpoint.
- [x] API liveness probe passes.
- [x] Only the Caddy gateway publishes public application ports.
- [x] Persistent production services are running.
- [x] Realtime ingestion was accepted through the public API.
- [x] Redis consumer state reached zero pending messages and zero lag.
- [ ] Review final backup/recovery expectations for the portfolio VM.
- [x] Live URL is published only after the principal dashboard workflow passed.

## GitHub presentation

- [x] Apache-2.0 license is present.
- [ ] Review repository description, topics and social preview.
- [x] `main` ruleset and required pull-request checks are active.
- [x] Backend and frontend CI pass on the merged release work.
- [x] Gitleaks and Trivy pass on the release pull request.
- [ ] Create the final documentation pull request.
- [ ] Merge the final documentation pull request after required checks pass.
- [ ] Create and verify the `v1.0.0` release.
