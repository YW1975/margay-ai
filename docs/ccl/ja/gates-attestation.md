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

<!-- section: operational-model -->
## 運用モデル

- ドキュメント作業のゲートは、単体テスト TDD を模倣するのではなく、公開安全性、言語整合、リンク完全性、翻訳品質、ソース正確性を証明すべきです。

<!-- section: configuration -->
## 設定とコマンド

- RLL 提出では attest 行を使い、必要に応じてログを `.dual-agent/harness-results` に保存します。

## ゲート

<a id="gates"></a>

ゲートは具体的な主張に結びついた実行可能なチェックです。公開文書では、生成文書の整合、リンク完全性、ソース証拠の存在、禁止ブランド表現スキャン、私有パス/secret スキャン、サイトビルド、デプロイ後の live URL 取得が有用です。主張する要件を覆わない green check は弱い証拠です。

## アテステーション

<a id="attestation"></a>

アテステーションは、どのコマンドを実行したか、何を覆ったか、合否、ログの場所、どの受入 case を証明するかを記録するプロセス証拠です。RLL 提出で要求される `Test-Process`、`Test-Cases`、`Test-Results` 行は、証拠を再確認可能で反証可能にするためのものです。

## 複雑度ゲート

<a id="complexity-gates"></a>

複雑度ゲートはリスクに応じて拡張します。文書のみの slice では、無関係な unit test が内容品質を証明すると見なしてはいけませんが、文書専用チェックは実行すべきです。コードを含む slice では、プロジェクト manifest と計画に対応する unit、integration、smoke、security、e2e の tier を含めます。

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
