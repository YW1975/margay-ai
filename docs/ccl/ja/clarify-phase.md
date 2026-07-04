# Clarify Phase

> このページは CCL documentation inventory から管理されています。生成フローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

Clarify phase は、曖昧な request が広すぎて review できない implementation になるのを防ぎます。scope が不明、requirements が衝突、destructive action の可能性、publication authority が不明、または hidden assumption が大きな rework を生むほど複雑な場合に使います。

Clarification は儀式ではありません。user goal と repository state から安全な next action が明らかな場合は進めます。user だけが決められる選択に task が依存する場合だけ、decision を先に記録します。

<!-- section: capabilities -->
## 機能

- user request の accepted understanding を lock します。
- covered scope と negative scope を記録し、implementation drift を防ぎます。
- plan が binding になる前に user decisions、trade-offs、known risks を保存します。
- documentation-specific uncertainty と code-specific uncertainty を分けます。
- Lisa が direction alignment を確認できる stable artifact を作ります。

<!-- section: operational-model -->
## 運用モデル

有効な clarify artifact は、次の五つを答えます。

| Field | What it proves |
|-------|----------------|
| Understanding | Ralph が user goal を具体的に再説明できる。 |
| Covered scope | work area が verify できる粒度で明示されている。 |
| Negative scope | 近いがやらない work が意図的に除外されている。 |
| Decisions | user-confirmed choices が traceable である。 |
| Risks | known uncertainty が implementation 前に見える。 |

official documentation work では、authoritative destination、publication source、current truth、archive-only context、multilingual parity の要否を clarify します。source のない feature claim を削除するのか、source evidence を追加するのかも明記します。

user input が必要なときは一問ずつ聞きます。code search や existing configuration で答えられることを、推測の質問として user に渡さないでください。

<!-- section: configuration -->
## 設定とコマンド

関連する RLL commands:

| Command | Purpose |
|---------|---------|
| `ralph-lisa clarify --start` | complex task の clarify workflow を開始します。 |
| `ralph-lisa clarify --status --json` | clarify が committed か、negative scope が locked か確認します。 |
| `ralph-lisa clarify --add-answer <id> "<answer>"` | user answer を記録します。 |
| `ralph-lisa clarify --commit ...` | understanding、covered scope、negative scope、risks を finalize します。 |
| `ralph-lisa clarify --skip` | user が risk を受け入れる場合に明示的に skip します。 |

documentation-only task の clarify result は、source authority、topic coverage、user-spec compliance、logical coherence、public safety の documentation oracle に変換します。runtime behavior も変更する task でない限り、code TDD cases を無理に適用しません。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.dual-agent`
- `gate-manifest.json`

<!-- section: related -->
## 関連ページ

- [Clarify and Planning](clarify-and-planning.md#clarify-phase)
- [Complexity System](complexity-system.md)
- [Gates and Attestation](gates-attestation.md)
