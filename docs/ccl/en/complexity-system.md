# Complexity Management System

CCL's complexity management system prevents both over-engineering and under-engineering by assessing each task's difficulty before development begins. It ensures simple tasks move quickly while complex tasks receive the rigor they need.

## Overview

Not every task needs the same process. A typo fix shouldn't require a 10-question clarification phase, and a distributed systems refactor shouldn't skip it. The complexity management system:

- **Prevents over-engineering** by routing simple tasks through lightweight workflows
- **Prevents under-engineering** by forcing complex tasks through structured clarification and planning
- **Provides an objective baseline** via LLM-powered assessment with deterministic verification
- **Enforces via gates** that block submission until complexity requirements are met

## Complexity Classes

Tasks are classified into four tiers:

| Class | Description | Typical Examples | R0 Clarify Required |
|-------|-------------|------------------|---------------------|
| **simple** | Straightforward changes with minimal scope | Typo fixes, config updates, single-file refactors | No |
| **standard** | Moderate changes with clear boundaries | Feature additions, API extensions, test coverage gaps | No |
| **complex** | Multi-file changes with architectural implications | Refactors across modules, protocol implementations, state machine changes | **Yes** |
| **expert** | Deep system changes requiring domain expertise | Consensus algorithm changes, security audits, performance-critical paths | **Yes** |

The classification is determined by `complexity-judge` and verified by `complexity-verify`. Users cannot naked-override the classification---they must reframe the task description to trigger re-evaluation (capped at 3 reframes).

## complexity-judge

`complexity-judge` is an LLM-powered assessment that analyzes a task's scope, risk, and required expertise.

### Usage

```bash
ccl task complexity-judge --slice <slug> --json
```

### Output Schema

```json
{
  "schema_version": "1.0",
  "model_id": "claude-sonnet-4-20250514",
  "prompt_template_hash": "abc123...",
  "input_hash": "def456...",
  "tiers": [
    {
      "tier_id": "unit",
      "confidence": "high",
      "evidence": {
        "source_kind": "code",
        "source_locator": "src/parser.ts:45"
      }
    }
  ],
  "recommendations": [
    "Add integration tests for the new IPC shape"
  ]
}
```

### Requirements

- Every **high-confidence** tier must include `evidence` with both `source_kind` and `source_locator`
- The assessment is cached at `.dual-agent/complexity-judge/<slice>.json` to avoid re-evaluation
- The `tier_id` values must be present in the `canonical_tier_ids` whitelist (see below)

## complexity-verify

`complexity-verify` is a deterministic hard gate that validates the `complexity-judge` output.

### Usage

```bash
ccl task complexity-verify --slice <slug>
```

### Validation Checks

- **Schema validation**: Output conforms to the expected JSON schema
- **Freshness**: Assessment is not stale (matches current task description)
- **Canonical tier IDs**: All tier IDs exist in the `gate-manifest.json` whitelist
- **High-confidence acceptance**: High-confidence tiers are either accepted or explicitly ack-rejected
- **Coverage**: Evidence covers all high-confidence tiers

**Must exit 0 to submit.** If verification fails, fix the root cause and re-run. Do not retry without fixing.

## canonical_tier_ids

The whitelist of valid tier IDs lives in `gate-manifest.json` at the project root:

```json
{
  "canonical_tier_ids": ["unit", "integration", "e2e", "security", "smoke"]
}
```

Any tier ID outside this whitelist blocks `complexity-verify` and prevents submission. Update the whitelist intentionally---never bypass it.

## R0 Clarify Phase (§128)

Complex and expert tasks **must** go through R0 Clarify before the `[TDD-PLAN]` round. Simple and standard tasks may skip it.

### Stage 0: Complexity Confirmation

The LLM presents its complexity classification. The user chooses:

- **A**: Agree with the classification and proceed
- **B**: Reframe the task description to trigger re-evaluation (max 3 reframes)
- **C**: Explicitly skip with `--skip` (warning printed, documented in artifact)

After 3 reframes, the user must choose A or C.

### Stage 1: Codebase Exploration

AI-internal exploration of the codebase to understand:
- Relevant modules and their boundaries
- Existing patterns and conventions
- Dependencies and potential integration points

No user interaction required.

### Stage 2: Decision Tree Mapping

