# 环境变量

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 会读取 CCL 前缀环境变量，用于模型选择、日志、权限、网关设置、自定义 header 和兼容行为。路由凭据使用 CCL 专用名称，不会被盲目复制到 provider SDK 变量中。

<!-- section: capabilities -->
## 能力范围

- 使用 `CCL_MODEL` 和模型默认值变量为兼容部署选择主模型或快速模型。
- Margay 网关路由需配置 `CCL_GATEWAY_URL`、`CCL_GATEWAY_KEY`、`CCL_GATEWAY_CREDENTIAL_TYPE` 和 `CCL_GATEWAY_ISSUER` 四字段，优先使用 `/gateway login` 或 `/gateway register`。仅设置 URL 和 KEY 不保证覆盖已保存的网关配置，凭据必须先通过准入检查。
- 使用 `CCL_LOG`、`CCL_BETAS`、`CCL_CUSTOM_HEADERS` 和 `CCL_PERMISSIONS_TEMPLATE` 配置诊断、beta 标记、header 和权限默认值。
- 部署有意同时使用 OAuth 与网关时，可设置 `CCL_QUIET_DUAL_CHANNEL=1` 静默启动时的双通道说明；Claude 走 OAuth，第三方模型走网关。

<!-- section: operational-model -->
## 运行模型

- `bootstrap/envSync.ts` 只在兼容变量尚未设置时，将部分非路由 `CCL_*` 变量映射到兼容变量。它明确排除 `CCL_BASE_URL` 和 `CCL_API_KEY`，避免意外改变 provider 路由。
- 网关环境配置需同时提供 `CCL_GATEWAY_URL`、`CCL_GATEWAY_KEY`、`CCL_GATEWAY_CREDENTIAL_TYPE` 和 `CCL_GATEWAY_ISSUER` 四字段，issuer 必须匹配规范化网关 URL。优先用 `/gateway login` 或 `/gateway register` 创建带类型的凭据，用 `/gateway doctor` 检查隔离或不匹配状态。不能用上游供应商密钥冒充网关凭据。
- 双通道模式下，如果本地有 OAuth 或 first-party API-key auth，Claude 模型调用使用本地 Claude 认证通道；DeepSeek、Kimi 等非 Claude 模型使用配置的网关。不要把网关凭据写入 provider SDK 变量。

<!-- section: configuration -->
## 配置与命令

- 网关登录/注册会验证网关自身凭据，把带类型的状态写入 `~/.ccl/gateway.json` 并更新当前进程，不新写 shell rc 块。启动新进程前应清理或更新四个过时导出字段。兼容接纳旧 compact JWT 是迁移路径，不是省略元数据的配置建议。
- 本页中的 `ANTHROPIC_*` 等兼容字面量只作为底层 SDK 兼容层所需的环境变量名称出现，不作为厂商品牌文案。
- 本页暂不记录 provider cache 命中率；cache-read/cache-write 指标需等待网关暴露可验证 usage 字段后再补充。

## 在哪里设置变量

| 环境 | 示例 | 何时使用 |
| --- | --- | --- |
| POSIX shell | `export CCL_LOG=debug` | 需要当前 shell 和子进程都获得该值时。 |
| 单次命令 | `CCL_LOG=debug ccl doctor` | 需要临时诊断 override 时。 |
| 本地 gateway 文件 | `~/.ccl/gateway.json` | 已通过 `/gateway login` 保存持久本地 gateway 凭据时。 |
| 托管设置 | organization-managed settings | 团队需要由 policy 控制的默认值时。 |

## 优先级与路由安全

网关环境配置需同时提供 `CCL_GATEWAY_URL`、`CCL_GATEWAY_KEY`、`CCL_GATEWAY_CREDENTIAL_TYPE` 和 `CCL_GATEWAY_ISSUER` 四字段，issuer 必须匹配规范化网关 URL。优先用 `/gateway login` 或 `/gateway register` 创建带类型的凭据，用 `/gateway doctor` 检查隔离或不匹配状态。不能用上游供应商密钥冒充网关凭据。

