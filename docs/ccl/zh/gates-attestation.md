# 门禁与证明

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

门禁与证明通过把提交工作关联到测试命令、通过/失败计数、变更 case、过程证据和审阅结论，使 CCL 交付可审计。

<!-- section: capabilities -->
## 能力范围

- 记录精确测试命令和结果。
- 把代码或文档变更关联到验收 case。
- 配置后使用策略检查阻止缺失证据的提交。
- 区分架构讨论和开发启动测试门禁。
- 保留审阅证据，使后续审计可以还原 slice 为什么通过。

<!-- section: operational-model -->
## 运行模型

- 文档工作中的门禁应证明发布安全、语言一致、链接完整、翻译质量和源码准确性，而不是机械模仿单元测试 TDD。
- 涉及代码的工作中，门禁应证明行为确实变化，并且周边回归套件仍然通过。
- PASS 是审阅证据，不是绕过失败门禁的捷径。

<!-- section: configuration -->
## 配置与命令

- 在 RLL 提交中使用 attest 行，并在适合时把日志保存在 `.dual-agent/harness-results`。
- `[PLAN]` 用于架构和范围对齐。`[TDD-PLAN]` 是开发启动检查点，为复杂或专家级 code-bearing slice 锁定具体测试 case。
- `[CODE]` 和 `[FIX]` 提交必须携带 `Test-Process`、`Test-Cases` 和 `Test-Results` 行，让 Lisa 和后续审计者能把声明连接到证据。

## 门禁

<a id="gates"></a>

门禁是与具体声明绑定的可运行检查。对公开文档，有价值的门禁包括生成文档一致性、链接完整性、源码证据存在性、禁用品牌扫描、私有路径/密钥扫描、站点构建，以及部署后的 live URL 抓取。如果一个通过的命令没有覆盖所声明的要求，它就是弱证据。

## 门禁类型

| 门禁类型 | 证明什么 | 文档示例 | 代码示例 |
| --- | --- | --- | --- |
| 结构 | 必需产物存在并匹配清单。 | 每个 inventory 页面都存在于 `en`、`zh`、`ja`。 | 预期源码和测试文件存在。 |
| 安全 | 公开输出不泄漏私有或敏感数据。 | secret、私有路径和禁用品牌扫描通过。 | secret 和危险权限检查通过。 |
| 行为 | 被改变的行为确实工作。 | 渲染站点包含新页面内容和链接。 | Unit、integration、smoke 或 e2e 测试覆盖变更路径。 |
| 源码准确性 | 声明由源码或运行输出支撑。 | 页面 source-evidence 指向真实文件和已验证命令。 | 测试引用它验证的函数、CLI 路径或 API 响应。 |
| 审阅 | 第二个 agent 检查了证据。 | Lisa 引用页面行号和验证命令。 | Lisa 复跑或检查相关测试和变更文件。 |

## 证明记录

<a id="attestation"></a>

证明记录说明过程证据：运行了什么命令、覆盖什么范围、是否通过、日志保存在哪里，以及它证明哪个验收 case。在 RLL 提交中，必需的 `Test-Process`、`Test-Cases` 和 `Test-Results` 行用于让证据可复核、可证伪。

Ralph 的 `[CODE]` 和 `[FIX]` 必需证明行：

| 行 | 用途 |
| --- | --- |
| `Test-Process` | 总结改了什么，并指向过程证据文件或 diff 范围。 |
| `Test-Cases` | 列出本轮覆盖的已锁定计划行。 |
| `Test-Results` | 给出精确命令、通过/失败/总数，以及证据文件。 |

Lisa 的必需审阅证据：

| 审阅项 | 用途 |
| --- | --- |
| 文件和行号引用 | 通过把批准绑定到具体产物，避免 rubber-stamp 审阅。 |
| 测试日志或命令结果 | 表明 Lisa 检查了声明的 oracle，而不仅仅是文字说明。 |
| PASS 理由或 NEEDS_WORK 原因 | 记录技术决策理由。 |

## 复杂度门禁

<a id="complexity-gates"></a>

复杂度门禁应随风险扩展。文档-only slice 不应假装无关单元测试能证明内容质量，但必须运行文档专用检查。涉及代码的 slice 应包含项目 manifest 和计划中对应的 unit、integration、smoke、security 或 e2e 层级。

## 文档证据模式

对官方文档，最强的证据组合是：

| 证据 | 为什么重要 |
| --- | --- |
| Inventory 一致性 | 证明每个公开页面都存在于每个支持语言。 |
| Section marker 一致性 | 证明翻译保留同一结构契约。 |
| 公开内容审计 | 阻止 secret、本地路径、私有部署细节和陈旧版本声明。 |
| 站点构建 | 证明生成的静态站点可以发布。 |
| 渲染 HTML 抽查 | 证明内容经过 markdown 到站点转换后仍然存在。 |
| Source-evidence 扫描 | 证明事实声明能追溯到实现或运行输出。 |

这就是为什么文档任务不需要假的 TDD。它们仍然需要测试，但测试应验证文档真实性、安全性和可发布性。

<!-- section: source-evidence -->
## 源码依据

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent`

<!-- section: related -->
## 相关页面

- [Ralph-Lisa 循环](ralph-lisa-loop.md)
- [澄清与计划](clarify-and-planning.md)
- [GitHub 与 CI 工作流](github-ci.md)
