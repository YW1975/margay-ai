# 故障排查

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

排查 CCL 时先定位失败层：安装、认证、网关路由、MCP、权限、工具、agent、会话状态、远程控制或治理门禁。

<!-- section: capabilities -->
## 能力范围

- 使用 `ccl doctor` 检查环境健康。
- 使用 gateway 和 endpoint 命令排查路由失败。
- 使用 MCP 诊断和权限提示隔离外部工具失败。

<!-- section: operational-model -->
## 运行模型

- 优先收集分层证据，而不是盲目重试。修改配置前记录精确命令、退出码、日志和构建版本。

<!-- section: configuration -->
## 配置与命令

- 公开 issue 记录应区分 CCL 运行时问题与网关或服务问题，并避免私有 hostname、路径或密钥。

<!-- section: source-evidence -->
## 源码依据

- `commands/doctor`
- `services/gateway/gatewayDoctor.ts`
- `services/api/errors.ts`
- `docs/ccl0622-runtime-issue-record.md`

<!-- section: related -->
## 相关页面

- [安装与更新](installation.md)
- [认证](authentication.md)
- [网关与模型路由](model-routing.md)
- [MCP Server 与工具](mcp.md)
- [远程会话与自动化](remote-automation.md)
