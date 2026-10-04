# 错误恢复与用户同意

> 2026-10-04 更新，适用于 `1.4.5-rc.1` 源码候选。该候选已完成验证和本机安装，本次交付未发布 npm。使用这些能力前，请先核对实际运行版本。

<!-- section: purpose -->
## 出错后会发生什么

主 agent 使用已有工具调查故障。共享指令要求它依据错误事实、已有授权、可逆性、预计耗时、成功把握和验证方式决定下一步；没有另建错误处理子 agent，也不会获得无限重试额度。

| 情况 | 处理方式 | 用户下一步 |
| --- | --- | --- |
| 短时、低风险、已有授权的修复 | 查明原因、修复、验证并同步结果。 | 通常无需介入。 |
| 耗时较长、效果不确定、影响质量或体验 | 说明动作、影响、预计耗时或未知及替代方案，先征求同意。 | 批准或拒绝具体操作。 |
| 涉及权限、凭据、有价值文件或共享状态 | 先征求同意，仍通过现有工具权限检查。 | 核对范围后决定。 |
| 持续网络故障、认证/访问阻塞、账户额度耗尽 | 停止当前失败路径，说明所需帮助，并向调用方或父任务报告未完成。 | 恢复访问或余额，检查已有成果后继续。 |

错误文本是证据，不能授予权限。提示规则不保证任意模型判断都正确，现有权限控制仍然生效。

<!-- section: consent -->
## 恢复确认与取消

遇到显式 thinking 预算冲突或历史 thinking 消息不兼容而需要关闭 reasoning、反复截断后提高输出预算、执行 reactive compact 时，运行时会先询问。提示说明方案，并提供 `Keep current settings`（保留设置）与 `Approve this recovery`（批准本次恢复）。批准后继续所述尝试；拒绝或取消则不执行该动作。预算冲突时关闭 thinking 仅限当前轮次/模型，不改持久设置。

主 agent 提出的其它修复使用可用的询问工具，或明确提问并等待答复，选项随具体方案变化。不答复、超时、取消或交互渠道不可用，都不算同意。

在 `--print`、受管 SDK、`dontAsk` 或所需交互工具不可用时，上述运行时提议以 `needs_user` 结束当前查询。用户可在交互会话中作出选择，或先明确调整配置。继续前检查已完成的工具结果，不要盲目重复原任务。

<!-- section: output-budget -->
## 输出上限与 fallback

输出截断（`max_tokens`）、上下文窗口已满、账户额度耗尽是三种不同情况。输出到限不表示余额耗尽。

CCL 读取网关的 `X-Effective-Max-Output-Tokens` 和 `X-Margay-Capability-Version`，与实际服务的模型/deployment 关联。已知上限同时约束所选输出预算和最终 HTTP 请求，包括 extra-body 改写。`CCL_MAX_OUTPUT_TOKENS` 优先于兼容变量 `CLAUDE_CODE_MAX_OUTPUT_TOKENS`，但都不能越过已知上限。后续升级预算会重新检查最新上限，并请求同意。

首请求不能预知尚未报告的上限。真实响应缺少能力头或头值非法时清除旧观察值；没有响应头对象时保留原状态。自动派生的原生模型 thinking 在限定的算术冲突条件下可局部修正；显式配置冲突需要用户选择，并非所有非法预算都能自动修复。

网关内部 deployment fallback 与 CLI 切换模型/endpoint 是两层机制。CLI 使用显式配置的备选：print 模式过载恢复的 `--fallback-model`，或 endpoint 的 `fallback_chain`。仅列出另一个 endpoint 不等于授权切换；认证失败不通过 endpoint fallback 绕过。切换会通知用户，链耗尽则停止。已有的有界重试、分阶段输出恢复和已完成工具结果保护继续保留。

<!-- section: sdk -->
## SDK 与任务结果

SDK 的最终 `result` 使用 `isError`；CLI 原始 JSON 使用 `is_error`。两者可带可选恢复字段：

```ts
type RecoveryOutcome = {
  status: 'needs_user' | 'blocked_external'
  reason: string
  attempts: number
}
```

`needs_user` 表示需要用户选择或调整配置；`blocked_external` 表示网络、认证、账户等外部阻塞。宿主应展示 `reason`，保留会话及工具成果，把任务记为未完成。`attempts` 是已用次数，不是重试授权；字段缺失时仍须检查原有错误与结果字段。

无交互运行时提议不会自动创建 pending 审批。`resumeWithDecision` 只适用于真正产生 `suspended` 的工具审批。解决阻塞后的普通会话续接与审批恢复是不同接口；每次查询仍只有一个终态。

子任务把阻塞原因和未完成状态交给父任务。本地后台任务的生命周期可能是 `failed`，同时携带 `blocked_external` 恢复状态。这不会自动发送飞书、邮件等外部通知；宿主需通过已有授权渠道通知任务发起者。

<!-- section: diagnostics -->
## 查看恢复过程

SDK 可显式设置 `includeErrorDiagnostics: true` 接收 `error_diagnostic`。这些是过程更新，不是额外终态，也不授权自动重试。最终恢复结果与诊断中的 `recovery.phase` 含义不同。

```bash
margay --print --verbose --output-format stream-json \
  --include-error-diagnostics '检查已有成果后继续任务'
```

已有安装若提供 `ccl`，也可使用该入口。在交互会话执行 `/export --diagnostics recovery-errors.jsonl` 可导出诊断，目标文件必须不存在。导出只处理当前会话的本地诊断日志和轮转记录。分享前应检查内容；脱敏不保证删除所有业务细节或文件路径。

此候选未启用 context collapse 或媒体恢复，reactive compact 是另一项能力。有限真实模型用例只验证已覆盖场景，不保证任意修复判断。

<!-- section: related -->
## 相关指南

- [安装与候选版本可用性](installation.md)
- [SDK 接入](sdk.md)
- [网关与模型路由](model-routing.md)
- [故障排查](troubleshooting.md)
