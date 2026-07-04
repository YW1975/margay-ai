# RLL 入門

> このページは CCL documentation inventory から管理されています。生成フローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

Ralph-Lisa Loop（RLL）は、CCL の作業に実装担当、独立 reviewer、保存された evidence、明確な handoff が必要なときに使う reviewed-delivery workflow です。release、公開 documentation、広い refactor、security-sensitive な変更、長時間の autonomous work など、速度より correctness を優先する作業で使います。

このページは operator 向けの入口です。詳しい protocol は [Ralph-Lisa Loop](ralph-lisa-loop.md)、submission evidence の形式は [Gates and Attestation](gates-attestation.md) を参照してください。

<!-- section: capabilities -->
## 機能

- Ralph を lead implementer、Lisa を independent reviewer として two-agent loop を起動します。
- `.dual-agent` に turn history、submitted work、review、test evidence、consensus decision を保存します。
- plan、research、code、fix、challenge、consensus などの checkpoint を明示します。
- terminal pane と configured notification channel で operator に進捗を見せます。
- documentation work では、無関係な unit test ではなく documentation-specific evidence を使います。

<!-- section: operational-model -->
## 運用モデル

RLL は turn-based です。Ralph は Ralph turn のときだけ作業し、tagged artifact を submit して待ちます。Lisa は work を読み、task と evidence に照らして `[PASS]`、`[NEEDS_WORK]`、`[CHALLENGE]`、`[QUESTION]`、`[CONSENSUS]` を返します。PASS はそれだけでは完了ではありません。Ralph が substantive consensus で受け入れ、Lisa が mutual consensus を確認します。

最小モデル:

| Stage | Ralph の責任 | Lisa の責任 | 残す evidence |
|-------|--------------|-------------|---------------|
| Plan | goal、scope、deliverables、risks、verification を書く。 | direction と missing acceptance criteria を確認する。 | plan table、clarify decisions、source evidence。 |
| Code or docs | scoped change を行い、planned checks を実行する。 | 結果を独立に rerun または inspect する。 | changed files、test logs、screenshots、build output。 |
| Fix | feedback が正しい理由を説明するか、evidence で challenge する。 | fix が issue に対応しているか確認する。 | failed output、corrected command、before/after evidence。 |
| Consensus | substantive PASS を受け入れ、residual risk を示す。 | rubber stamp ではないことを確認する。 | PASS rationale、consensus text、cascade result。 |

turn boundary を越えて作業しないでください。Lisa turn の間、Ralph は read-only context を集められますが、新しい work を submit したり、review 中の files を変更したりしてはいけません。

<!-- section: configuration -->
## 設定とコマンド

よく使うコマンド:

| Command | Use |
|---------|-----|
| `ralph-lisa session-role` | 現在の process が Ralph、Lisa、standalone のどれか確認します。 |
| `ralph-lisa start` | task 用の dual-agent loop を開始します。 |
| `ralph-lisa whose-turn` | どちらが行動できるか確認します。 |
| `ralph-lisa read review.md` | Lisa の最新 review を読みます。 |
| `ralph-lisa submit-ralph --file .dual-agent/submit.md` | Ralph の work を file から安全に submit します。 |
| `ralph-lisa status` | step、round、turn、watcher heartbeat を確認します。 |
| `ralph-lisa recap` | context compaction 後に current state を復元します。 |

setup validation では、小さく具体的な task から始めます。documentation work では、site build、link validation、source-evidence inspection、content-safety scan、generated page existence を優先します。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`
- `.dual-agent`
- `gate-manifest.json`

<!-- section: related -->
## 関連ページ

- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Gates and Attestation](gates-attestation.md)
- [Clarify and Planning](clarify-and-planning.md)