Maps 5 categories of decision points from upstream to downstream:

1. **Architecture decisions**: Structural changes, new abstractions
2. **Interface decisions**: API shapes, protocol changes, data formats
3. **Implementation decisions**: Algorithms, libraries, performance trade-offs
4. **Testing decisions**: Coverage strategy, mock boundaries, harness selection
5. **Deployment decisions**: Migration paths, rollback strategy, feature flags

### Stage 3: 1-Question-at-a-Time Grill

A structured Q&A session (default 10 questions) that probes:
- Ambiguous requirements
- Hidden constraints
- Edge cases and failure modes
- Scope boundaries

The user can `--continue` for more questions or `--stop` to finalize.

### Stage 4: Consensus Deliverable

The final artifact contains 5 required fields:

| Field | Description |
|-------|-------------|
| `understanding` | User-quoted task understanding, in their own words |
| `covered_scope` | What is explicitly in scope |
| `negative_scope` | What is **not** in scope (the strongest signal against over-engineering) |
| `decisions` | Array of user-confirmed decisions from the grill |
| `risks` | Known risks and boundary trade-offs |

Submit R0 deliverables with the `[CLARIFY]` tag.

## CLI Commands

### Start a clarification session

```bash
ccl clarify --start
```

Enters the 5-stage R0 flow. Saves progress to `.dual-agent/clarify/`.

### Check status

```bash
ccl clarify --status
ccl clarify --status --json
```

Shows current stage, question count, and whether `negative_scope` is locked.

### Add an answer

```bash
ccl clarify --add-answer Q-42 "The retry limit should be 3, not 5."
```

Records a user answer to a specific grill question.

### Commit the artifact

```bash
ccl clarify --commit \
  --understanding "Add circuit breaker to the HTTP client" \
  --covered "http-client,retry-logic" \
  --negative-scope "websocket-client,grpc" \
  --risks "Timeout edge cases under high load"
```

Finalizes the R0 artifact. All fields are required.

### Skip R0

```bash
ccl clarify --skip
```

Explicitly bypasses R0 for a complex/expert task. A warning is printed and the skip is logged. Use sparingly.

### Acknowledge scope expansion

```bash
ccl ack-scope-expansion --reason "User requested WebSocket support after R0 locked."
```

Required when scope changes after R0 is finalized. Documents the change and triggers re-evaluation.

## User Override Rules

Users **cannot** directly override the `complexity_class` field. The only legitimate paths are:

1. **Reframe the task**: Change the task description to genuinely alter scope. The LLM re-evaluates. Maximum 3 reframes.
2. **Accept and proceed**: Acknowledge the classification and follow the required workflow.
3. **Explicit skip**: Use `ccl clarify --skip` with documented justification.

Naked overrides (e.g., editing the JSON directly) are rejected by `complexity-verify`.

## Knowledge Freshness (§128)

R0 and complexity assessment depend on accurate, up-to-date information. The system handles knowledge freshness in three layers:

### Bootstrap Stable List

Shipped with CCL. Covers stable topics that rarely change:
- OS commands and shell behavior
- Language core features
- Standard algorithms and data structures

These do not require freshness checks.

### Runtime Log

Volatile topics are tracked in `.dual-agent/knowledge-freshness/log.jsonl`:

```jsonl
{"timestamp": "2026-06-22T10:00:00Z", "topic": "react-19-features", "content_hash": "sha256:abc...", "ttl_hours": 168}
{"timestamp": "2026-06-22T10:05:00Z", "topic": "openai-api-2026-06", "content_hash": "sha256:def...", "ttl_hours": 24}
```

Each entry has a TTL by category. When TTL expires, the system refreshes via WebSearch + WebFetch.

### Self-Evolving Promotion

Topics that remain stable across 5 consecutive cycles are promoted to the bootstrap list. Promotion requires:
- Identical `content_hash` across all 5 cycles
- No breaking changes detected in fetched content

### Refreshing Volatile Topics

When a task involves volatile information (AI model versions, framework features, API behavior), the system:

1. Checks the runtime log for a fresh entry
2. If stale or missing, runs WebSearch + WebFetch
3. Appends the result to the log with appropriate TTL
4. Uses the refreshed data in complexity assessment and R0

Never rely on stale memory for volatile topics. Always verify through the freshness system.
