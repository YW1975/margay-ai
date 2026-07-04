# Ralph-Lisa Loop

> このページは公開ドキュメントのソースとして保守されています。RLL は collaboration protocol であり、verification の代替ではありません。

<!-- section: purpose -->
## Purpose

Ralph-Lisa Loop は CCL project governance で、turn-based developer と reviewer collaboration を行います。Ralph は planning と implementation を担当し、Lisa は direction、evidence、changed files、test results を review します。Loop は submissions、feedback、fixes、challenges、consensus の auditable trail を残します。

<!-- section: capabilities -->
## Capabilities

- Role を採用する前に、現在の process が `ralph`、`lisa`、`standalone` のどれかを検出します。
- Work、review、submission の前に whose turn かを確認します。
- Shell escaping problems を避けるため、work と reviews を files 経由で submit します。
- `[PLAN]`、`[TDD-PLAN]`、`[CODE]`、`[FIX]`、`[PASS]`、`[NEEDS_WORK]`、`[CHALLENGE]`、`[CONSENSUS]` など明示 tags を使います。
- Test results、attestations、Lisa review rationale、mutual consensus を保存します。
- Lisa は off-direction work、missing evidence、rubber-stamp claims、unaddressed review feedback を拒否できます。

<!-- section: operational-model -->
## Operational model

すべての loop-aware session は最初に `ralph-lisa session-role` を確認します。Direct standalone session は normal assistant として動作し、turn protocol を実行しません。Ralph または Lisa loop seat は行動前に `ralph-lisa whose-turn` を実行します。その agent の turn でない場合、work を submit してはいけません。

Ralph は `.dual-agent/submit.md` と `ralph-lisa submit-ralph --file` により plans、code、fixes、challenges、consensus を submit します。Lisa は Ralph work を読み、task direction と evidence に照らして review し、`ralph-lisa submit-lisa --file` で submit します。Inline submission は tags、quotes、shell expansion、Markdown が command arguments を壊すため避けます。

RLL は architecture `[PLAN]` と gated `[TDD-PLAN]` を分けます。Documentation、planning、process-only work にも proof は必要ですが、proof は source accuracy、publication safety、language parity、rendered output、coverage checks であるべきです。Task が code behavior を変えない限り、code-unit-test TDD を強制すべきではありません。

<!-- section: configuration -->
## Configuration and commands

Core loop commands:

| Command | Purpose |
| --- | --- |
| `ralph-lisa session-role` | Current process が Ralph、Lisa、standalone のどれかを判断します。 |
| `ralph-lisa whose-turn` | Ralph または Lisa が今 action できるか確認します。 |
| `ralph-lisa read review.md` | Ralph が Lisa の latest feedback を読みます。 |
| `ralph-lisa read work.md` | Lisa が Ralph の latest submission を読みます。 |
| `ralph-lisa submit-ralph --file .dual-agent/submit.md` | Ralph が work を submit し、turn を Lisa に渡します。 |
| `ralph-lisa submit-lisa --file .dual-agent/submit.md` | Lisa が review を submit し、turn を Ralph に渡します。 |
| `ralph-lisa status` | Current round、step、turn、watcher status を確認します。 |
| `ralph-lisa recap` | Context compaction 後に state を回復します。 |

Review discipline:

- Substantive PASS は files、lines、claims、verification results を引用します。
- Ralph は rubber-stamp PASS に対して最大 1 回 challenge します。
- NEEDS_WORK には reasoning が必要です。Ralph は Lisa が正しい理由を説明するか challenge します。
- Consensus は双方が同意した後で reviewed slice を閉じます。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md` は Ralph の役割検出、turn checks、file-based Ralph submission、tags、phase boundaries、PASS/NEEDS_WORK handling、test-result requirements、`[PLAN]` と `[TDD-PLAN]` の分離を定義します。
- `CODEX.md` は Lisa の役割検出、turn checks、file-based Lisa submission、task-alignment review、WeCom feedback intake、PASS/NEEDS_WORK rules、substantive-review requirements を定義します。
- `AGENTS.md` は standalone sessions が loop protocol を採用せず、RLL の start 方法を user に伝えるべきことを記録します。
- `AGENTS.md` は code/fix submissions に real test results と attestation lines が必要であることを記録します。
- `CODEX.md` は Lisa が code details の前に task alignment を確認する責任を記録します。

<!-- section: related -->
## Related pages

- [ゲートと Attestation](gates-attestation.md)
- [ゲートシステム](gate-system.md)
- [Clarify と Planning](clarify-and-planning.md)
- [Clarify Phase](clarify-phase.md)
- [一般的なワークフロー](common-workflows.md)
