# Attestation

> このページは CCL documentation inventory から管理されています。生成フローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

Attestation は submitted work と verifiable results を結び付ける evidence format です。どの process を使ったか、どの acceptance cases に触れたか、どの command output が結果を証明するかを答えます。attestation がなければ、review は auditable delivery checkpoint ではなく trust exercise になります。

Lisa へ work を submit するとき、failure に対応する fix を出すとき、publication が build、scan、rendered output、external destination に依存するときに使います。

<!-- section: capabilities -->
## 機能

- change を作った process を特定します。
- submission が cover する acceptance cases または test rows を示します。
- pass/fail counts と exact command を記録します。
- copied summary ではなく durable log files を reviewer に示します。
- check を意図的に skip または narrow した場合の residual risk を記録します。

<!-- section: operational-model -->
## 運用モデル

RLL code または fix submission には、少なくとも次の lines が必要です。

```text
Test-Process: <summary> | Test-Process-File: <path> | Test-Process: git-diff <range>
Test-Cases: C1, C3
Test-Results: cmd="<command>" passed=N failed=0 total=M | Test-Results-File: <path>
```

documentation work でも同じ考え方を使います。command が unit test でなくてもかまいません。有効な docs attestation は site build、link check、content safety scan、rendered-page inspection、source-evidence diff、translation parity check、live publication fetch を cite できます。

check を skip する場合は、skip が妥当な理由と risk を cover する evidence を書きます。"requires e2e" は、mockable または statically verifiable な docs/source claim を skip する理由にはなりません。

<!-- section: configuration -->
## 設定とコマンド

推奨 evidence locations:

| Location | Use |
|----------|-----|
| `.dual-agent/harness-results/<name>.md` | human-readable command output と review evidence。 |
| `.dual-agent/test-reports/` | structured または generated test reports。 |
| `.dual-agent/visual-evidence/` | UI または rendered-page claims の screenshots。 |
| `.dual-agent/gate-results.md` | cascade と gate summary。 |
| `.dual-agent/submit.md` | exact submitted work または consensus text。 |

public docs で source tree と rendered tree の両方が重要な場合、両方を evidence に含めます。Markdown scan だけでは generated page の存在を証明できず、generated page check だけでは source claim の accuracy を証明できません。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.dual-agent`
- `.dual-agent/harness-results`

<!-- section: related -->
## 関連ページ

- [Gates and Attestation](gates-attestation.md#attestation)
- [Gate System](gate-system.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
