# 权限和安全

> 本页作为 CCL 公开文档源维护。若将来恢复生成流程，必须先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 用途

CCL 权限系统保护模型请求变成真实本机或外部服务动作的边界。权限覆盖 shell 命令、文件修改、notebook 编辑、MCP 工具、agent 委托、用户问题工具、sandbox 决策、hook、SDK permission callback，以及公开发布前的安全检查。

权限不是一个全局 yes/no 开关。CCL 会合并权限模式、显式 allow/deny/ask 规则、工具自身校验、工作目录检查、sandbox 策略、hook 决策和非交互式兜底。因此文档应解释决策路径，而不是声称某个 flag 能单独保证安全。

<!-- section: capabilities -->
## 能力

CCL 支持多种权限模式，包括默认审批行为、plan mode、accept-edits 行为、bypass permissions 和 don't-ask 行为。部分内部或特性开关模式可以加入 classifier 驱动的自动判断，但公开使用原则不变：破坏性或敏感操作应由显式规则约束，并有可审查证据。

规则按行为分组：

- `allow`：批准匹配的工具或工具输入范围。
- `deny`：移除或阻止匹配工具；blanket deny 还会过滤模型可见工具池。
- `ask`：即使其他路径可能允许，也强制请求用户审批。

规则可以来自 settings、CLI 参数、命令或 session 状态。MCP 支持服务器级规则，因此可以指向整个服务器命名空间，而不必逐个列出生成的工具名。

<!-- section: operational-model -->
## 运行模型

权限决策是有意分层的。CCL 先检查工具是否被 blanket deny，再评估工具自身安全检查和 rule-based permissions。Pre-tool hook 可以允许、拒绝或要求审批。权限模式可以在非交互场景中把 ask 转为 deny，也可以在启用相关特性时进入 classifier 辅助判断。SDK 宿主也可以提供 permission prompt tool；如果宿主回调失败或返回不可识别结果，安全行为是 fail closed。

`bypassPermissions` 不是 scoped rule 的替代品。它只适合操作者接受风险的受控环境。部分检查优先级高于普通 prompt，需要用户交互的工具仍需要交互路径。`dontAsk` 应被理解为 fail-closed 自动化：凡是 CCL 本来要询问的地方都会拒绝。

公开文档示例绝不能包含真实 secret、私有绝对路径、真实 API key 或内部网络地址。文档站是公开发布产物，发布前必须通过安全扫描。

<!-- section: configuration -->
## 配置和命令

使用 `/permissions` 做交互式管理，使用 CLI flags 或 settings 做可重复配置。优先使用具体命令前缀或工作区路径这类窄规则，避免允许所有 shell 命令这类宽规则。只有整个团队都应继承时，才把持久规则放入项目或 managed settings；一次性工作使用 session-scoped grant。

推荐做法：

- 把 deny 规则放在离受保护资源最近的位置。
- 对破坏性命令和跨边界工具使用 ask 规则。
- hook 保持短小、可审计；复杂分析移到有测试覆盖的脚本。
- 依赖用户判断的 workflow 不要盲目 headless 自动化，除非已经接入 fail-closed permission prompt callback。
- 发布文档或公开产物前运行文档和 public audit。

<!-- section: source-evidence -->
## 源码依据

- `utils/permissions/PermissionMode.ts`：映射权限模式和外部模式名。
- `utils/permissions/permissions.ts`：解析 allow、ask、deny、模式转换、hook 决策、classifier 行为和 headless 兜底。
- `utils/permissions/PermissionRule.ts` 与 `utils/permissions/permissionRuleParser.ts`：定义规则结构和解析逻辑。
- `tools.ts`：在模型获得工具池前过滤 blanket-denied 工具。
- `tools/BashTool/*`、`tools/PowerShellTool/*` 和 `utils/sandbox/*`：实现命令校验、shell 安全和 sandbox 决策。
- public docs 站点中的 `scripts/audit-public-content.sh` 与 `scripts/check-docs.mjs`：对文档发布安全做机械检查。

<!-- section: related -->
## 相关页面

- [内置工具](tools.md)
- [Hooks](hooks.md)
- [MCP 服务器和工具](mcp.md)
- [公开文档发布](public-docs.md)
