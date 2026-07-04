# 公开文档发布

> 本页作为公开文档源维护。它定义 CCL 公开文档在发布前如何准备、检查、构建和审阅。

<!-- section: purpose -->
## Purpose

CCL 文档站是官方公开事实源。因此发布必须证明三件事：源 Markdown 准确且语言完整，公开仓库不含私有或敏感材料，生成后的站点保留预期导航和内容。

<!-- section: capabilities -->
## Capabilities

- 在 `docs/ccl/<lang>/` 下维护英文、中文和日文 Markdown 页面。
- 执行语言一致性、inventory coverage、section-marker parity、内部链接有效性、过期版本检查、禁用品牌检查和翻译质量 sanity check。
- 阻止公开泄漏，例如本地私有路径、疑似 secret tokens、source maps、环境文件和私钥材料。
- 从 Markdown 源构建 `site/` 静态站点，不要求运行时服务器。
- 使用 CCL 仓库中的权威覆盖矩阵验证 CCL feature coverage。
- 为 Lisa 或人工 reviewer 记录源码证据、命令输出、渲染站点检查和审阅交接说明。

<!-- section: operational-model -->
## Operational model

公开文档不是私有仓库镜像。每个页面都必须有意安全公开、可追溯源码，并面向公开用户编写。如果某个 claim 需要私有实现细节来支撑，只能引用仓库相对源码路径，并用公开术语描述行为。

验证分为两层。公开文档仓库验证 Markdown parity、公开安全规则和静态站点生成。CCL 仓库验证官方文档仍覆盖 feature inventory 和 agent-instruction scope。权威更新需要两层都通过。

Producer evidence 不是最终 verdict。Reviewer 应独立检查代表性页面行、重跑机械检查、验证生成的 HTML，并确保 claims 与源码文件一致，而不是只依赖提交者总结。

<!-- section: configuration -->
## Configuration and commands

公开文档改动的必跑本地检查：

| 检查 | 命令 | 证明内容 |
| --- | --- | --- |
| Markdown 和 locale parity | `node scripts/check-docs.mjs` | 所有语言有相同文件，inventory pages 存在，section markers 对齐，链接可解析，公开文本避开已知禁用模式。 |
| 公开内容审计 | `bash scripts/audit-public-content.sh` | 仓库输出不含 `.DS_Store`、source maps、env files、key files、明显 token patterns 或私有本地项目路径。 |
| 静态站点构建 | `node scripts/build-site.mjs` | Markdown 可以渲染到公开 `site/` tree。 |
| 覆盖结构 | `node scripts/check-official-docs-coverage.mjs --check=structure` | 覆盖矩阵 schema 和结构仍有效。 |
| 覆盖 inventory | `node scripts/check-official-docs-coverage.mjs --check=inventory` | 公开 docs inventory 与 CCL coverage matrix 保持对齐。 |
| Agent scope | `node scripts/check-official-docs-coverage.mjs --check=agent-scope` | Agent instruction scope 仍被官方文档决策覆盖。 |

发布到 GitHub Pages 时，除本地 build 外还必须验证 hosted URL。Hosted verification 应检查公开 URL、语言导航、代表性渲染页面，以及不存在私有路径或生成 artifact。

<!-- section: source-evidence -->
## Source evidence

- `scripts/check-docs.mjs` 检查语言目录、inventory 对齐、section-marker parity、内部链接、禁用品牌、私有路径、疑似 secret tokens、过期版本引用、翻译占位符和本地化 prose sanity。
- `scripts/audit-public-content.sh` 扫描发布仓库中的 macOS metadata、source maps、env files、key material、明显 token formats 和私有本地项目路径。
- `scripts/build-site.mjs` 将 Markdown 页面渲染到静态 `site/` 输出，改写 Markdown links 为 HTML links，并构建每种语言的导航。
- `docs/ccl/docs-inventory.json` 定义公开页面 inventory、navigation targets 和 feature-module mapping。
- CCL 仓库中的 `docs/official-docs-coverage-matrix.json` 与 `scripts/check-official-docs-coverage.mjs` 定义并验证权威 feature coverage matrix。

<!-- section: related -->
## Related pages

- [GitHub 与 CI 工作流](github-ci.md)
- [权限与安全](permissions-security.md)
- [门禁与 Attestation](gates-attestation.md)
- [故障排查](troubleshooting.md)
- [CCL 概览](overview.md)
