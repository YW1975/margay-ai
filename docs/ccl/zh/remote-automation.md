# 远程会话与自动化

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 提供 server、open、SSH、assistant bridge、remote setup、remote environment、bridge kick 和 remote trigger 等接口，用于 detached 或远程控制会话。

<!-- section: capabilities -->
## 能力范围

- 使用 host、port、token、socket、workspace、idle timeout 和 max session 选项启动 session server。
- 通过 `open` URL 或 SSH 部署流程连接。
- 使用 bridge 与 remote trigger 工具进行受控自动化。

<!-- section: operational-model -->
## 运行模型

- 远程自动化会扩大影响范围，必须配合显式认证、workspace 作用域、idle timeout 和最小权限。

<!-- section: configuration -->
## 配置与命令

- 相关命令和工具：`server`、`open`、`ssh`、`assistant`、`remote-setup`、`remote-env`、`bridge-kick` 和 `RemoteTriggerTool`。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`
- `commands/assistant/assistant.ts`
- `commands/remote-setup`
- `commands/remote-env`
- `commands/bridge-kick.ts`
- `tools/RemoteTriggerTool`

<!-- section: related -->
## 相关页面

- [CLI 参考](cli-reference.md)
- [权限与安全](permissions-security.md)
- [认证](authentication.md)
- [故障排查](troubleshooting.md)
