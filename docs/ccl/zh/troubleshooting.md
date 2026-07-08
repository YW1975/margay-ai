# 故障排查

> 本页作为公开文档源维护。共享排障记录前必须脱敏。

<!-- section: purpose -->
## Purpose

排查 CCL 应先识别失败层：installation、startup、settings、authentication、gateway routing、endpoint compatibility、context pressure、permissions、MCP、tools、agents、plugins、sessions、remote automation、GitHub integration、documentation publishing 或 RLL governance。一次改多个层通常会隐藏根因。

<!-- section: capabilities -->
## Capabilities

- 用 `ccl doctor` 检查安装方式、更新器、`PATH`、Shell、包管理器、沙箱、托管设置、别名和 `ripgrep` 诊断。
- 用 `/gateway status` 和 `/gateway doctor` 检查 gateway credential、placeholder、reachability、auth-conflict 和 shell-env shadowing。
- 用 `/endpoint`、`/model`、`/priority`、`/effort`、`/cost`、`/usage` 和 `/context` 处理模型路由与 context-window 问题。
- 用 `/permissions`、`/allowed-tools` 和命令自己的 permission prompts 处理工具拒绝问题。
- 用 `ccl mcp list`、`/mcp`、server config、auth status 和 debug logs 处理 MCP 故障。
- 用 `ccl agents --setting-sources user,project,local`、`/agents`、`/skills`、`/plugins` 和 `/hooks` 处理扩展可见性问题。
- 用 remote precondition types 处理 remote-session failures。
- 用 docs validation、public audit、site build、rendered HTML checks 和 coverage matrix checks 处理官方文档故障。

<!-- section: operational-model -->
## Operational model

修改配置前先收集证据。有效报告应包含 exact command、exit code、CCL version、install method、cwd trust state、relevant setting source、脱敏后的环境变量名、model/endpoint selection 和最后一段 diagnostic output。不要包含 tokens、private paths、full transcripts 或 repository secrets。

按层路由很实用：

- Startup failure：检查安装方式、二进制路径、Shell 的 `PATH`、别名、包管理器和更新器状态。
- Auth failure：分开检查网关配置、直连 API key 配置、OAuth 状态和 MCP 服务认证。
- Wrong model：检查模型选择优先级、端点固定、网关配置、分类器输出和调试路由标记。
- Tool denied：检查权限模式、允许/拒绝/询问规则、托管策略和工具级校验。
- Extension missing：检查设置来源、仅插件定制策略、项目信任、裸模式和功能门禁。
- Remote failure：检查 typed preconditions，不要盲目重复 launch。
- Docs failure：分别验证 source Markdown、inventory、audits、build output、generated site 和 hosted URL。

Gateway troubleshooting 应区分 runtime bug 和 gateway service behavior。Cache-hit accounting、provider-side pricing 和 gateway usage fields 只有在 active transport 或 gateway 返回时才是权威证据。

<!-- section: configuration -->
## Configuration and commands

- 环境健康：`ccl doctor`。
- Gateway 诊断：`/gateway doctor`。
- Auth status：`ccl auth status`、`/status`、`/login`、`/logout`。
- Model route：`/model`、`/endpoint`、`/priority`、`/effort`、`/gateway status`、debug file markers。
- Context pressure：`/context`、`/compact`、`/memory`、`/usage`。
- MCP：`ccl mcp list`、`/mcp`、`--mcp-config` 和 MCP auth commands。
- Agent visibility：`ccl agents --setting-sources user,project,local`。
- Plugin/skill/hook visibility：`/plugins`、`/skills`、`/hooks`、`--plugin-dir`、`--bare` 和 setting-source filters。
- GitHub/CI：`gh auth status -a`、`/install-github-app`、`/review`、`/pr-comments`、`/security-review` 和 CI logs。
- 官方文档：`node scripts/check-docs.mjs`、`bash scripts/audit-public-content.sh`、`node scripts/build-site.mjs` 和 `node scripts/check-official-docs-coverage.mjs`。

## Symptom Routing

