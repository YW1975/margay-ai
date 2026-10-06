# 08 命令速查

> 日常**不用记这些命令**，直接对 Staff 说话即可。本页给装机、排错或开发看。
> `cos` 指 Staff 主技能目录里的入口（CLI 版：`~/.ccl/skills/margay-chief/cos`；桌面版：`~/.margay/config/skills/margay-chief/cos`）。

## 报到与配置

| 命令 | 作用 |
|---|---|
| `cos onboard --conversational` | 报到上岗：逐步给出下一句该问 / 该说的话 |
| `cos configure --morning-brief-time HH:MM` | 每天几点发早报 |
| `cos configure --evening-summary-time HH:MM` | 每天几点发下班总结 |
| `cos configure --morning-brief-platform weixin\|feishu\|wecom` | 早报 / 总结 / 提醒发到哪个 IM（缺省最近配对的私聊） |
| `cos configure --chase on\|off` | 后台是否生成催办（关掉后提醒、早报照常） |
| `cos configure --feishu-inbound on\|off` | 是否接收飞书消息 |
| `cos staff-home set <目录>` / `show` | 上班目录：在这里开会话自动接 IM |

## IM

| 命令 | 作用 |
|---|---|
| `cos attach register` | 接上已配对的 IM（没配对过会给 6 位配对码） |
| `cos attach pair [--chat-type group]` | 再配对一个私聊 / 挂一个群 |
| `cos attach wait` / `reply` | 等消息 / 回消息（Staff 自己用） |
| `cos attach ask-owner --text …` | 群里的请求需要授权时私聊问老板 |
| `cos attach status` / `detach` / `forget` | 看状态 / 断开 / 忘掉配对 |

## 节奏

| 命令 | 作用 |
|---|---|
| `cos brief morning [--send] [--shown]` | 预览 / 立即发早报；`--shown` 记「已给老板看过」当天不再推 |
| `cos brief evening [--send]` | 预览 / 立即发下班总结 |
| `cos remind add --text … --at HH:MM\|"YYYY-MM-DD HH:MM" \| --in-min N [--every day\|week]` | 到点提醒 / 重复提醒 |
| `cos remind list` / `cancel --id …` | 看 / 取消提醒 |
| `cos risk list` | 当前风险（只看不发） |

## 日程与同步

| 命令 | 作用 |
|---|---|
| `cos calendar add --title … --at … --minutes N\|--end …\|--all-day [--location …] [--remind N]` | 记日程（缺时长会拒绝） |
| `cos calendar list --day today\|tomorrow\|YYYY-MM-DD \| --week` | 看日程 |
| `cos calendar find --text …` / `move --id … --at …` / `update` / `cancel --id …` | 找 / 改时间 / 改 / 取消 |
| `cos calendar connect --name … --kind code --connector feishu [--calendar <id>] [--read-only]` | 接飞书日历，后台自动同步 |
| `cos calendar connect --name … --kind agent` | 接宿主能力同步的日历（会话里同步） |
| `cos calendar sync-in --file …` / `sync-out` / `sync-ack --file …` | agent 连接器三步同步 |
| `cos calendar sync` / `connections` / `disconnect --name …` | 手动同步一轮 / 看连接 / 停 |

## 委派

| 命令 | 作用 |
|---|---|
| `cos delegate options` | 机器上在用的助手清单 |
| `cos delegate add --to <id> --what … [--by YYYY-MM-DD] --approved` | 交出去（不带 `--approved` 只返回该问老板的话） |
| `cos delegate list` / `done --id … --result …` / `cancel --id …` | 看 / 销账 / 取消 |

## 嘱咐、盘点与求助

| 命令 | 作用 |
|---|---|
| `cos expect "<原话>"` / `expect list` / `pause\|cancel\|resume --id …` | 长期嘱咐 |
| `cos capabilities --readiness` | 如实盘点：每项能力现在能不能用、差哪一步 |
| `cos help-request add --need … --tried … --blocker … --who owner\|dev` / `list` / `close` | 求助单 |
| `cos self-change log --what … --why … --path …` / `list` | 自我升级留痕（受管路径会被拒） |

## 后台程序与安全

| 命令 | 作用 |
|---|---|
| `cos daemon install` | 安装 / 重装后台程序（会把终端里找得到的命令路径写进去） |
| `cos daemon status` / `report` | 是否在跑 / 最近各轮做了什么、有什么告警 |
| `cos integrity check` | 对照安装指纹，看 Staff 程序有没有被改 |
| `cos approvals list` / `approve --req-id … --real` / `reject --req-id …` | 待批 |
| `cos audit` | 带校验链的行动审计日志：对外发了什么、谁批的；被改动能查出来 |
