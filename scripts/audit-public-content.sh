#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

fail=0

check_no_matches() {
  local label="$1"
  shift
  local output
  output="$("$@" 2>/dev/null | head -n 20 || true)"
  if [ -n "$output" ]; then
    echo "[FAIL] $label"
    echo "$output"
    fail=1
  else
    echo "[PASS] $label"
  fi
}

check_no_matches "no macOS metadata" find . -name .DS_Store -print -quit
check_no_matches "no source maps" find . -name '*.map' -print -quit
check_no_matches "no env files" find . \( -name '.env' -o -name '.env.*' \) -print -quit
check_no_matches "no private key material" find . \( -name '*.pem' -o -name '*.key' -o -name '*.p12' \) -print -quit
check_no_matches "no obvious secrets" rg -n --hidden --glob '!.git/**' --glob '!scripts/audit-public-content.sh' '(sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9_]{20,}|gho_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16})' .
check_no_matches "no private repo local paths" rg -n --hidden --glob '!.git/**' '/Users/[^ ]+/Myprojects/(ccl|margay|margay-ai|margay-studio|margay-gateway|cos|chief-of-staff|super-rll)' .

if [ "$fail" -ne 0 ]; then
  echo "Public content audit failed." >&2
  exit 1
fi

echo "Public content audit passed."
