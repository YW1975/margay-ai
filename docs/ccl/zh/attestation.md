# Attestation

> 此页面来自 CCL 文档清单。若恢复生成流程，请先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 目的

Attestation 是把提交工作和可验证结果连接起来的证据格式。它回答三个问题：遵循了什么过程、触及了哪些验收用例、哪个命令输出证明结果。没有 attestation，review 就会变成信任声明，而不是可审计的交付检查点。

在向 Lisa 提交工作、修复失败、或发布依赖 build、scan、rendered output、外部目标时，都应使用 attestation。

<!-- section: capabilities -->
## 能力

- 标识产出变更的过程。
- 命名本次提交覆盖的 acceptance case 或 test row。
- 记录 pass/fail 数量和产生结果的确切命令。
- 指向持久日志文件，而不是只复制摘要。
- 在检查被有意跳过或缩小时记录剩余风险。

<!-- section: operational-model -->
## 运行模型

RLL code 或 fix 提交至少包含这些行：

```text
Test-Process: <summary> | Test-Process-File: <path> | Test-Process: git-diff <range>
Test-Cases: C1, C3
Test-Results: cmd="<command>" passed=N failed=0 total=M | Test-Results-File: <path>
```

文档任务也遵循同样思想，即使命令不是单元测试。有效的 docs attestation 可以引用 site build、link check、content safety scan、rendered-page inspection、source-evidence diff、translation parity check 或 live publication fetch。

如果跳过某项检查，提交必须说明为什么跳过合理，以及用什么证据覆盖风险。“需要 e2e”不能作为跳过可 mock 或可静态验证声明的理由。

<!-- section: configuration -->
## 配置和命令

推荐证据位置：

| 位置 | 用途 |
|------|------|
| `.dual-agent/harness-results/<name>.md` | 人类可读命令输出和 review 证据。 |
| `.dual-agent/test-reports/` | 结构化或生成的测试报告。 |
| `.dual-agent/visual-evidence/` | UI 或 rendered-page 声明的截图。 |
| `.dual-agent/gate-results.md` | Cascade 和 gate summary。 |
| `.dual-agent/submit.md` | 实际提交内容或 consensus 文本。 |

公共文档同时关心 source tree 和 rendered tree 时，两者都应进入证据。只扫 Markdown 不能证明生成页面存在；只查生成页面也不能证明 source claim 准确。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.dual-agent`
- `.dual-agent/harness-results`

<!-- section: related -->
## 相关页面

- [Gates and Attestation](gates-attestation.md#attestation)
- [Gate System](gate-system.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
