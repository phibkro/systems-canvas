#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
TEMPLATE_REPO="https://github.com/CloudCannon/stratus-astro-documentation-template.git"
TEMPLATE_SHA="371843802d4c38ad08a7267ddbf33ee1e0632c96"
rm -rf .stratus-build
git clone --filter=blob:none --no-checkout "$TEMPLATE_REPO" .stratus-build
git -C .stratus-build checkout "$TEMPLATE_SHA"
node scripts/prepare-stratus.mjs
cd .stratus-build
npm ci --no-audit --no-fund
npm run build
