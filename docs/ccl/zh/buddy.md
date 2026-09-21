# Buddy：队友与轻量审查

<!-- section: availability -->
## 适用版本

本文对应截至 2026-09-21 已审核的本机 CCL 候选提交 `1387fdae`。npm 的 `next` 仍是 `1.4.1-beta-duo.0`；使用后续团队启动修复前，请核对实际运行的 CLI。npm 提供 `margay` 命令，本机 `ccl` 启动器可能指向另一份安装。

<!-- section: ordinary -->
## 启动队友

需要一名可见队友协助主会话时，使用普通 Buddy：

```text
/buddy 检查迁移方案是否遗漏回滚步骤
/buddy --team migration --name researcher 对比两份 API 契约
```

`--team` 默认是 `buddy-team`，`--name` 默认是 `reviewer`。不提供任务时，Buddy 会让主 Agent 接续当前对话中最需要处理的工作。名称包含 `reviewer` 或 `critic` 时，队友提示会加入审查职责。

普通 `/buddy` 会展开为提示。主 Agent 必须先调用 `TeamCreate`，适当时复用当前团队，再以 `TeamCreate` 实际返回的团队名和指定成员名调用 `Agent`。如果主 Agent 已带领另一团队，应报告冲突。仅生成提示不证明队友已启动；依赖结果前请查看 Team 和 Agent 的实际返回。

<!-- section: peer-review -->
## 发起受保护审查

开发任务需要受保护的提交和独立审查结论时，明确使用审查模式：

```text
/model
/buddy --peer-review --reviewer-model <固定模型ID> 修复解析器并补回归测试
```

先用 `/model` 选择具体开发模型，再把占位符换成可用的固定审核模型 ID。此模式不接受 `auto`、`smart`、`pool`、`inherit` 或 `default` 作为审核模型，且必须提供开发目标。还可指定 `--team <名称>` 与 `--name <审核者名>`；审核者不能叫 `team-lead`。

主 Agent 创建带受保护任务的团队并使用其任务 ID，再启动 `code-reviewer` Agent。开发者提交当前材料；审核者在提交快照中检查和测试，对该提交给出 PASS 或 NEEDS_WORK，也可附证据提出挑战。新提交必须重新审核。只有针对当前提交的审核者 PASS 才能完成受保护的 Buddy 任务；取消、暂停或达到轮数限制均保持未完成。这个旧审查路径让普通审查工具使用独立快照。[Duo](duo.md) 的完成条件不同：要观察到两个不同模型的请求、当前审核和执行者接受；当前 Duo 审核者可检查普通工作区。

<!-- section: limits -->
## 核对结果

两种 Buddy 都取决于 Team 和 Agent 工具的真实执行。请查看队友和受保护任务状态；生成的提示或模型自称成功都不等于任务完成。审查副本与工具权限不是针对同一用户恶意命令的操作系统沙箱。CCL 重启后，不保证自动恢复进行中的协作。

<!-- section: related -->
## 继续阅读

- [Duo：对等双 Agent 协作](duo.md)
- [Agents](agents.md)
- [命令](commands.md)
- [交互式会话](interactive-sessions.md)
