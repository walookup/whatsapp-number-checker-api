#!/usr/bin/env bash
set -euo pipefail
: "${WALOOKUP_API_KEY:?Set WALOOKUP_API_KEY}"
curl -fsS -X POST 'https://walookup.com/api/v1/check' -H "X-API-Key: $WALOOKUP_API_KEY" -H 'Content-Type: application/json' -d '{"service_type":"ws","identifier":"+14155550100"}'
