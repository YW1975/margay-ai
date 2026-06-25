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
