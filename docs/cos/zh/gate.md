# 治理门 (gate)

> 任一对外动作发出前,先过 dual-loop 治理门。这是老板敢把"对外承诺/对人催办"托付给诸葛喵的底座。

## 用法
```bash
python3 cos_cli.py gate --text "<拟外发文本>" --target "<对象>" --level <1-4>
```
输出:
```json
{"verdict":"APPROVE|NEEDS_APPROVAL|REJECT","dry_run":true,"executed":false}
```

## 裁决三态
| verdict | 触发 | 结果 |
|---|---|---|
| **APPROVE** | 低风险 + critic 通过 | 可发(仍 dry-run 默认) |
| **NEEDS_APPROVAL** | L4 / owner-only / 高风险 | **待老板拍板,绝不自动发** |
| **REJECT** | 绕过 critic / 越权 | 拒绝执行 |

## 在流程里的位置
```
决策(cos 算出要发什么) → [治理门 gate] → 发送(lark-cli)
```
治理门夹在"决策"和"发送"之间。`patrol` 的 `needs_approval` 项就是被 gate 判为待审、扣住不发的那些。

## 设计原则
- **默认拒绝**:缺批准/出错 → 不发(fail-closed)。
- **老板永远是最终决策者**:gate 只把活干到"待发",发不发由老板定。
- 与竞品"权限内自动执行"的根本区别:诸葛喵把高风险动作**显式扣下来等人**,而不是替你做了再说。
