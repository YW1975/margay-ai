# Complexity System

> このページは CCL documentation inventory から管理されています。生成フローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

Complexity system は、task に必要な clarification、planning、verification の深さを決めます。目的は risk に evidence を合わせることです。小さな edit は軽く保ち、cross-page docs、public release、security-sensitive content、多数の surface に触れる work は実装前後に深く確認します。

complexity は名誉ラベルではありません。workflow を変えるときだけ意味があります。clarify が必須か、accepted development-start plan が必要か、どの gate tier が required か、Lisa がどの evidence を独立に verify すべきかを決めます。

<!-- section: capabilities -->
## 機能

- RLL policy が必要とするとき、task を simple、standard、complex、expert に分類します。
- unit、smoke、functional、integration、e2e、security、stability、performance などの verification tiers を推薦します。
- high-confidence tier decisions に source evidence を付けます。
- accepted high-risk tiers を code または documentation publication の前に enforce します。
- documentation evidence と code evidence を区別します。

<!-- section: operational-model -->
## 運用モデル

risk を正直に cover する最も低い complexity level を使います。

| Class | Typical use | Expected evidence |
|-------|-------------|-------------------|
| Simple | typo、小さな safe setting、狭い wording。 | direct inspection または focused command。 |
| Standard | one feature page、one command behavior、contained bug fix。 | focused source evidence と regression check。 |
| Complex | cross-page docs、CLI/runtime contract、public release、migration、security-sensitive content。 | clarify、accepted plan、source matrix、build/check/security evidence。 |
| Expert | multi-system behavior、irreversible migration、deep security、broad automation、不明な external dependency。 | staged plan、independent review、broader gates、explicit residual risk。 |

documentation task では、complexity は自動的に unit tests を意味しません。documentation evidence は source accuracy、feature coverage、link integrity、language parity、public safety、rendered-site usability を証明します。code-bearing task では `gate-manifest.json` の relevant project gates を使います。

<!-- section: configuration -->
## 設定とコマンド

関連 artifacts と commands:

| Item | Use |
|------|-----|
| `gate-manifest.json` | canonical tier IDs と project baseline を定義します。 |
| `.dual-agent/complexity-judge/` | complexity judgment artifacts を保存します。 |
| `ralph-lisa task complexity-judge --slice <name> --extended --json` | structured task classification を生成します。 |
| `ralph-lisa task complexity-verify --slice <name>` | judgment が fresh、schema-valid、policy-compatible か検証します。 |
| `[TDD-PLAN]` | high-risk または code-bearing slice の development-start checkpoint です。 |

documentation-only task では、documentation-specific gates が十分である理由を明示します。behavior を変える task では、visible deliverable が prose であっても code gates を downgrade しません。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent/complexity-judge`

<!-- section: related -->
## 関連ページ

- [Clarify and Planning](clarify-and-planning.md#complexity)
- [Gates and Attestation](gates-attestation.md#complexity-gates)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