| Symptom | Start here | Evidence to collect |
| --- | --- | --- |
| CCL 无法启动 | [安装](installation.md) | `ccl --version`、invoked binary、shell PATH、install method、`ccl doctor`。 |
| Login 或 gateway 失败 | [认证](authentication.md) | `/gateway doctor`、脱敏 env 名称、`gateway.json` 是否存在、可用时的 `GET /auth/me` 结果。 |
| 模型或 endpoint 错误 | [网关与模型路由](model-routing.md) | requested model、endpoint pin、gateway config source、debug route markers、usage fields。 |
| 工具被拒绝 | [权限与安全](permissions-security.md) | permission mode、allow/deny/ask rules、managed policy、exact tool input。 |
| MCP 工具缺失 | [MCP 服务器与工具](mcp.md) | `ccl mcp list`、server scope、auth status、policy allow/deny result。 |
| Agent 或 skill 不可见 | [Agents](agents.md)、[Skills](skills.md) | setting sources、project trust、plugin-only policy、bare mode、definition path。 |
| Remote session 被阻止 | [远程会话与自动化](remote-automation.md) | typed precondition、login state、remote env state、git remote、repository access。 |
| GitHub setup 失败 | [GitHub 与 CI 工作流](github-ci.md) | `gh --version`、`gh auth status -a`、repo permissions、workflow/secret existence。 |
| Docs page 损坏 | [公开文档发布](public-docs.md) | local docs check、audit output、build log、rendered HTML path、hosted URL。 |

## 已知限制

以下是当前构建的诚实限制，不是配置错误：

- 后台会话子命令尚不可用。`ccl ps`、`ccl logs`、`ccl attach`、`ccl kill` 以及 `--bg`/`--background` flag 会以清晰的「not available in this build yet」消息退出。后台会话注册表本身工作正常；只有 ps/logs/attach/kill 的 CLI 表面仍是 stub。
- 消息操作菜单（在消息上按 Shift+Up）需要全屏模式。非全屏时菜单按键未接线，菜单不会打开；这是预期行为，不是终端故障。
- Debug agent 的 probe 支持终端（全量）和 web（最小，需要本地浏览器自动化依赖）；desktop probe 尚不支持，会返回清晰错误。

## Escalation Checklist

升级前先准备小复现：exact command、CCL version、脱敏环境变量名、相关 settings source、expected behavior、actual behavior、exit code 和最后一段 diagnostic output。只有在路径是仓库相对且可共享时，才包含文件路径。

<!-- section: source-evidence -->
## Source evidence

- `commands/doctor/doctor.tsx` 与 `utils/doctorDiagnostic.ts` 实现 doctor diagnostics 和 installation health checks。
- `commands/gateway/gateway.tsx`、`commands/gateway/gateway-helpers.ts` 与 `services/gateway/gatewayDoctor.ts` 实现网关状态、诊断发现、占位符检测、环境变量遮蔽和连通性探测。
- `utils/model/endpointCompat.ts`、`utils/model/model.ts`、`commands/model/model.tsx` 与 `commands/endpoint/endpoint.tsx` 实现 route 和 endpoint diagnosis surfaces。
- `services/mcp/config.ts`、`commands/mcp/mcp.tsx` 与 `services/mcp/auth.ts` 提供 MCP diagnosis surfaces。
- `utils/background/remote/remoteSession.ts` 与 `utils/background/remote/preconditions.ts` 定义 remote-session failure categories。
- `commands/install-github-app/install-github-app.tsx`、`commands/review.ts` 与 `commands/pr_comments/index.ts` 提供 GitHub diagnosis 和 review surfaces。
- `scripts/check-official-docs-coverage.mjs` 与 `margay-ai/scripts` 中的 public docs scripts 提供官方文档验证。

<!-- section: related -->
## Related pages

- [CCL 如何工作](how-ccl-works.md)
- [安装与更新](installation.md)
- [认证](authentication.md)
- [网关与模型路由](model-routing.md)
- [MCP 服务器与工具](mcp.md)
- [远程会话与自动化](remote-automation.md)
- [GitHub 与 CI 工作流](github-ci.md)