网关登录/注册会验证网关自身凭据，把带类型的状态写入 `~/.ccl/gateway.json` 并更新当前进程，不新写 shell rc 块。启动新进程前应清理或更新四个过时导出字段。兼容接纳旧 compact JWT 是迁移路径，不是省略元数据的配置建议。

```bash
unset CCL_GATEWAY_URL CCL_GATEWAY_KEY CCL_GATEWAY_CREDENTIAL_TYPE CCL_GATEWAY_ISSUER
```

`bootstrap/envSync.ts` 只会把选定的非路由 `CCL_*` 变量同步到兼容 SDK 变量。它不会把 `CCL_BASE_URL` 或 `CCL_API_KEY` 同步到 provider routing 变量。

## 常用变量

| 变量 | 用途 | 说明 |
| --- | --- | --- |
| `CCL_GATEWAY_URL` | 网关 base URL | 配合完整四字段使用，优先交互登录。 |
| `CCL_GATEWAY_KEY` | 网关自身凭据 | 不可公开，也不能使用上游供应商密钥。 |
| `CCL_GATEWAY_CREDENTIAL_TYPE`, `CCL_GATEWAY_ISSUER` | 凭据准入元数据 | 类型和 issuer 需与网关配置一致。 |
| `CCL_MODEL` | 模型选择 | 仅当兼容目标变量未设置时，才同步到兼容模型变量。 |
| `CCL_SMALL_FAST_MODEL` | 小快模型选择 | 适合区分大任务和低成本任务的部署。 |
| `CCL_LOG` | 日志详细度 | 诊断时优先使用命令级临时 override。 |
| `CCL_ROUTING_PRIORITY` | 智能路由优先级 | 当网关 classifier 返回 routing table 时，可设置为 `cost` 或 `quality`。 |
| `CCL_AUTO_FALLBACK_MODEL` | auto/smart 回退模型 | 当网关 classifier 不可用且当前模型仍是 `auto` 或 `smart` 时使用。 |
| `CCL_QUIET_DUAL_CHANNEL` | 启动说明控制 | 设置为 `1` 可隐藏双通道信息提示。 |
| `CCL_CUSTOM_HEADERS` | 额外请求 header | 如果包含认证或路由元数据，应视为敏感。 |
| `CCL_PERMISSIONS_TEMPLATE` | 权限默认值 | 会影响工具提示行为，需谨慎使用。 |

## 同步与不同步规则

| CCL 变量族 | 兼容目标 | 路由风险 |
| --- | --- | --- |
| `CCL_MODEL`, `CCL_SMALL_FAST_MODEL` | 模型选择兼容变量 | 目标变量未设置时可安全同步。 |
| `CCL_LOG`, `CCL_BETAS`, `CCL_CUSTOM_HEADERS` | 诊断/header 兼容变量 | 可同步，但 header 可能包含敏感元数据。 |
| `CCL_PERMISSIONS_TEMPLATE` | 权限模板兼容变量 | 可同步，但会改变工具提示默认值。 |
| `CCL_DEFAULT_*_MODEL*`, `CCL_CUSTOM_MODEL_OPTION*` | 模型菜单自定义变量 | 用于模型展示和选择时可安全同步。 |
| `CCL_BASE_URL`, `CCL_API_KEY` | 不自动同步 | 不得复制到 provider routing 变量，否则可能劫持 Claude 通道调用或与账号认证冲突。 |
| `CCL_GATEWAY_URL`, `CCL_GATEWAY_KEY` | 不同步到 provider SDK | 网关路由保留在 CCL 命名空间或 gateway file 中。 |

## 双读变量（CCL 名优先，遗留名回退）

对一组行为开关，CCL 先读 `CCL_*` 名字，只有 `CCL_*` 未设置时才回退到遗留兼容名。新部署应设置 `CCL_*` 形式；使用遗留名的既有脚本继续有效。

