# 交互式命令

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

交互式命令控制运行中的 CCL 会话，可切换模式、管理上下文、查看成本和文件、配置权限、运行工作流并连接集成。

<!-- section: capabilities -->
## 能力范围

- 核心命令包括 help、config、model、permissions、memory、status、cost、context、compact、clear、resume、diff、commit、review、plan 和 workflows。
- 集成命令覆盖 MCP、IDE、terminal setup、Chrome、GitHub app 安装、remote setup、remote control 和 plugin。
- 诊断命令包括 doctor、endpoint、gateway、stats、insights、usage，以及存在时的 debug tool call 辅助命令。

<!-- section: operational-model -->
## 运行模型

- 除非命令明确写入设置、创建文件、访问服务或启动外部进程，否则命令只作用于当前会话。批准写入前应审阅命令提示和权限请求。

<!-- section: configuration -->
## 配置与命令

- 在交互式会话中输入 `/`，发现当前构建和项目可用的命令。

## 交互式命令如何工作

交互式命令以 `/` 开头，放在消息开头输入。当前可用命令会根据构建版本、项目、feature flag、已安装插件、MCP 状态和会话模式组装。有些命令是隐藏、内部或非交互模式禁用的；运行中构建的真实命令面应以会话内命令面板为准。

命令可能是只读、仅影响当前会话、写入设置、调用服务或启动外部进程。应把这种副作用类别视为命令契约的一部分。例如 `/status` 是检查命令，`/gateway login` 会写入网关凭据，workflow 或 remote 命令可能启动后台工作。

## 常见工作流中的命令

| 时机 | 常用命令 | 用途 |
| --- | --- | --- |
| 首次会话 | `/help`, `/init`, `/config`, `/permissions`, `/mcp`, `/agents` | 发现当前命令面，设置项目上下文，检查工具策略，连接 MCP server，确认 agent 可见性。 |
| 任务开始前 | `/plan`, `/model`, `/effort`, `/add-dir`, `/memory` | 选择计划深度、模型行为、额外目录和相关持久上下文。 |
| 任务进行中 | `/files`, `/diff`, `/status`, `/cost`, `/context`, `/usage` | 检查涉及文件、待提交变更、运行状态、token/成本/上下文用量，以及可用时的 provider usage。 |
| 上下文过大时 | `/compact`, `/clear`, `/resume`, `/rewind`, `/rename` | 压缩上下文、重新开始、恢复旧工作、回到 checkpoint 或标记会话。 |
| 交付前 | `/review`, `/security-review`, `/commit`, `/commit-push-pr`, `/pr-comments` | 审阅变更、检查安全敏感编辑并准备 GitHub 交接。 |
| 故障排查 | `/doctor`, `/gateway doctor`, `/endpoint`, `/debug-tool-call`, `/feedback` | 诊断安装、网关、endpoint、tool-call 或产品问题。 |

## Gateway 命令

`/gateway status` 显示是否已配置网关，并在网关暴露余额字段时显示 token 余额。`/gateway login URL API_KEY` 会验证并保存网关 URL/key。`/gateway register URL INVITE_CODE [USERNAME] [EMAIL] [PHONE]` 通过邀请码创建并连接账号。`/gateway doctor` 会比较 shell 变量、gateway 文件设置、OAuth/API-key 状态和网关可达性。`/gateway logout` 会移除保存的 gateway 文件并清理当前进程变量。

当 shell 变量和保存配置不一致时，先用 `/gateway doctor`。当前实现中，只要 shell 中存在 `CCL_GATEWAY_URL` 或 `CCL_GATEWAY_KEY`，shell 配置就作为原子配置对优先于文件。

## 常用命令参考

