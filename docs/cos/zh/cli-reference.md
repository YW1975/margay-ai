# cos-cli 命令参考

`cos_cli.py` 是诸葛喵的**决策大脑 CLI**。它不直接说飞书协议 —— 所有飞书 IO 委派 `lark-cli`(见 [边界](lark-boundary.md));复用能力核 `core/` + 治理 `governance/`,零逻辑重写。

```
python3 cos_cli.py <patrol|gate|status|configure|daemon> [flags]
```

## patrol —— 巡检/催办
读行动项 → 算 chase queue(该催:逾期/停滞/阻塞/临期)→ 起草催办(dry-run,不外发)。
```
python3 cos_cli.py patrol [--local items.json] [--config cfg.json] [--out DIR] [--now MS]
```
- `--local` 本地行动项 json;`--config` 飞书 tracker_base 配置(经 lark-cli 读真表)
- 输出 JSON:`queued`(该催)/ `needs_approval`(L4/owner-only,待老板拍板,不自动发)/ `dry_run` / `out_dir`(草稿目录)

## gate —— 治理门
对一条拟外发的消息/动作过 dual-loop 治理(approve / 需 owner 批 / 拒绝)。
```
python3 cos_cli.py gate --text "<拟外发文本>" --target "<对象>" --level <1-4>
```
- 输出:`verdict`(APPROVE / NEEDS_APPROVAL / REJECT)、`dry_run`、`executed`
- L4 / owner-only / 高风险 → NEEDS_APPROVAL,绝不自动发

## status —— 自检
```
python3 cos_cli.py status [--json]
```
版本 + core 可导入 + lark-cli 可达性。

## configure —— 首次配置
透传给 `core.configure`,写隔离配置根的 client.json(token 落地 0600、回显脱敏)。
```
python3 cos_cli.py configure --root <根> --owner-id <ou_xxx> --base-token <token> --chat-id <oc_xxx> [--table-id <tbl_xxx>]
```

## daemon —— 编排(只编排)
```
python3 cos_cli.py daemon <start|stop|status> <listener|meeting>
```
**只负责编排**长驻进程(飞书监听 / 会议 ASR),绝不把长驻逻辑内联进同步命令。

---

## Lark 边界(LarkRunner)
所有飞书读写经可注入的 `LarkRunner`,绝对路径解析 lark-cli(launchd/cron/宿主最小 PATH 会找不到裸 `lark-cli`)。测试可注入 mock,`patrol`/`gate` 不碰真 lark-cli 即可跑。
