# リモートセッションと自動化

> このページは公開ドキュメントのソースとして保守されています。Remote automation は影響範囲を広げるため、auth、workspace、policy boundaries を明確にしてください。

<!-- section: purpose -->
## Purpose

CCL は単一の local terminal の外でも動作できます。Server mode、direct-connect URLs、SSH launch、background remote sessions、assistant/bridge surfaces、remote setup、remote environment management、remote-trigger tooling です。これらは user の現在の shell 以外で work を実行できるため強力です。Explicit authentication、workspace scoping、idle limits、least-privilege permissions と組み合わせる必要があります。

<!-- section: capabilities -->
## Capabilities

- Host、port、bearer token、Unix socket、default workspace、idle timeout、max-session controls を指定して CCL session server を起動できます。
- Internal `open` URLs と optional headless print mode で CCL server に接続できます。
- SSH remote feature が有効な場合、`ccl ssh <host> [dir]` を実行できます。この flow は binary を deploy し、local API auth を remote host に tunnel します。
- `remote-setup` と `remote-env` command surfaces で remote environment setup と inspection を行えます。
- Policy、login、remote environment、git repository state、repository access checks が通った場合だけ background remote sessions を作成できます。
- Relevant gate または environment override が有効な場合、bundle-seeded remote execution を使えます。
- Remote review と remote task surfaces は feature gates、quota/billing gates、preconditions が許す場合だけ使います。

<!-- section: operational-model -->
## Operational model

Server mode は direct-connect feature で gate されます。Existing server を probe し、session manager を起動し、bearer token を作成または受け取り、server lock を書き、idle timeout と max-session limits を適用し、shutdown 時に lock を削除します。

SSH mode は SSH remote feature で gate され、通常の commander actions より前に early argument rewriting で処理されます。SSH launch では headless print mode を拒否し、一部 resume/model flags を forward し、local mode は auth-proxy の end-to-end test path として扱います。

Background remote sessions は explicit precondition checks を実行します。Policy は remote sessions を即座に block できます。Login state、remote environment availability、current git repository state、GitHub remote presence、GitHub App installation、bundle-seeding gates が eligibility を決めます。Failures は typed なので、diagnostics は “not logged in”、“no remote environment”、“repository access missing” を区別できます。

Remote automation は別の execution environment として audit してください。Local session は launch または tracking だけを行う場合があり、remote environment は自分の policy に従って commands、repository content、credentials を扱います。

<!-- section: configuration -->
## Configuration and commands

- Server mode: `ccl server --port <n> --host <addr> --auth-token <token> --workspace <dir> --idle-timeout <ms> --max-sessions <n>`。
- Direct connect: 有効な場合は `ccl open <cc-url>`、または `ccl open <cc-url> --print --output-format stream-json`。
- SSH launch: 有効な場合は `ccl ssh <user@host|ssh-config-alias> [dir]` と optional permission-mode flags。
- Remote setup: `/remote-setup` または対応 command module。
- Remote environment: `/remote-env` または対応 command module。
- リモートセッション診断: 失敗した前提条件の種類、現在のリポジトリ状態、リモート利用可否、GitHub アクセス方式、ポリシー状態を記録します。
- Remote host が disposable かつ isolated でない限り、`dangerously-skip-permissions` は避けてください。

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` は `server`、`open`、`ssh` command surfaces、feature gates、bearer token setup、lock handling、idle limits、early SSH argument rewriting を定義します。
- `utils/background/remote/preconditions.ts` は login、remote environment、git repository、GitHub App、token-sync、repository access checks を実装します。
- `utils/background/remote/remoteSession.ts` は background remote session state と typed precondition failures を定義します。
- `commands/remote-setup/index.ts` と `commands/remote-env/index.ts` は remote setup と remote environment command surfaces を公開します。
- `commands/review/reviewRemote.ts` は remote review launch preconditions、quota checks、remote task launch behavior を示します。
- `utils/teleport.tsx` は remote execution flows が使う remote environment と bundle-seeding integration を含みます。

<!-- section: related -->
## Related pages

- [認証](authentication.md)
- [権限とセキュリティ](permissions-security.md)
- [GitHub と CI ワークフロー](github-ci.md)
- [CLI リファレンス](cli-reference.md)
- [トラブルシューティング](troubleshooting.md)
