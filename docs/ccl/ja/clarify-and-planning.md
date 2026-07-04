# Clarify と Planning

> このページは公開ドキュメントのソースとして保守されています。Clarification と planning は risk を下げるためのもので、ceremony を増やすためではありません。

<!-- section: purpose -->
## Purpose

Clarification と planning は、作業が高コストまたは危険になる前に hidden assumptions を減らします。Scope が不明、user-only decisions が必要、destructive potential がある、publication risk がある、または moving parts が多く誤った仮定で rework が生じる場合に使います。

<!-- section: capabilities -->
## Capabilities

- `AskUserQuestion` tool で requirements、preferences、implementation choices を確認します。
- `/plan` で plan mode に入り、current plan を確認し、または editor で plan file を開きます。
- Written plan が approval ready になったら exit-plan-mode tool を使います。
- Implementation 前に covered scope、negative scope、decisions、risks、verification expectations を記録します。
- Runtime plan mode と RLL `[PLAN]` submissions を分けます。前者は permission mode、後者は Ralph-Lisa review artifact です。

<!-- section: operational-model -->
## Operational model

User input が本当に必要な場合に clarify します。Question は狭くし、answer が implementation または verification path を変える必要があります。`AskUserQuestion` で plan approval を求めてはいけません。その UI では user が plan を見られません。Plan approval には exit-plan-mode tool を使います。

`/plan` は session permission mode を plan mode に変更します。Plan mode では CCL が editing ではなく planning のために permission context を準備します。Plan が既にある場合、`/plan` はそれを表示します。`/plan open` は configured editor で plan file を開きます。

RLL planning は別の層です。Ralph `[PLAN]` は alignment のための review submission です。`[TDD-PLAN]` は test cases と quality gates を lock する gated development-start round です。Documentation-only work も evidence が必要ですが、docs-specific checks を使うべきであり、すべての page update を unit-test-driven code development と扱うべきではありません。

<!-- section: configuration -->
## Configuration and commands

Useful planning surfaces:

| Surface | Use when | Boundary |
| --- | --- | --- |
| `AskUserQuestion` | User decision が scope、preference、trade-off を変える場合。 | Final plan approval には使いません。 |
| `/plan` | Planning mode に入る、または current plan を表示する場合。 | Session permission mode を変更します。 |
| `/plan open` | External editor で plan を編集する場合。 | Available editor path が必要です。 |
| Exit plan mode tool | Written plan が approval ready の場合。 | Teammate policy が別処理しない限り plan mode が必要です。 |
| RLL `[PLAN]` | Ralph と Lisa が architecture または scope alignment を行う場合。 | Review artifact であり runtime plan mode ではありません。 |

Documentation work の強い plan は source pages、feature coverage、translation expectations、public-safety checks、rendered-site checks、reviewer evidence を挙げます。Code work の強い plan は behavior change、tests、rollback risk、success を証明する command を挙げます。

<!-- section: source-evidence -->
## Source evidence

- `commands/plan/plan.tsx` は plan mode に入り、plan mode 用 permission context を準備し、current plan を表示し、`/plan open` を support します。
- `tools/AskUserQuestionTool/prompt.ts` は clarification tool を定義し、plan approval には exit-plan-mode tool を使うべきだと明記します。
- `tools/ExitPlanModeTool/ExitPlanModeV2Tool.ts` は plan-approval tool を定義し、non-teammate sessions が plan mode か検証し、必要な場合 user confirmation を求めます。
- `utils/plans.ts` は plan content と plan file paths を保存および取得します。
- `AGENTS.md` は RLL の `[PLAN]` と `[TDD-PLAN]` の分離を定義します。

<!-- section: related -->
## Related pages

- [Clarify Phase](clarify-phase.md)
- [ゲートシステム](gate-system.md)
- [ゲートと Attestation](gates-attestation.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [一般的なワークフロー](common-workflows.md)
