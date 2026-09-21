# OCI alternative deployment path

This directory retains the original cost-aware Oracle Cloud deployment path. It is not the active
public environment; the live demo runs on Google Compute Engine. The OCI assets remain useful for
ARM64 verification and provider portability. AWS Terraform remains the distributed reference
architecture.

## Target

- Oracle `VM.Standard.A1.Flex` only
- ARM64, 2 OCPUs, 12 GB RAM
- Ubuntu 24.04 LTS and 50 GB boot volume
- Free hostname: `<public-ip-with-dashes>.sslip.io`
- Public ports: TCP 80/443 and UDP 443
- SSH restricted to the administrator IP

A1 capacity prevented the original public deployment. These assets are retained as an alternative
path and are not required for the current GCP demo.

## Architecture

Caddy provides HTTPS and proxies the React frontend. FastAPI,
PostgreSQL, Redis and the event worker remain on the private Docker network.

## Deployment

1. Confirm the instance is `RUNNING`, attached to the dedicated NSG and assigned a public IP.
2. Connect: `ssh -i ~/.ssh/id_ed25519 ubuntu@VM_PUBLIC_IP`.
3. Confirm ARM64: `uname -m` must return `aarch64`.
4. Clone this repository and select the deployment branch.
5. Run `sudo ./infrastructure/oci/bootstrap-host.sh ADMIN_IP/32`.
6. Reconnect so Docker group membership takes effect.
7. Copy `.env.production.example` to `.env.production`.
8. Run `chmod 600 .env.production`.
9. Generate secrets with `openssl rand -hex 32`.
10. Set the sslip.io host, ACME email, origins and trusted hosts.
11. Run `./infrastructure/oci/deploy.sh`.

Never commit `.env.production`.

## Verification

- Check services with `docker compose --env-file .env.production -f compose.production.yml ps`.
- Check the frontend at `https://${PUBLIC_HOST}/`.
- Check the API at `https://${PUBLIC_HOST}/api/v1/health/live`.
- Only Caddy should publish host ports.

If this deployment path is used, publish its URL only after HTTPS, the API probe and the primary
dashboard workflow pass from a separate internet connection.

## Operations

View logs with `docker compose --env-file .env.production -f compose.production.yml logs --tail 200 gateway backend event-worker`.

Update with `git pull --ff-only`, then run the deployment script again.

Stop safely with `docker compose --env-file .env.production -f compose.production.yml stop`.

Never use `docker compose down --volumes` unless permanent data deletion is explicitly intended.
