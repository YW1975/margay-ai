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

<!-- section: operational-model -->
## 运行模型

- 文档工作中的门禁应证明发布安全、语言一致、链接完整、翻译质量和源码准确性，而不是机械模仿单元测试 TDD。

<!-- section: configuration -->
## 配置与命令

- 在 RLL 提交中使用 attest 行，并在适合时把日志保存在 `.dual-agent/harness-results`。

## 门禁

<a id="gates"></a>

门禁是与具体声明绑定的可运行检查。对公开文档，有价值的门禁包括生成文档一致性、链接完整性、源码证据存在性、禁用品牌扫描、私有路径/密钥扫描、站点构建，以及部署后的 live URL 抓取。如果一个通过的命令没有覆盖所声明的要求，它就是弱证据。

## 证明记录

<a id="attestation"></a>

证明记录说明过程证据：运行了什么命令、覆盖什么范围、是否通过、日志保存在哪里，以及它证明哪个验收 case。在 RLL 提交中，必需的 `Test-Process`、`Test-Cases` 和 `Test-Results` 行用于让证据可复核、可证伪。

## 复杂度门禁

<a id="complexity-gates"></a>

复杂度门禁应随风险扩展。文档-only slice 不应假装无关单元测试能证明内容质量，但必须运行文档专用检查。涉及代码的 slice 应包含项目 manifest 和计划中对应的 unit、integration、smoke、security 或 e2e 层级。

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
