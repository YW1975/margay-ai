# 架构:大脑 vs 手

> 诸葛喵的架构边界一句话:**cos = 大脑(领域判断 + 治理,默认 dry-run);lark-cli = 手/嘴(飞书读写传输)。cos 永不直接说飞书协议,所有飞书 IO 委派 lark-cli;lark-cli 里零诸葛喵逻辑。**

## 分层
```
宿主 agent (claude-code / codex / ccl / margay)
  └─ 一组 cos- 薄技能 (cos-patrol / cos-gate / cos-setup)   ← 知识+委派,内容就"调 cos_cli"
       └─ cos_cli.py  ← 诸葛喵大脑:巡检/催办/治理/配置(复用 core + governance,默认 dry-run)
            └─ lark-cli ← 手/嘴:真去飞书读行动项表 / 发消息(仅治理放行后)
                 └─ 飞书 API
```

## 各层职责
| 层 | 角色 | 管什么 |
|---|---|---|
| cos- 技能 | 薄壳 | 让宿主 agent 知道"何时调哪个 cos 子命令",无逻辑 |
| **cos_cli.py** | **大脑** | 算该催谁、起草、治理裁决 —— 领域判断,飞书无关 |
| core/ + governance/ | 能力核 | followup_drive(催办引擎)/ tracker_fetch(读项)/ dual_loop(治理)/ graph_*(图谱)|
| **lark-cli** | **传输** | 飞书读/写/发 —— 领域无关,不含诸葛喵逻辑 |

## 数据流(催办为例)
1. `cos patrol` → 经 LarkRunner 调 `lark-cli base record-list` **读**行动项表 → 映射成领域 item
2. cos 算 chase queue + 起草催办 + 判 owner-only → **dry-run 草稿**(不发)
3. 老板批准 → 过治理门 → 调 `lark-cli im messages-send` **发**
4. 全程 lark-cli 只负责读/发,judgment 全在 cos

## 为什么这样分
- **可测**:cos 大脑可注入 mock lark,不连真飞书也能验决策对不对。
- **厂商中立**:换传输(钉钉/微信)只换"手",大脑不动。
- **治理清晰**:治理门夹在"决策"与"发送"之间,老板始终在控制位。
- **跨宿主**:同一 cos_cli,各宿主只是薄技能壳不同。