| CCL 变量（设置即生效） | 遗留回退名 | 用途 |
| --- | --- | --- |
| `CCL_SIMPLE` | `CLAUDE_CODE_SIMPLE` | Bare/精简运行时模式（等效于 `--bare`）。 |
| `CCL_MAX_OUTPUT_TOKENS` | `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | 输出预算覆盖，优先读取 CCL 变量，仍受已知模型/网关上限约束；恢复时升级预算需要同意。 |
| `CCL_REMOTE_MEMORY_DIR` | `CLAUDE_CODE_REMOTE_MEMORY_DIR` | 覆盖远程/容器化运行中记忆文件的基础目录。 |
| `CCL_SKIP_PROMPT_HISTORY` | `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | 跳过把 prompt 写入命令历史（派生的验证会话用它避免污染真实历史）。 |
| `CCL_DISABLE_CLAUDE_MDS` | `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | 禁用项目/用户记忆指令文件的加载。 |

`CCL_CONFIG_DIR` 遵循同样思路，但用 OR 链：config home 依次解析 `CCL_CONFIG_DIR`、`CLAUDE_CONFIG_DIR`、home 目录默认值，第一个非空值胜出。

## 运维变量

| 变量 | 用途 |
| --- | --- |
| `CCL_PRINT_MAX_TURNS` | 未提供 `--max-turns` 时的 print mode 默认最大轮数。 |
| `CCL_ROUTING_PRIORITY` | 网关 smart-routing 偏好，通常是 `cost` 或 `quality`。 |
| `CCL_GATEWAY_MAIN_MODEL` | 网关模式且未显式指定模型时的默认主模型。 |
| `CCL_GATEWAY_SMALL_FAST_MODEL` | 网关模式下的默认 small/fast 模型。 |
| `CCL_HOOK_MAX_OUTPUT_BYTES` | 调高或调低 hook 输出截断前保留的字节数。 |
| `CCL_JSONL_HEAP_HEADROOM_MB` | 为大型结构化流覆盖 JSONL heap headroom。 |
| `CCL_AUTO_HEAPDUMP_OFF` | 关闭自动 heap dump 监控。 |
| `CCL_AUTO_HEAPDUMP_HIGH_MB`, `CCL_AUTO_HEAPDUMP_CRITICAL_MB` | 调整 high 和 critical heap dump 阈值。 |
| `CCL_CONFIG_DIR` | 将 CCL 配置与默认 config home 隔离；优先于遗留的 `CLAUDE_CONFIG_DIR`，后者优先于 home 目录默认值。 |

## 环境变量故障排查

如果 `/gateway doctor` 显示文件和 shell 不一致，先决定哪个来源应该生效，再清理另一个来源。如果 provider SDK 似乎使用了意外 base URL，检查 CCL 外部是否设置了兼容变量。如果变量看似被忽略，确认它是否只在进程启动时读取，并重启 shell 或会话。

同时使用 OAuth 和 Margay 网关时，不要把 provider SDK 的 API-key 或 base-URL 变量设置成网关值。这样可能触发 auth-conflict 告警，或让 SDK 调用走到错误 URL。网关状态应放在 `CCL_GATEWAY_*` 或 `~/.ccl/gateway.json`；`CCL_QUIET_DUAL_CHANNEL=1` 只用于静默预期的信息提示，不应拿来掩盖真实凭据冲突。

<!-- section: source-evidence -->
## 源码依据

- `bootstrap/envSync.ts`
- `bootstrap/gatewayConfig.ts`
- `utils/env.ts`（config-dir 解析链）
- `utils/envUtils.ts`、`history.ts`、`memdir/paths.ts`、`tools/AgentTool/agentMemory.ts`、`context.ts`、`query.ts`（双读调用点）
- `commands/gateway/gateway.tsx`
- `commands/gateway/gateway-helpers.ts`
- `commands/endpoint/endpoint.tsx`
- `commands/model/model.tsx`
- `package.json`

<!-- section: related -->
## 相关页面

- [配置与设置](configuration.md)
- [认证](authentication.md)
- [网关与模型路由](model-routing.md)
- [故障排查](troubleshooting.md)
