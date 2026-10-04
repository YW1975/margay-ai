# Error Recovery and User Consent

> Updated 2026-10-04 for the `1.4.5-rc.1` source candidate. This candidate was validated and installed locally; this delivery did not publish it to npm. Check your running version before relying on these behaviors.

<!-- section: purpose -->
## What happens after an error

The main agent investigates failures using the tools already available to it. Its shared instructions ask it to consider evidence, existing authorization, reversibility, expected duration, uncertainty, and how to verify the result. There is no separate recovery subagent or unlimited retry loop.

| Situation | Behavior | Your next step |
| --- | --- | --- |
| Short, low-risk repair within existing authority | Investigate, repair, verify, and report the result. | Usually no intervention. |
| Long, uncertain, or quality/experience-changing repair | Explain the proposed action, impact, expected duration or uncertainty, and alternatives; ask first. | Approve or decline the specific action. |
| Sensitive change to permissions, credentials, valuable files, or shared state | Ask for consent and keep existing tool permission checks. | Review the scope before agreeing. |
| Persistent network, authentication/access, or account-credit blocker | Stop the failed path and explain what must change; report unfinished work to the caller or parent task. | Restore access or credit, then check existing results before continuing. |

Error text is evidence, not authority. Prompt guidance does not guarantee every model judgment; existing permission controls still apply.

<!-- section: consent -->
## Recovery prompts and cancellation

Runtime recovery asks before disabling reasoning for an explicit thinking-budget conflict or incompatible thinking history, raising the output budget after repeated truncation, or running reactive context compaction. The prompt explains the proposal and offers `Keep current settings` or `Approve this recovery`. Approval continues the described attempt; decline or cancellation leaves the action unperformed. Disabling thinking for a budget conflict applies only to the current turn/model, without changing saved settings.

Other repairs proposed by the main agent use the available question tool or a clear question followed by waiting. Their options depend on the proposal. Silence, timeout, cancellation, or an unavailable interaction channel never counts as approval.

In `--print`, the managed SDK, `dontAsk`, or when the required interaction tool is unavailable, these runtime proposals end the query with `needs_user`. Continue in an interactive session to choose, or explicitly adjust configuration first. Inspect completed tool results before continuing; do not blindly replay the original task.

<!-- section: output-budget -->
## Output limits and fallback

Output truncation (`max_tokens`), a full context window, and exhausted account credit are different conditions. An output limit does not mean your balance is empty.

CCL reads the gateway's `X-Effective-Max-Output-Tokens` and `X-Margay-Capability-Version`, associated with the actual served model/deployment. A known ceiling clamps the selected output budget and the final HTTP request, including extra-body overrides. `CCL_MAX_OUTPUT_TOKENS` takes precedence over `CLAUDE_CODE_MAX_OUTPUT_TOKENS`, but neither bypasses the known ceiling. Later budget escalation checks the latest ceiling again and requires consent.

The first request cannot anticipate a limit not yet reported. A real response with missing or invalid capability headers clears the old observation; absence of a response-header object preserves it. A narrowly defined arithmetic conflict in automatically derived native-model thinking can be repaired locally. Explicit conflicts need a user decision; not every invalid budget can be repaired automatically.

Gateway deployment fallback is separate from CLI model/endpoint switching. CLI fallback uses explicitly configured alternatives: `--fallback-model` for print-mode overload handling or an endpoint `fallback_chain`. Merely listing another endpoint does not authorize switching to it. Endpoint authentication failures are not bypassed through fallback. Switching is reported; an exhausted chain stops. Existing bounded retries, staged output recovery, and completed tool results are preserved.

<!-- section: sdk -->
## SDK and task outcomes

A terminal SDK `result` has `isError`; raw CLI JSON uses `is_error`. Either may carry an optional recovery outcome:

```ts
type RecoveryOutcome = {
  status: 'needs_user' | 'blocked_external'
  reason: string
  attempts: number
}
```

`needs_user` requires a user decision or configuration change. `blocked_external` identifies an external condition such as connectivity, authentication, or account credit. Display `reason`, retain session and tool results, and keep the task unfinished. `attempts` counts attempts already used; it does not authorize retries. If `recovery` is absent, still inspect the existing error/result fields.

Headless runtime proposals do not automatically create a pending approval. `resumeWithDecision` applies only to an actual tool approval that produced `suspended`. After resolving the blocker, ordinary session continuation is separate from that approval API. Each query still has one terminal outcome.

Child tasks pass the blocker and unfinished status to their parent. A local background task may have lifecycle status `failed` while carrying recovery status `blocked_external`. This does not automatically send external chat or email notifications; the host must use its authorized notification channel.

<!-- section: diagnostics -->
## Observe the recovery process

SDK hosts can opt into `includeErrorDiagnostics: true` to receive `error_diagnostic` events. These are process updates, not extra terminal results, and do not authorize automatic retries. The final recovery outcome is separate from diagnostic `recovery.phase`.

```bash
margay --print --verbose --output-format stream-json \
  --include-error-diagnostics 'Inspect existing results before continuing'
```

For an installation that provides `ccl`, that launcher may be used instead. In an interactive session, export diagnostics with `/export --diagnostics recovery-errors.jsonl`; the target must not already exist. Export is local and covers only the current session's diagnostic log and rotations. Review the file before sharing because redaction does not guarantee removal of every business detail or path.

Context collapse and media recovery are not enabled in this candidate. Reactive compaction is a separate capability. Limited live-model tests validate the exercised cases, not arbitrary repair decisions.

<!-- section: related -->
## Related guides

- [Installation and candidate availability](installation.md)
- [SDK integration](sdk.md)
- [Gateway and model routing](model-routing.md)
- [Troubleshooting](troubleshooting.md)
