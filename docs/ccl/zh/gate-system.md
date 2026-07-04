# Gate System

> 此页面来自 CCL 文档清单。若恢复生成流程，请先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 目的

Gate system 把声明变成可运行检查。Gate 不只是命令；它还包括要证明的 claim、预期 pass criteria 和结果记录。在 RLL 中，gate 用于保持计划诚实，防止任务在缺证据或证据不相关时进入 consensus。

对于公共文档，gate 必须直接证明文档质量。运行时单元测试通过，并不能证明公开页面准确、安全、已翻译、链接完整或渲染正确。

<!-- section: capabilities -->
## 能力

- 为一个 slice 定义 required verification row。
- 给每一行关联 unit、smoke、functional、integration、e2e、security 等 tier。
- 在配置时运行提交后或 consensus 后 cascade。
- 保存 pass/fail 输出，让 Lisa 不必只相信文字说明。
- 当历史事故报告包含旧 token、IP 或 endpoint 名称时，把 archive scan 和 current official-source scan 分开。

<!-- section: operational-model -->
## 运行模型

强 gate row 有五个属性：

| 属性 | 强例子 | 弱例子 |
|------|--------|--------|
| Scope | 扫描当前 public docs source 和 generated site。 | 扫描整个 `docs`，但其中包含 archive report。 |
| Oracle | real-looking key 命中数必须为 0。 | 运行 grep 并粘贴输出。 |
| Relevance | 文档变更跑 site build 和 link check。 | prose-only 修改只跑无关 unit test。 |
| Reproducibility | 命令、cwd、期望 exit code 都明确。 | 只有“本地通过”。 |
| Evidence | 有 log path 或捕获输出。 | 没有可复查证据。 |

Gate 失败时应回到最小责任修复。如果命令错了，修命令或 scope；如果内容错了，修内容。不要通过削弱 oracle 掩盖真实失败。

<!-- section: configuration -->
## 配置和命令

重要输入：

| Artifact | 作用 |
|----------|------|
| `gate-manifest.json` | 声明 canonical tiers 和项目 baseline。 |
| `.rll/PLAN.md` | 人类可读的 plan row 和 acceptance case。 |
| `.dual-agent/auto-tdd-plan-<step>.json` | cascade automation 使用的机器可读 row。 |
| `.dual-agent/gate-results.md` | gate 输出和 cascade 状态。 |
| `.dual-agent/harness-results/` | 更长的日志和证据文件。 |

文档发布建议使用 `node scripts/check-docs.mjs`、public-content audit、static site build、generated-page existence、source-evidence validation，以及针对 current source tree 的安全扫描。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.rll/PLAN.md`
- `.dual-agent/gate-results.md`

<!-- section: related -->
## 相关页面

- [Gates and Attestation](gates-attestation.md#gates)
- [Attestation](attestation.md)
- [Public Documentation Publishing](public-docs.md)
