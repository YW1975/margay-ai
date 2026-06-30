# 首次配置 (setup)

> 录入本客户的 owner + 飞书连接,让诸葛喵读写你的真实行动项表。

## 命令
```bash
python3 cos_cli.py configure \
  --root <配置根目录> \
  --owner-id <ou_xxx 老板 open_id> \
  --base-token <飞书 Base app token> \
  --table-id <tbl_xxx 行动项表> \
  --chat-id <oc_xxx 飞书群>
```
写 `<根>/client.json`(权限 0600);**token 落地不打印明文,回显脱敏(如 `app***`)**。

## 安全
- 凭据写**隔离配置根**,不入产品仓。
- 连通性校验**默认 dry-run**:不注入 checker 时不发网络,只做结构校验。

## 关键约束(写表权限)
> ⚠️ 写飞书行动项表必须用 **bot 身份**(`lark-cli --as bot`);**user 身份写会 91403 无权限**。读可用 user 或 bot。

## 配完验证
```bash
python3 cos_cli.py status --json    # 看 lark-cli 可达 + core 可导入
python3 cos_cli.py patrol --config <你的 tracker 配置>   # 读真表跑一次巡检
```

## 行动项表字段(参考真实 schema)
`事项 / 负责人 / 截止 / 状态 / 会议 / 会议日期 / 客户或项目 / 类型 / 可委派度 / 备注 / 来源时间戳`
