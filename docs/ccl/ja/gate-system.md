# Gate System

> このページは CCL documentation inventory から管理されています。生成フローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

Gate system は claim を runnable checks に変えます。gate は command だけではありません。証明する claim、expected pass criteria、result record を含みます。RLL では、plan を honest に保ち、missing evidence や irrelevant evidence のまま consensus に進むことを防ぎます。

public documentation では、gate は documentation quality を直接証明する必要があります。runtime unit test が pass しても、public page が accurate、安全、translated、linked、rendered correctly であることは証明しません。

<!-- section: capabilities -->
## 機能

- slice に required verification rows を定義します。
- 各 row に unit、smoke、functional、integration、e2e、security などの tier を関連付けます。
- configured の場合、post-submission と post-consensus cascade を実行します。
- pass/fail output を保存し、Lisa が prose だけに依存せず verify できるようにします。
- 古い incident report に historical token、IP、endpoint name が含まれる場合、archive scan と current official-source scan を分離します。

<!-- section: operational-model -->
## 運用モデル

強い gate row には五つの性質があります。

| Property | Strong example | Weak example |
|----------|----------------|--------------|
| Scope | current public docs source と generated site を scan する。 | archive reports を含む `docs` 全体を曖昧に scan する。 |
| Oracle | real-looking keys が 0 matches である。 | grep output を貼るだけ。 |
| Relevance | docs change に site build と link check を使う。 | prose-only edit に無関係な unit test だけを使う。 |
| Reproducibility | exact command、cwd、expected exit code が明確。 | "passed locally" だけ。 |
| Evidence | log path または captured output がある。 | 再確認できる evidence がない。 |

gate failure は最小責任範囲に loop back します。command が間違っているなら command または scope を直します。content が間違っているなら content を直します。real failure を隠すために oracle を弱めないでください。

<!-- section: configuration -->
## 設定とコマンド

重要な inputs:

| Artifact | Role |
|----------|------|
| `gate-manifest.json` | canonical tiers と project baseline を宣言します。 |
| `.rll/PLAN.md` | human-readable plan rows と acceptance cases。 |
| `.dual-agent/auto-tdd-plan-<step>.json` | cascade automation が使う machine-readable rows。 |
| `.dual-agent/gate-results.md` | gate output と cascade status。 |
| `.dual-agent/harness-results/` | 長い logs と evidence files。 |

docs publication では、`node scripts/check-docs.mjs`、public-content audit、static site build、generated-page existence、source-evidence validation、current source tree に対する targeted security scans を使います。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.rll/PLAN.md`
- `.dual-agent/gate-results.md`

<!-- section: related -->
## 関連ページ

- [Gates and Attestation](gates-attestation.md#gates)
- [Attestation](attestation.md)
- [Public Documentation Publishing](public-docs.md)
