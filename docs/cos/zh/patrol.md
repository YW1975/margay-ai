# 巡检与催办 (patrol)

> 诸葛喵的核心动作:读行动项 → 算谁该催 → 起草催办 → 分三类给老板。默认 dry-run,不外发。

## 跑一次
```bash
python3 cos_cli.py patrol --local items.json     # 本地行动项
python3 cos_cli.py patrol --config tracker.json  # 经 lark-cli 读真实飞书表
```

## 它怎么判"该催"
基于每条行动项的推进态(drive_state),只收 **该催** 的:
- `overdue` 逾期 / `due-soon` 临期 / `stalled` 停滞 / `blocked` 阻塞
- **不催**:`on-track` 正常推进 / `dead` 已死 / `needs-triage` 待分类(不该机器催)

## 三类输出
| 类别 | 含义 | 处理 |
|---|---|---|
| **该催的** (queued) | 逾期/停滞/阻塞 | 起草催办语(带升级级别 L1-L4) |
| **找你定的** (needs_approval) | L4 / owner-only / 高风险 | **待老板拍板,绝不自动发** |
| **只报告的** | 正常项 | 不打扰 |

## 催办语(escalation level)
- **L1 提醒** —— 温和提醒 + 要新期限
- **L2 求助/协调** —— 问卡在哪、帮协调
- **L3 升级** / **L4 待老板拍板**

示例(dry-run 草稿,未发):
> 【求助 L2】张三,「支付接口联调」… 现在卡在哪一步?有阻塞告诉我帮你协调。能给个新的完成时间吗?

## 输出
```json
{"ok":true,"items":N,"queued":["M1","M2"],"needs_approval":["M2"],"dry_run":true,"out_dir":"..."}
```
草稿落 `out_dir`,**全程不外发**;老板拍板后才经治理门发飞书。