| 命令 | 作用 | 何时使用 | 常见问题 |
| --- | --- | --- | --- |
| `/help` | 显示当前会话可用命令。 | 不确定当前构建支持什么时。 | 命令可能因为隐藏、禁用、来自插件或当前模式不支持而不存在。 |
| `/init` | 创建或更新项目指令和设置指导。 | 在缺少有效项目上下文的仓库中开始使用 CCL。 | 不要让生成的指令声称仓库并未实际遵循的策略。 |
| `/config` | 打开配置/设置入口。 | 需要检查或修改应跨 prompt 持久化的行为。 | 设置来源很重要；user、project、local、managed 值可能不同。 |
| `/permissions` | 显示或编辑工具权限规则。 | 工具提示过宽、过严或令人意外时。 | 权限变更会影响未来工具调用；仔细检查 deny/ask/allow。 |
| `/model` | 在支持时检查或切换模型选择。 | 当前任务需要不同速度、成本或能力画像时。 | 模型别名和网关模型名并不总是同一概念。 |
| `/effort` | 在当前模型路径支持时调整 reasoning effort。 | 任务需要更深推理或更快浅层处理时。 | 更高 effort 可能增加延迟或成本。 |
| `/memory` | 管理记忆/上下文入口。 | 可复用项目知识需要审阅或更新时。 | 不要把密钥或一次性假设写入持久记忆。 |
| `/add-dir` | 把额外目录加入会话上下文。 | 任务跨越当前工作目录之外时。 | 过大或无关目录会增加上下文并拖慢工作。 |
| `/files` | 显示会话已知文件上下文。 | 需要了解当前涉及哪些文件时。 | 它不保证仓库所有文件都已被读取。 |
| `/diff` | 显示待提交变更。 | 审阅、提交或交接前。 | 生成文件会让 diff 变吵；应单独检查源文件变更。 |
| `/status` | 显示当前会话状态。 | 需要快速查看状态且不改变任何东西时。 | 它是诊断命令，不是修复命令。 |
| `/cost` | 在 usage 数据可用时显示成本/token 统计。 | 需要理解花费或上下文增长时。 | cache 计数只有在 transport 返回已验证字段时才有意义。 |
| `/context` | 检查上下文用量。 | 会话过长、变慢或接近上下文限制时。 | 上下文大小本身不会指出哪些内容最不重要。 |
| `/usage` | 显示当前部署暴露的 usage 信息。 | 需要 provider/gateway usage 细节时。 | 部分部署不会返回所有 usage 字段。 |
| `/compact` | 压缩对话上下文。 | 会话很长但需要继续时。 | 压缩可能丢失低显著细节；先总结关键约束。 |
| `/clear` | 开始干净对话状态。 | 当前上下文不再有用时。 | 清空不会撤销文件变更。 |
| `/resume` | 恢复旧会话。 | 继续之前的工作时。 | 选择正确会话；相似名称可能混淆。 |
| `/rewind` | 在支持时回到较早 checkpoint。 | 需要回退对话状态时。 | 它不是 git reset；仍需单独检查文件。 |
| `/rename` | 重命名会话。 | 需要未来更容易发现会话时。 | 上下文太少时生成名称可能失败。 |
| `/plan` | 切换或调用计划行为。 | 重大编辑或模糊任务前。 | 计划不是实现；仍要用测试或文档检查验证。 |
| `/review` | 执行审阅导向分析。 | 提交、PR 或交接前。 | 审阅输出是待检查证据，不是自动批准。 |
| `/security-review` | 查找安全敏感问题。 | 改动涉及认证、密钥、shell、网络、权限或发布时。 | 不能替代密钥扫描或 policy gate。 |
| `/commit` | 在启用时准备提交流程。 | 变更已审阅且可记录时。 | 检查 diff 和测试证据前不要使用。 |
| `/commit-push-pr` | 在启用时自动 commit、push、开 PR。 | 仓库策略允许自动 GitHub 交接时。 | 需要正确分支、认证和审阅纪律。 |
| `/mcp` | 在会话内管理 MCP 工具 server。 | 需要连接、检查或切换外部工具时。 | workspace trust 很重要；不要随意启动不可信 stdio server。 |
| `/agents` | 显示或管理 active agent 可见性。 | 需要知道哪些内置/自定义/插件 agent 可用时。 | MCP 要求或设置来源可能隐藏预期 agent。 |
| `/hooks` | 检查 hook 配置。 | 工具行为被策略自动化改变时。 | hook 可阻止或改写工具输入；检查事件作用域。 |
| `/workflows` | 创建、列出、运行、tail 或检查 workflow 自动化。 | 可重复多步骤操作需要结构和验证时。 | 后台 workflow run 需要明确 tail/inspect 跟进。 |
| `/endpoint` | 在配置时 pin、检查或切换 endpoint 路由。 | 怀疑模型路由或 endpoint 兼容问题时。 | endpoint 切换依赖已配置 registry 数据。 |
| `/gateway` | 管理 Margay 网关状态、登录、注册、doctor 和登出。 | 需要检查或修改网关凭据/可达性时。 | shell 变量可能遮蔽保存的 gateway 配置。 |

## 诊断与成本

<a id="diagnostics-and-cost"></a>

诊断可使用 `/cost`、`/context`、`/usage`、`/stats`、`/insights`、`/endpoint` 和 `/gateway doctor`。只有当 active transport 返回已验证 usage 字段时，cache-read 和 cache-write 计数才可用于解释命中；否则文档不应声称 cache 命中率。

<!-- section: source-evidence -->
## 源码依据

- `commands`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `commands/workflows/index.ts`
- `commands/permissions/permissions.tsx`
- `commands/hooks/hooks.tsx`

<!-- section: related -->
## 相关页面

- [CLI 参考](cli-reference.md)
- [网关与模型路由](model-routing.md)
- [工作流](workflows.md)
- [权限与安全](permissions-security.md)
- [Hook](hooks.md)
