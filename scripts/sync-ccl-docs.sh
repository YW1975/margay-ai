#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: scripts/sync-ccl-docs.sh /path/to/private/ccl" >&2
  exit 2
fi

private_ccl="$1"
source_dir="$private_ccl/docs/ccl-docs"

if [ ! -d "$source_dir" ]; then
  echo "Missing public docs output: $source_dir" >&2
  exit 1
fi

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
target_dir="$root/docs/ccl"

mkdir -p "$target_dir"
rsync -a --delete \
  --exclude '.DS_Store' \
  --exclude '*.map' \
  --exclude '*.log' \
  "$source_dir/" "$target_dir/"

"$root/scripts/audit-public-content.sh"
