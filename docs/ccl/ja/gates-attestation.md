# ゲートとアテステーション

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

ゲートとアテステーションは、提出作業をテストコマンド、合否数、変更 case、プロセス証拠、レビュー結果に結びつけ、CCL の納品を監査可能にします。

<!-- section: capabilities -->
## 機能範囲

- 正確なテストコマンドと結果を記録します。
- コードまたは文書変更を受入 case に結びつけます。
- 設定されている場合、証拠不足の提出をポリシーチェックでブロックします。
- アーキテクチャ議論と開発開始時のテストゲートを分けます。
- 後の監査で slice がなぜ通ったかを復元できるよう、レビュー証拠を残します。

<!-- section: operational-model -->
## 運用モデル

- ドキュメント作業のゲートは、単体テスト TDD を模倣するのではなく、公開安全性、言語整合、リンク完全性、翻訳品質、ソース正確性を証明すべきです。
- コードを含む作業では、ゲートは振る舞いが変わったことと周辺 regression suite がまだ通ることを証明すべきです。
- PASS はレビュー証拠であり、失敗したゲートを回避する近道ではありません。

<!-- section: configuration -->
## 設定とコマンド

- RLL 提出では attest 行を使い、必要に応じてログを `.dual-agent/harness-results` に保存します。
- `[PLAN]` は architecture と scope alignment のためのものです。`[TDD-PLAN]` は、complex または expert の code-bearing slice で具体的な test case を固定する開発開始 checkpoint です。
- `[CODE]` と `[FIX]` の提出には `Test-Process`、`Test-Cases`、`Test-Results` 行が必要です。Lisa と後の auditor が claim と evidence を接続できるようにします。

## ゲート

<a id="gates"></a>

ゲートは具体的な主張に結びついた実行可能なチェックです。公開文書では、生成文書の整合、リンク完全性、ソース証拠の存在、禁止ブランド表現スキャン、私有パス/secret スキャン、サイトビルド、デプロイ後の live URL 取得が有用です。主張する要件を覆わない green check は弱い証拠です。

## ゲートの種類

| ゲート種類 | 証明すること | 文書の例 | コードの例 |
| --- | --- | --- | --- |
| 構造 | 必須 artifact が存在し inventory と一致する。 | すべての inventory page が `en`、`zh`、`ja` に存在する。 | 期待される source と test file が存在する。 |
| 安全性 | 公開出力が private または sensitive data を漏らさない。 | secret、private path、禁止 branding scan が通る。 | secret と dangerous-permission check が通る。 |
| 振る舞い | 変更された動作が実際に機能する。 | rendered site に新しい page content と link がある。 | unit、integration、smoke、e2e test が変更 path を実行する。 |
| ソース正確性 | 主張が source または runtime output に裏付けられる。 | page source-evidence が実ファイルと検証済み command を指す。 | test が検証対象の function、CLI path、API response を引用する。 |
| レビュー | 第二の agent が証拠を確認した。 | Lisa が page line と validation command を引用する。 | Lisa が関連 test と変更 file を再実行または確認する。 |

## アテステーション

<a id="attestation"></a>

アテステーションは、どのコマンドを実行したか、何を覆ったか、合否、ログの場所、どの受入 case を証明するかを記録するプロセス証拠です。RLL 提出で要求される `Test-Process`、`Test-Cases`、`Test-Results` 行は、証拠を再確認可能で反証可能にするためのものです。

Ralph の `[CODE]` と `[FIX]` に必要な attest 行:

| 行 | 用途 |
| --- | --- |
| `Test-Process` | 何を変更したかをまとめ、process evidence file または diff range を指します。 |
| `Test-Cases` | この round で実行した locked plan rows を示します。 |
| `Test-Results` | 正確な command、pass/fail/total counts、evidence file を示します。 |

Lisa の必須レビュー証拠:

| レビュー項目 | 用途 |
| --- | --- |
| ファイルと行番号の引用 | 承認を具体的 artifact に結びつけ、rubber-stamp review を防ぎます。 |
| テストログまたは command result | Lisa が prose だけでなく stated oracle を確認したことを示します。 |
| PASS rationale または needs-work reason | 技術的な判断理由を記録します。 |

## 複雑度ゲート

<a id="complexity-gates"></a>

複雑度ゲートはリスクに応じて拡張します。文書のみの slice では、無関係な unit test が内容品質を証明すると見なしてはいけませんが、文書専用チェックは実行すべきです。コードを含む slice では、プロジェクト manifest と計画に対応する unit、integration、smoke、security、e2e の tier を含めます。

## 文書証拠パターン

公式文書では、最も強い証拠セットは次の通りです。

| 証拠 | 重要な理由 |
| --- | --- |
| Inventory parity | すべての public page が対応言語すべてに存在することを証明します。 |
| Section-marker parity | 翻訳が同じ structural contract を保つことを証明します。 |
| Public content audit | secret、local path、private deployment detail、古い version claim をブロックします。 |
| Site build | 生成された static site が公開可能であることを証明します。 |
| Rendered HTML spot checks | markdown から site への変換後も content が存在することを証明します。 |
| Source-evidence scan | factual claim が implementation または runtime output に追跡できることを証明します。 |

そのため、文書タスクに偽の TDD は不要です。テストは必要ですが、文書の真実性、安全性、公開可能性を検証するテストであるべきです。

<!-- section: source-evidence -->
## ソース上の根拠

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent`

<!-- section: related -->
## 関連ページ

- [Ralph-Lisa ループ](ralph-lisa-loop.md)
- [確認と計画](clarify-and-planning.md)
- [GitHub と CI ワークフロー](github-ci.md)
