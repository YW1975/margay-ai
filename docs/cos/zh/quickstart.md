# 快速上手

> 目标:一条命令把诸葛喵装进你已有的 AI agent,5 分钟跑通第一次巡检。

## 前置
- 至少装好一个受支持的 coding agent:**claude-code / codex / ccl / margay**(装了几个就能接入几个)
- `python3`(macOS/Linux 自带)
- 飞书行动项表的连接(可选,首次可用本地样例)

## 一键集成
在插件目录下:
```bash
python3 cos_install.py            # 自动检测宿主 → 逐个装 cos-* 技能集 → verify → 中文汇报
python3 cos_install.py --dry-run  # 只预览要做什么
python3 cos_install.py --host ccl # 只装指定宿主(可重复)
```
成功后每个宿主会装上 `cos-patrol` / `cos-gate` / `cos-setup` 三个技能,各自指向决策核心 `cos_cli.py`。

## 第一次巡检
```bash
# 用本地样例行动项跑一次(dry-run,只起草不外发)
python3 cos_cli.py patrol --local items.json
# 输出:{"queued":[该催的],"needs_approval":[要你拍板的],"dry_run":true,"out_dir":...}
```

## 在 agent 里唤起
装好后,在你的 agent(claude-code/ccl/codex/margay)里直接说:
> 「诸葛喵,巡检一下行动项,谁该催?」 / 「现在什么最该做?」 / 「这条能发吗?」

agent 会自动加载对应 cos- 技能 → 调 `cos_cli` → 给结果。**所有对外动作默认 dry-run,需你显式同意才发。**

## 接真实飞书数据
```bash
python3 cos_cli.py configure --root <配置根> --owner-id <ou_xxx> \
  --base-token <飞书Base app token> --table-id <tbl_xxx> --chat-id <oc_xxx>
```
配完巡检即读你的真实行动项表,催办经治理门、发到你的飞书群。详见 [首次配置](setup.md)。

## 卸载
```bash
python3 adapters/cos_skills.py uninstall <host>   # 只删 cos 自己装的,绝不动你手装的同名技能
```
