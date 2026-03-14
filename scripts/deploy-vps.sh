#!/usr/bin/env bash
set -Eeuo pipefail

# Usage:
#   sudo ./scripts/deploy-vps.sh
#   sudo ./scripts/deploy-vps.sh <branch>
# Example:
#   sudo ./scripts/deploy-vps.sh main

BRANCH="${1:-main}"

BACKEND_DIR="/var/www/volleyball-backend"
FRONTEND_DIR="/var/www/volleyball-portfolio"
BACKEND_SERVICE="volleyball-backend"
FRONTEND_SERVICE="volleyball-frontend"
HEALTH_DOMAIN="https://nvchhamburg.de"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root (or with sudo)."
  exit 1
fi

run_as_www() {
  su -s /bin/bash -c "$1" www-data
}

echo "== Backend: pull ${BRANCH} =="
run_as_www "cd '${BACKEND_DIR}' && git fetch origin '${BRANCH}' && git checkout '${BRANCH}' && git pull --ff-only origin '${BRANCH}'"

echo "== Backend: install/migrate/static =="
source "${BACKEND_DIR}/.venv/bin/activate"
pip install -r "${BACKEND_DIR}/requirements.txt"
python "${BACKEND_DIR}/manage.py" migrate --noinput
python "${BACKEND_DIR}/manage.py" collectstatic --noinput
deactivate || true

echo "== Frontend: pull ${BRANCH} =="
run_as_www "cd '${FRONTEND_DIR}' && git fetch origin '${BRANCH}' && git checkout '${BRANCH}' && git pull --ff-only origin '${BRANCH}'"

echo "== Frontend: install/build =="
run_as_www "cd '${FRONTEND_DIR}' && npm ci && npm run build"

echo "== Restart services =="
systemctl restart "${BACKEND_SERVICE}" "${FRONTEND_SERVICE}"
systemctl --no-pager --full status "${BACKEND_SERVICE}" "${FRONTEND_SERVICE}" | sed -n '1,80p'

echo "== Health checks =="
curl -fsS -o /dev/null -w "Frontend  : %{http_code}\n" "${HEALTH_DOMAIN}/"
curl -fsS -o /dev/null -w "Backend API: %{http_code}\n" "${HEALTH_DOMAIN}/api/v1/content/home/"

echo "Deploy completed."
