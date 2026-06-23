# Gate System

> The quality backbone of the Ralph-Lisa Loop. Mandatory checkpoints at every phase boundary ensure every code change is planned, tested, reviewed, and agreed upon before it lands.

The gate system is what makes the Ralph-Lisa Loop reliable. It is not optional decoration — it is a set of mechanical checkpoints that block submissions until they meet quality criteria. Gates run automatically when Ralph submits work, and Lisa's review is itself a gate.

---

## Overview

Every submission in the Ralph-Lisa Loop passes through one or more gates:

| Gate | When it runs | What it checks |
|------|--------------|----------------|
| **Plan gate** | `[PLAN]` / `[TDD-PLAN]` submission | Plan completeness, test plan presence, quality gate commands |
| **Complexity gate** | `[TDD-PLAN]` submission | `complexity-judge` JSON, `complexity-verify` exit 0, canonical tier IDs |
| **Clarify gate** | `[TDD-PLAN]` submission (complex/expert) | R0 clarify phase locked, 5 required fields present |
| **Policy gate** | `[CODE]` / `[FIX]` submission | §149 attest block, file:line citations, test results |
| **Smoke gate** | `[CODE]` / `[FIX]` submission | `RL_SMOKE_CMD` passes (if configured) |
| **Visual evidence gate** | `[CODE]` / `[FIX]` submission (UI/web slices) | Screenshot present in `.dual-agent/visual-evidence/` |
| **Lisa review** | After every Ralph submission | `[PASS]` or `[NEEDS_WORK]` with substantive rationale |
| **Consensus gate** | `[CONSENSUS]` submission | Lisa's PASS quality (not rubber-stamp), counter-attest |

---

## Pass path (green)

The happy path through the gate system:

```
Ralph submits [CODE]/[FIX]
    ↓
Submit-time gates run (plan validate + policy check + gate commands)
    ↓
All gates pass (exit 0)
    ↓
Lisa reviews → [PASS] (substantive: file:line + oracle + anti-vacuous)
    ↓
Ralph [CONSENSUS] (verifies PASS quality, challenges if rubber-stamp)
    ↓
Lisa [CONSENSUS] (mutual agreement)
    ↓
§70 post-CONSENSUS cascade fires
    ↓
Status = passed → slice close → §1 row flip to closeout-stage/closed
```

**Key discipline:** Ralph cannot short-circuit this path. Skipping §70 cascade, premature CONSENSUS, or silently ignoring failing tests is a violation.

---

## Fail path (red)

When something goes wrong, the loopback mechanism kicks in:

```
Ralph submits [CODE]/[FIX]
    ↓
Submit-time gate fails OR Lisa [NEEDS_WORK]
    ↓
§79 loopback triggers (structured loopback inbox + retry budget)
    ↓
Lisa narrows → Ralph [FIX] (with reasoning, never bare)
    ↓
Re-submit → re-gate
    ↓
If ≥3 consecutive cascade fail → WeCom task_failed event (§71 ESCALATE)
    ↓
If 8 consecutive NEEDS_WORK → watcher pauses (deadlock detection)
```

**Retry discipline:** When a gate fails, fix the root cause. Do not retry without changing anything. Three retry-without-fix in a row triggers a WeCom SOS.

---

## Phase boundaries and tags

The Ralph-Lisa Loop moves through well-defined phases. Each phase boundary is a checkpoint.

| Phase | Tag | Gate status | What happens |
|-------|-----|-------------|--------------|
| Architecture discussion | `[PLAN]` | Gate-free | Ralph proposes approach, Lisa validates understanding |
| Dev start | `[TDD-PLAN]` | **Gated** | Complexity-judge, complexity-verify, Lisa rerun |
| Research | `[RESEARCH]` | Advisory | Reference implementations, protocols, external APIs |
| Implementation | `[CODE]` | **Gated** | Policy attest, smoke, visual evidence, tests |
| Fix | `[FIX]` | **Gated** | Same as `[CODE]` + explanation of Lisa's feedback |
| Challenge | `[CHALLENGE]` | Advisory | Ralph disagrees with Lisa's suggestion |
| Discussion | `[DISCUSS]` | Gate-free | General clarification |
| Question | `[QUESTION]` | Gate-free | Asking for clarification |
| Consensus | `[CONSENSUS]` | **Gated** | Counter-attest on Lisa's PASS quality |

**Important:** `[PLAN]` is now gate-free architecture discussion. The development-start gates (§123/§128/§129/plan-test-plan) fire on `[TDD-PLAN]`, not `[PLAN]`.

---

## Three-layer gate for [TDD-PLAN] (§123)

Complex and expert tasks must pass three independent layers before `[CODE]`:

### Layer 1 — complexity-judge (LLM-primary judgment)

Ralph runs:

```bash
ccl task complexity-judge --slice <slug> --json
```

Output includes:
- `schema_version`, `model_id`, `prompt_template_hash`, `input_hash`
- `tiers` with `tier_id`, `confidence`, `evidence`
- `recommendations`

**Requirements:**
- Every high-confidence tier must include evidence (`source_kind` + `source_locator`)
- Cached in `.dual-agent/complexity-judge/<slice>.json`
- Must be pasted into `[TDD-PLAN]` body

### Layer 2 — complexity-verify (hard gate)

