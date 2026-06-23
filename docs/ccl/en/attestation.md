# Attestation and Policy System

> The attestation system ensures every code submission and review is traceable, verifiable, and accountable. It prevents rubber-stamp approvals, fabricated test results, and silent policy bypasses.

The attestation system (§149) and policy block system (§133) work together to enforce discipline in the Ralph-Lisa Loop. Attestations are mandatory declarations that accompany every `[CODE]`, `[FIX]`, and review response. The policy system ensures these declarations are actually checked and that violations block submission rather than pass with a warning.

---

## Overview

Attestation is the practice of **making verifiable claims about your work and signing them with evidence**. In the Ralph-Lisa Loop, every party — Ralph (the developer) and Lisa (the reviewer) — must attest to specific facts about the code, tests, and review process.

Why attestation matters:

- **Prevents fabricated test results** — You cannot claim tests passed without naming the command, the counts, and where the evidence lives.
- **Prevents rubber-stamp reviews** — Lisa cannot pass work without citing specific files, lines, and a rationale.
- **Creates an audit trail** — Every submission and review leaves a structured record that can be checked later.
- **Enables counter-attestation** — Ralph can challenge a thin `[PASS]`, forcing Lisa to justify her approval with specifics.

The policy system (§133) makes these rules strict by default. `RL_POLICY_MODE` is set to `block`, which means missing attestations or malformed claims **reject the submission** rather than warn about it.

---

## §149 Ralph Attest Block

Every `[CODE]` or `[FIX]` submission from Ralph **must** include three attest lines verbatim. The submission is rejected if any line is missing or malformed.

### Required attest lines

```markdown
Test-Process: <inline summary> | Test-Process-File: <path> | Test-Process: git-diff <range>
Test-Cases: C1, C3, C7
Test-Results: cmd="npm test --prefix cli" passed=N failed=0 total=M | Test-Results-File: <path>
```

### `Test-Process`

Describes how the tests were run. Three formats are supported:

| Format | Example | When to use |
|--------|---------|-------------|
| **Inline** | `Test-Process: inline summary of test run` | Short runs where the summary fits in one line |
| **File** | `Test-Process-File: .dual-agent/test-log.txt` | Long output saved to a file |
| **Git diff** | `Test-Process: git-diff HEAD~3..HEAD` | The test process is encoded in the commit range (no `-` prefix; metachars are inert) |

You can combine formats with `|` separators. At least one must be present.

### `Test-Cases`

Lists the PLAN C-row IDs that were touched in this round. These are the test plan rows from the `[TDD-PLAN]` or `[PLAN]` phase.

```markdown
Test-Cases: C1, C3, C7
```

- Use comma-separated IDs with no spaces after commas.
- Only list IDs for test cases that were actually implemented or modified in this round.
- If no new tests were added (e.g., a pure config change), write `Test-Cases: none` and explain why in the submission body.

### `Test-Results`

Reports the actual test outcome with concrete counts.

```markdown
Test-Results: cmd="npm test --prefix cli" passed=153 failed=0 total=153
```

| Field | Required | Description |
|-------|----------|-------------|
| `cmd` | Yes | The exact command that was run |
| `passed` | Yes | Number of tests that passed |
| `failed` | Yes | Number of tests that failed |
| `total` | Yes | Total number of tests run |

Alternatively, you can reference a file:

```markdown
Test-Results-File: .dual-agent/test-results.json
```

The file must contain the same fields in a parseable format.

### What happens if Ralph skips attestations

If any attest line is missing, the policy system emits a specific error and blocks submission:

- `ralph-test-process-missing` — No `Test-Process` line found
- `ralph-test-cases-missing` — No `Test-Cases` line found
- `ralph-test-results-missing` — No `Test-Results` line found

Fix the root cause and resubmit. Do **not** retry without changing anything.

---

## §149 Lisa Attest Block

