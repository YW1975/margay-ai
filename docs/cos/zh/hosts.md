# 宿主集成

诸葛喵通过一组 `cos-` 前缀薄技能集成进各 coding agent,每个技能指向同一个 `cos_cli.py`。一次 `cos_install.py` 装全部检测到的宿主。

## 支持的宿主 + 安装位置
| 宿主 | 技能目录(约定) | 备注 |
|---|---|---|
| **claude-code** | `~/.claude/skills/` | home 全局,跨 workspace |
| **margay** | `~/.margay-config/skills/`(margay-managed,带 `.margay-skill.json`) | margay 自动分发到各会话引擎 |
| **codex** | `<workspace>/.agents/skills/` | 工作区本地 |
| **ccl** | `<workspace>/.ccl/skills/` | 项目本地 |

## cos- 技能集
| 技能 | 触发 | 调 |
|---|---|---|
| `cos-patrol` | 巡检/催办/谁该催/盯落实/Top优先级 | `cos_cli patrol` |
| `cos-gate` | 这条能发吗/审外发/owner-only 判定 | `cos_cli gate` |
| `cos-setup` | 初始化/配飞书连接/录 owner | `cos_cli configure` |

## 安装机制
- `adapters/cos_skills.py` —— host-aware 装-set:每技能写 `SKILL.md`(声明 `margay.tools` 为现有工具)+ `junshi-plugin.json`(pointer 指向 cos_cli)+ `.cos-managed`(provenance marker)。
- **Provenance 守卫**:绝不覆盖/删除非 `.cos-managed` 的同名目录(保护你手装的同名技能)。
- `cos_install.py` —— 检测宿主(复用 quickstart 检测)→ 逐个 install+verify → 中文汇报;非法 `--host` 报错列支持宿主。

## 真机验证状态(2026-06-30)
4 个宿主均**真装 + native E2E 验证**(真 agent 原生发现 → 调用 → cos_cli 真跑 → 正确输出,非空过):
- **claude-code** ✅ / **ccl** ✅(真模型调用)/ **codex** ✅(读 SKILL.md→pointer→cos_cli)/ **margay** ✅(UI 设置→技能可见;Claude Code 引擎会话真跑 cos-patrol)

## margay 数字员工
在 margay 里可把 cos- 技能集组装成一个 **Employee「诸葛喵·军师」**:人设(dual-loop 纪律)+ enabledSkills=[cos-patrol/gate/setup] + Claude Code 引擎 + (可选)定时巡检。详见 [数字员工](digital-employee.md)。