Ralph runs:

```bash
ccl task complexity-verify --slice <slug>
```

**Validates:**
- Schema version and freshness
- `canonical_tier_ids` whitelist match
- High-confidence tiers accepted or ack-rejected
- Coverage completeness
- Sanity flags

**Must exit 0.** Exit 1 blocks submission until fixed.

### Layer 3 — Lisa independent rerun

Lisa runs her own `complexity-judge` to get an independent baseline.

- If Ralph accepted or explicitly rejected all high-confidence tiers → proceed
- If Ralph left any high-confidence tier unaddressed → `[NEEDS_WORK]`

**Resolution:** Add to 5-column Required table, or ack-downgrade with user consent.

---

## Attestation (§149)

Every `[CODE]` / `[FIX]` submission must include three attest lines verbatim:

```
Test-Process: <inline summary> | Test-Process-File: <path> | Test-Process: git-diff <range>
Test-Cases: C1, C3, C7
Test-Results: cmd="npm test --prefix cli" passed=N failed=0 total=M | Test-Results-File: <path>
```

### Fields

| Line | Format | Description |
|------|--------|-------------|
| `Test-Process` | `inline` / `file://path` / `git-diff <range>` | How tests were run |
| `Test-Cases` | Comma-separated C-row IDs | Which planned test cases this round touched |
| `Test-Results` | `cmd="..." passed=N failed=0 total=M` / `file://path` | Actual test execution results |

**Missing → policy blocks submission.**

Opt-out: `RL_RALPH_ATTEST_OFF=1` (dev only, not for production).

---

## Smoke auto-loop (§150)

If `RL_SMOKE_CMD` is set, `[CODE]` / `[FIX]` submissions trigger the smoke command automatically.

### On failure

1. Failure captured to `.dual-agent/smoke-failures/<step>-R<round>.json`
2. `Smoke-Failure-Context` prepended to Ralph's NEXT submit body
3. After 3 consecutive fails: `smoke-deadlock.txt` + TASK_FAILED WeCom event + exit 1

### Reset conditions

- Successful smoke test
- `ccl smoke-fail clear`

Opt-out: `RL_SMOKE_AUTO_LOOP_OFF=1`

---

## Visual evidence (§151)

When the active sub-slice's `.rll/PLAN.md` mentions UI/web/frontend keywords (`web/`, `frontend/`, `ui/`, `playwright`, `screenshot`, `visual regression`/`diff`, `Visual-Evidence:`), `[CODE]` / `[FIX]` must include:

```
Visual-Evidence: .dual-agent/visual-evidence/<screenshot>.png
```

Capture:

```bash
ccl visual-evidence add --file <screenshot>
```

Rotation cap: 20 screenshots.

Opt-out: `RL_VISUAL_EVIDENCE_OFF=1` (downgrades to warn).

---

## Project type tiers (§152 / §155)

`gate-manifest.json` can declare a `project_type` that hints default baseline tiers:

| Type | Expected tiers |
|------|----------------|
| `cli` | unit, integration |
| `web-app` | unit, smoke, integration |
| `mobile-app` | unit, e2e |
| `library` | unit |
| `service` | unit, integration, security |

At `[TDD-PLAN]`, Ralph must write exactly one of:

- `"baseline matches project_type=<X>"` — when default_baseline covers expected tiers
- `"baseline mismatch: project_type=<X> expects [tiers...], default_baseline has [tiers...], missing [...]; remediation: <plan>"` — with plan to bump, add tiers, or ack opt-out

Lisa `[NEEDS_WORK]` if neither statement appears.

Set project type:

```bash
ccl gate-manifest --type web-app
```

Opt-out: `RL_PROJECT_TYPE_TIERS_OFF=1`

---

## Lisa watchdog (§153)

If Lisa goes silent for >30 minutes on her turn (`review.md` mtime stale beyond `RL_LISA_WATCHDOG_THRESHOLD_SEC`, default 1800s):

1. `ccl lisa-watchdog tick` fires `agent_stuck { target: 'lisa', severity: 'high', stuck_level: 'critical' }`
2. WeCom crit-tier rescue ping sent to off-laptop user
3. Dedup via `.dual-agent/lisa-watchdog-last-ping.txt` (one ping per stuck-window)

Opt-out: `RL_LISA_WATCHDOG_OFF=1`

---

## Policy mode (§133)

`RL_POLICY_MODE` defaults to **block** (not warn).

| Mode | Behavior |
|------|----------|
| `block` (default) | Submit-time policy violations exit 1; submission rejected |
| `warn` | Policy violations print warnings but allow submission |

**Discipline:**
- Submit blocked → fix root cause (add missing section, run real test, etc.)
- Do NOT retry expecting pass without changing anything
- 3+ retry-without-fix → WeCom SOS; stop

**Dev escape:** `RL_POLICY_MODE=warn ccl submit-ralph ...` (interactive dev only).

Production / overnight autonomous runs MUST NOT use warn fallback.

---

## See also

- [Ralph-Lisa Loop](/en/ralph-lisa-loop) — Full protocol reference
- [Complexity System](/en/complexity-system) — Task classification and tier assignment
- [Attestation](/en/attestation) — §149 attest and §133 policy details
- [Getting Started with RLL](/en/getting-started-rll) — Step-by-step walkthrough