Every review from Lisa — whether `[PASS]` or `[NEEDS_WORK]` — **must** include an attest block that proves the review was substantive and specific.

### Required attest lines

```markdown
Reviewed-PLAN-rows: C1, C3, C7
Reviewed-test-files: resolveConfigDir.test.ts, ipc-shape.test.ts
Reviewed-test-log: .dual-agent/test-log.txt
Pass-Rationale: Verified platform path resolution (3 cases) at resolveConfigDir.test.ts:45-67
```

For `[NEEDS_WORK]`, use `NeedsWork-Rationale` instead of `Pass-Rationale`:

```markdown
NeedsWork-Rationale: Missing error handling for EPERM in cleanup() at src/cleanup.ts:89
```

### `Reviewed-PLAN-rows`

Lists the C-row IDs from the test plan that Lisa actually reviewed. This proves she checked the planned tests, not just the code.

### `Reviewed-test-files`

Lists the test files Lisa examined. File names only — no need for full paths if they are unambiguous.

### `Reviewed-test-log`

Path to the test log Lisa verified. This is the same log referenced by Ralph's `Test-Process-File` or `Test-Results-File`.

### `Pass-Rationale` / `NeedsWork-Rationale`

The core of Lisa's attestation. This field must:

- Be **at least 40 characters** long
- Include **specific file and line references** (e.g., `resolveConfigDir.test.ts:45-67`)
- Explain **what was verified** (for `[PASS]`) or **what is wrong** (for `[NEEDS_WORK]`)

A rationale like "Looks good" or "Approved" is a **rubber stamp** and will be rejected.

### What happens if Lisa skips attestations

Missing or thin attestations trigger the same policy block as Ralph's:

- `lisa-pass-rationale-missing` — No `Pass-Rationale` or `NeedsWork-Rationale` found
- `lisa-rationale-too-short` — Rationale is under 40 characters
- `lisa-no-file-references` — Rationale lacks `file:line` citations

---

## Counter-Attest on CONSENSUS

When Lisa returns `[PASS]`, Ralph does not automatically submit `[CONSENSUS]`. He first checks the quality of the pass.

### Detecting rubber-stamp passes

Ralph must verify that Lisa's `[PASS]` includes:

- **Specific file checks** — References to actual files and lines reviewed
- **Test verification** — Confirmation that test results were checked against the log
- **Technical analysis** — Specific claims about correctness, not generic approval

If Lisa's `[PASS]` lacks these, Ralph **must** submit `[CHALLENGE]` requesting substantive review. He may do this **at most once**.

### Challenge flow

```
Lisa: [PASS] "Looks good, merging."
Ralph: [CHALLENGE] "This PASS lacks file:line citations and test verification. Please confirm:
  1. resolveConfigDir.test.ts:45-67 was reviewed for platform path coverage
  2. The test log at .dual-agent/test-log.txt matches the claimed 153/153 results"
Lisa: [PASS] "Confirmed. resolveConfigDir.test.ts:45-67 covers macOS/Windows/Linux paths.
  Test log verified: 153 passed, 0 failed, 153 total."
Ralph: [CONSENSUS]
```

If Lisa resubmits `[PASS]` after the challenge — even if still thin — Ralph accepts it and submits `[CONSENSUS]` to avoid an infinite loop.

### Policy enforcement

The policy system runs a **counter-attest check** on every `[CONSENSUS]` submission. It reads Lisa's latest `[PASS]` and evaluates whether the rationale is sufficient. If not, it emits `ralph-must-challenge-rubber-stamp-pass` and blocks the `[CONSENSUS]`.

---

## §133 Policy Block-Default

`RL_POLICY_MODE` defaults to **`block`**, not `warn`. This means policy violations **reject the submission** rather than printing a warning and letting it through.

### Discipline

When a submission is blocked:

