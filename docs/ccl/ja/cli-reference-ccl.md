# CCL CLI 互換リファレンス

> このページは公開ドキュメントのソースとして保守されています。Compatibility notes の置き場所と、legacy または hidden command surfaces の扱いを説明します。

<!-- section: purpose -->
## Purpose

Compatibility reference は CCL command behavior、compatibility literals、aliases、stability guidance を unified CLI reference に接続します。これは、一部の source-level names と flags が compatibility のため残っていても、public workflow は CCL terms で説明すべきだからです。

<!-- section: capabilities -->
## Capabilities

- Users を canonical [CLI リファレンス](cli-reference.md) へ案内します。
- Compatibility names が flags、environment variables、source comments、wire formats に現れても、public product name は変わらないことを説明します。
- Hidden、internal、feature-gated、deployment-specific commands は、条件が document されていない限り stable user automation として扱いません。
- Installed build の `ccl --help` が local command surfaces の最終情報源であることを明確にします。
- 古い external references のため `ccl-compatibility` section への links を保持します。

<!-- section: operational-model -->
## Operational model

Compatibility は documentation constraint であり、別の CLI product ではありません。Behavior が public `ccl` command の一部なら、[CLI リファレンス](cli-reference.md)、[コマンド](commands.md)、または feature-specific page に記録します。Literal が underlying SDK、legacy flag、internal wire protocol との compatibility のためだけに存在する場合は、users が configure/debug する必要があるときだけ mention します。

Source に command が存在しても、public automation に適するとは限りません。Hidden commands、internal URL openers、bridge helpers、debug-only paths、feature-gated remote surfaces、ordinary print mode で意図的に skip される command paths などがあります。Docs は stable public entry point を示し、internals への依存を勧めないようにします。

Compatibility literal が避けられない場合は、users が観測する効果と、それが残っている理由を記録します。たとえば別の CLI や SDK がその spelling を期待するため flag が残っていても、推奨される CCL workflow は別の command を使う場合があります。この区別により、implementation name を product promise と誤解することを防げます。

Compatibility review では negative scope も確認します。Command が help から隠れている、feature gate が必要、internal URL scheme を開く、または automated tests のためだけに存在する場合、public page では省略するか条件を明示します。Source で runnable であることは evidence ですが、official API であるとは限りません。

<!-- section: configuration -->
## Configuration and commands

- Canonical CLI reference: [CLI リファレンス](cli-reference.md)
- Compatibility anchor: [CLI リファレンス: CCL Compatibility](cli-reference.md#ccl-compatibility)
- Local command availability は `ccl --help` と、対応する場合は `ccl <command> --help` で確認します。
- Scriptable work では undocumented internal commands ではなく、`ccl -p "..." --output-format json` または `stream-json` を優先します。
- Source comments、hidden flags、deployment-specific helpers は implementation evidence であり、stable user APIs ではありません。
- Compatibility literal を document するときは、active CCL command、legacy または wire-compatible literal、users がそれを見る理由、supported troubleshooting path を一緒に記録します。

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` は最上位の `ccl` コマンド、表示される flags と隠し flags、print mode の動作、子コマンド登録、remote/open 系の入口、認証、MCP、plugin、version 出力を定義します。
- `main.tsx` は `-p/--print` mode で ordinary subcommand registration を明示的に skip するため、print-mode automation と interactive/subcommand behavior は別々に document します。
- `commands/version.ts` は有効な session で local version command を提供します。
- `docs/ccl/en/cli-reference.md` は canonical public command table と `ccl-compatibility` anchor を含みます。
- `scripts/check-docs.mjs` は public docs から forbidden branding と stale compatibility residue を防ぎます。
- `main.tsx` の help text と command registration conditions は、compatibility surface が visible、hidden、print-mode-only、interactive-only、deployment-gated のどれかを判断する source of truth です。

<!-- section: related -->
## Related pages

- [CLI リファレンス](cli-reference.md#ccl-compatibility)
- [コマンド](commands.md)
- [インタラクティブセッションと Print Mode](interactive-sessions.md)
- [環境変数](env-vars.md)
- [トラブルシューティング](troubleshooting.md)
