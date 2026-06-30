# cos-cli ↔ lark-cli 边界

> 一条规则:**cos 永不直接说飞书协议;所有飞书 IO 委派 lark-cli。lark-cli 里零诸葛喵逻辑。** 治理门夹在两者之间。

## 分工
| | **lark-cli(飞书 CLI)** | **cos-cli(诸葛喵)** |
|---|---|---|
| 角色 | 传输/IO,领域无关 | 大脑/领域,飞书无关 |
| 管什么 | 发消息、读写 Base、IM、event consume —— 通用飞书客户端 | 算该催谁/起草/治理/优先级 —— 经营管理判断 |
| 网络 | 真发网络 | 默认 dry-run,不发;治理放行后才让 lark-cli 发 |

## LarkRunner(可注入边界)
cos 通过单一 `LarkRunner` 做所有飞书读写:
- **命令面收窄**:只用 `lark-cli base +record-list`(读)、`im +messages-send`(发),易维护、易换传输。
- **绝对路径解析**:launchd/cron/宿主最小 PATH(`/usr/bin:/bin`)找不到 `/opt/homebrew/bin/lark-cli`,故 `resolveLark()` 解析绝对路径(LARK_CLI env / which / 候选)。
- **可 mock**:测试注入 fake runner,`patrol`/`gate` 不碰真 lark-cli 也能验决策。

## 纪律
凡是诸葛喵的**领域动作**(催办/巡检/盯落实)必须走 cos(才过治理门);只有用户明确"就帮我发条消息"这种**裸传输**才直接 lark-cli。别让宿主 agent 绕过 cos 直接 lark-cli 发催办 —— 那会架空治理。

## 好处
- **厂商中立**:换传输(钉钉/企微)只换"手",大脑不动。
- **可测**:大脑与传输解耦。
- **治理清晰**:所有外发收口到一个边界 + 一道门。
