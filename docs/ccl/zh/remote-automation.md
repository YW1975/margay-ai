# 远程会话与自动化

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 提供 session server、open URL、SSH、assistant bridge、remote setup、remote environment、remote-control bridge 和 remote trigger 等接口，用于 detached 或远程控制会话。

<!-- section: capabilities -->
## 能力范围

- 使用 host、port、bearer token、unix socket、workspace、idle timeout 和 max-session 选项启动 session server。
- 在安装构建启用时，通过内部 `open` URL、SSH 部署流程或 assistant bridge session 连接。
- 当 feature flag、认证和 policy 允许时，使用 remote-control bridge 与 remote trigger 工具进行受控自动化。

<!-- section: operational-model -->
## 运行模型

- 远程自动化会扩大影响范围，必须配合显式认证、workspace 作用域、idle timeout 和最小权限。
- remote environment 与 background remote session 是部署门控能力。资格检查包括 remote-session policy、登录状态、已配置 remote environment、git 仓库状态，以及 GitHub app 或 bundle-seeding 前置条件。

<!-- section: configuration -->
## 配置与命令

- 相关命令和工具：`server`、`open`、`ssh`、`assistant`、`remote-control`、`session`、`remote-setup`、`remote-env` 和 `RemoteTriggerTool`。
- `bridge-kick` 是用于手动注入 bridge 失败状态的内部诊断命令，不应视为稳定公开自动化 API。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`
- `commands/assistant/assistant.ts`
- `commands/session`
- `commands/bridge`
- `commands/remote-setup`
- `commands/remote-env`
- `commands/bridge-kick.ts`
- `utils/background/remote/remoteSession.ts`
- `tools/RemoteTriggerTool`

<!-- section: related -->
## 相关页面

- [CLI 参考](cli-reference.md)
- [权限与安全](permissions-security.md)
- [认证](authentication.md)
- [故障排查](troubleshooting.md)
