# 环境变量

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 会读取 CCL 前缀环境变量，用于模型选择、日志、权限、网关设置、自定义 header 和兼容行为。路由凭据使用 CCL 专用名称，不会被盲目复制到 provider SDK 变量中。

<!-- section: capabilities -->
## 能力范围

- 使用 `CCL_MODEL` 和模型默认值变量为兼容部署选择主模型或快速模型。
- 使用 `CCL_GATEWAY_URL` 和 `CCL_GATEWAY_KEY` 进行 Margay 网关路由；设置后它们优先于 `~/.ccl/gateway.json`。
- 使用 `CCL_LOG`、`CCL_BETAS`、`CCL_CUSTOM_HEADERS` 和 `CCL_PERMISSIONS_TEMPLATE` 配置诊断、beta 标记、header 和权限默认值。

<!-- section: operational-model -->
## 运行模型

- `bootstrap/envSync.ts` 只在兼容变量尚未设置时，将部分非路由 `CCL_*` 变量映射到兼容变量。它明确排除 `CCL_BASE_URL` 和 `CCL_API_KEY`，避免意外改变 provider 路由。
- `bootstrap/gatewayConfig.ts` 只会在 `CCL_GATEWAY_URL` 和 `CCL_GATEWAY_KEY` 都不存在时加载 `~/.ccl/gateway.json`。只要任一 shell 变量存在，shell 环境就作为原子配置对优先生效。

<!-- section: configuration -->
## 配置与命令

- `/gateway login`、`/gateway register` 和 `/gateway logout` 会写入或清理 `CCL_GATEWAY_URL` 与 `CCL_GATEWAY_KEY`。
- 本页中的 `ANTHROPIC_*` 等兼容字面量只作为底层 SDK 兼容层所需的环境变量名称出现，不作为厂商品牌文案。
- 本页暂不记录 provider cache 命中率；cache-read/cache-write 指标需等待网关暴露可验证 usage 字段后再补充。

## 在哪里设置变量

| 环境 | 示例 | 何时使用 |
| --- | --- | --- |
| POSIX shell | `export CCL_GATEWAY_URL=https://gateway.example.com` | 需要当前 shell 和子进程都获得该值时。 |
| 单次命令 | `CCL_LOG=debug ccl doctor` | 需要临时诊断 override 时。 |
| 本地 gateway 文件 | `~/.ccl/gateway.json` | 已通过 `/gateway login` 保存持久本地 gateway 凭据时。 |
| 托管设置 | organization-managed settings | 团队需要由 policy 控制的默认值时。 |

## 优先级与路由安全

`CCL_GATEWAY_URL` 与 `CCL_GATEWAY_KEY` 是原子配置对。只要 shell 环境里出现其中任意一个，CCL 就不会加载 `~/.ccl/gateway.json`；shell 环境优先。这避免了环境 URL 和过期文件 key 混用。

`bootstrap/envSync.ts` 只会把选定的非路由 `CCL_*` 变量同步到兼容 SDK 变量。它不会把 `CCL_BASE_URL` 或 `CCL_API_KEY` 同步到 provider routing 变量。

## 常用变量

| 变量 | 用途 | 说明 |
| --- | --- | --- |
| `CCL_GATEWAY_URL` | 网关 base URL | 与 `CCL_GATEWAY_KEY` 配合使用；shell 值会阻止 gateway 文件加载。 |
| `CCL_GATEWAY_KEY` | 网关 API key | 与 `CCL_GATEWAY_URL` 配合使用；不要写入公开文档或 commit。 |
| `CCL_MODEL` | 模型选择 | 仅当兼容目标变量未设置时，才同步到兼容模型变量。 |
| `CCL_SMALL_FAST_MODEL` | 小快模型选择 | 适合区分大任务和低成本任务的部署。 |
| `CCL_LOG` | 日志详细度 | 诊断时优先使用命令级临时 override。 |
| `CCL_CUSTOM_HEADERS` | 额外请求 header | 如果包含认证或路由元数据，应视为敏感。 |
| `CCL_PERMISSIONS_TEMPLATE` | 权限默认值 | 会影响工具提示行为，需谨慎使用。 |

## 环境变量故障排查

如果 `/gateway doctor` 显示文件和 shell 不一致，先决定哪个来源应该生效，再清理另一个来源。如果 provider SDK 似乎使用了意外 base URL，检查 CCL 外部是否设置了兼容变量。如果变量看似被忽略，确认它是否只在进程启动时读取，并重启 shell 或会话。

<!-- section: source-evidence -->
## 源码依据

- `bootstrap/envSync.ts`
- `bootstrap/gatewayConfig.ts`
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
