# 远程会话与自动化

> 本页作为公开文档源维护。远程自动化会扩大影响范围；必须说明认证、workspace 和 policy 边界。

<!-- section: purpose -->
## Purpose

CCL 可以在单个本地终端之外运行：server mode、direct-connect URLs、SSH launch、background remote sessions、assistant/bridge surfaces、remote setup、remote environment management 和 remote-trigger tooling。这些入口很强，因为它们可能在用户当前 shell 之外执行工作；必须配合显式认证、workspace scope、idle limits 和最小权限。

<!-- section: capabilities -->
## Capabilities

- 启动 CCL session server，并配置 host、port、bearer token、Unix socket、default workspace、idle timeout 和 max-session controls。
- 通过内部 `open` URL 连接 CCL server，并可使用 headless print mode。
- 启用 SSH remote feature 时运行 `ccl ssh <host> [dir]`；该流程会部署 binary，并把本地 API auth tunnel 到 remote host。
- 使用 `remote-setup` 和 `remote-env` 命令入口进行远程环境设置与检查。
- 只有 policy、login、remote environment、git repository state 和 repository access checks 都通过时，才创建 background remote sessions。
- 相关 gate 或环境 override 启用时，允许 bundle-seeded remote execution。
- 只有 feature gates、quota/billing gates 和 preconditions 允许时，才使用 remote review 和 remote task surfaces。

<!-- section: operational-model -->
## Operational model

Server mode 受 direct-connect feature gate 控制。它会探测已有 server，启动 session manager，创建或接受 bearer token，写入 server lock，执行 idle timeout 和 max-session limits，并在 shutdown 时移除 lock。

SSH mode 受 SSH remote feature gate 控制，并在普通 commander action 前通过 early argument rewriting 处理。它拒绝 SSH launch 的 headless print mode，转发部分 resume/model flags，并把 local mode 作为 auth-proxy 的端到端测试路径。

Background remote sessions 会执行显式 precondition checks。Policy 可以直接阻止 remote sessions。Login state、remote environment availability、当前 git repository state、GitHub remote presence、GitHub App installation 和 bundle-seeding gates 共同决定 eligibility。失败是类型化的，因此诊断可以区分 “not logged in”、“no remote environment” 和 “repository access missing”。

远程自动化应作为单独执行环境审计。本地会话可能只负责启动或跟踪工作；远程环境会根据自身策略执行命令、访问仓库内容并消耗凭据。

排查远程失败时，不要只看本地终端输出。应同时确认远程环境是否存在、仓库是否有可识别的远端、GitHub App 是否已安装、令牌同步是否完成、策略是否允许后台任务，以及失败是否发生在启动前置检查、传输、远程命令执行或结果回传阶段。

<!-- section: configuration -->
## Configuration and commands

- Server mode：`ccl server --port <n> --host <addr> --auth-token <token> --workspace <dir> --idle-timeout <ms> --max-sessions <n>`。
- Direct connect：启用时使用 `ccl open <cc-url>`，或 `ccl open <cc-url> --print --output-format stream-json`。
- SSH launch：启用时使用 `ccl ssh <user@host|ssh-config-alias> [dir]`，可带 permission-mode 相关 flags。
- Remote setup：`/remote-setup` 或对应命令模块。
- Remote environment：`/remote-env` 或对应命令模块。
- Remote session 诊断：记录 failed precondition type、当前 repository state、remote availability、GitHub access method 和 policy status。
- 除非 remote host 是一次性且隔离的，否则不要在远程主机上使用 `dangerously-skip-permissions`。

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` 定义 `server`、`open`、`ssh` 命令入口、feature gates、bearer token setup、lock handling、idle limits 和 early SSH argument rewriting。
- `utils/background/remote/preconditions.ts` 实现登录状态、远程环境、Git 仓库、GitHub App、令牌同步和仓库访问检查。
- `utils/background/remote/remoteSession.ts` 定义 background remote session state 和类型化 precondition failures。
- `commands/remote-setup/index.ts` 与 `commands/remote-env/index.ts` 暴露 remote setup 和 remote environment 命令入口。
- `commands/review/reviewRemote.ts` 展示远程评审启动前置条件、额度检查和远程任务启动行为。
- `utils/teleport.tsx` 包含 remote environment 和 bundle-seeding integration，供 remote execution flows 使用。

<!-- section: related -->
## Related pages

- [认证](authentication.md)
- [权限与安全](permissions-security.md)
- [GitHub 与 CI 工作流](github-ci.md)
- [CLI 参考](cli-reference.md)
- [故障排查](troubleshooting.md)