1. **Fix the root cause.** Add the missing section, run the real test, include the file reference, etc.
2. **Resubmit.** The policy check runs again on the new submission.
3. **Do not retry without fixing.** Three or more consecutive retries without fixing the root cause trigger an escalation.

### Escalation path

If you retry a blocked submission three or more times without addressing the violation:

- A `wecom` SOS event is sent
- The task is marked as potentially stuck
- User intervention may be required

This prevents infinite loops where an agent keeps submitting the same broken content.

### Dev escape hatch

For interactive development, you can temporarily downgrade policy violations to warnings:

```bash
RL_POLICY_MODE=warn ccl submit-ralph --file .dual-agent/submit.md
```

This prints the violation but does not block submission. **Do not use this in production or overnight autonomous runs.** It is intended for local debugging only.

---

## Opt-Outs

Both Ralph and Lisa can opt out of attestation requirements via environment variables. Use these sparingly — they are intended for exceptional circumstances, not routine bypasses.

### Ralph opt-out

```bash
export RL_RALPH_ATTEST_OFF=1
```

When set, Ralph's `[CODE]` and `[FIX]` submissions are not checked for the three attest lines. The submission proceeds without `Test-Process`, `Test-Cases`, or `Test-Results`.

**When to use:**
- Pure documentation changes with no code
- Configuration-only updates that do not affect testable behavior
- Emergency hotfixes where test infrastructure is temporarily unavailable

**When not to use:**
- Any code change that could break tests
- Refactors, feature additions, or bug fixes
- Situations where you simply forgot to run tests

### Lisa opt-out

```bash
export RL_LISA_ATTEST_OFF=1
```

When set, Lisa's `[PASS]` and `[NEEDS_WORK]` responses are not checked for rationale length, file references, or test log verification.

**When to use:**
- Early-stage prototyping where formal review is not yet required
- Internal tooling changes with no production impact
- Situations where the reviewer is a human overriding the automated Lisa agent

**When not to use:**
- Production code reviews
- Any situation where traceability matters

### Combined opt-out

You can set both variables if both sides need to be exempted:

```bash
export RL_RALPH_ATTEST_OFF=1
export RL_LISA_ATTEST_OFF=1
```

This effectively disables the attestation system for the session. Document why you are doing this in the submission body.

---

## Quick Reference

### Ralph's minimum `[CODE]` submission

```markdown
[CODE]

Implemented the config resolver with platform-specific path handling.

### Test Results
- Regression: npm test → 150/150 pass (no breakage)
- New tests: 3 added
  - resolveConfigDir.test.ts: platform path resolution (3 cases)
  - ipc-shape.test.ts: getConversationMessages returns TMessage[]

Test-Process: inline | Test-Process-File: .dual-agent/test-log.txt
Test-Cases: C1, C3, C7
Test-Results: cmd="npm test --prefix cli" passed=153 failed=0 total=153
```

### Lisa's minimum `[PASS]` review

```markdown
[PASS]

Reviewed-PLAN-rows: C1, C3, C7
Reviewed-test-files: resolveConfigDir.test.ts, ipc-shape.test.ts
Reviewed-test-log: .dual-agent/test-log.txt
Pass-Rationale: Verified platform path resolution (3 cases) at resolveConfigDir.test.ts:45-67 and confirmed IPC shape returns TMessage[] at ipc-shape.test.ts:12-34. Test log matches claimed 153/153 results.
```

### Policy commands

| Command | Purpose |
|---------|---------|
| `RL_POLICY_MODE=warn ccl submit-ralph ...` | Downgrade policy to warn for one submission |
| `export RL_RALPH_ATTEST_OFF=1` | Disable Ralph attest checks for the session |
| `export RL_LISA_ATTEST_OFF=1` | Disable Lisa attest checks for the session |

---

The attestation and policy system is not bureaucracy. It is a lightweight, structured way to ensure that every piece of code that lands has been tested, reviewed, and verified — and that the evidence is right there in the submission, not in someone's memory.
