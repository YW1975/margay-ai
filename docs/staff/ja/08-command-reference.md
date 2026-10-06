# 08 コマンド早見表

> 普段は**これらのコマンドを覚える必要はありません**。Staff にそのまま話しかければ大丈夫です。このページはセットアップ・トラブル対応・開発をする方向けです。
> `cos` は Staff のメインスキルフォルダにある入口を指します（CLI 版：`~/.ccl/skills/margay-chief/cos`、デスクトップ版：`~/.margay/config/skills/margay-chief/cos`）。

## 着任と設定

| コマンド | 役割 |
|---|---|
| `cos onboard --conversational` | 着任手続き：次に聞くこと / 言うことを一歩ずつ示す |
| `cos configure --morning-brief-time HH:MM` | 毎日何時に朝のブリーフィングを送るか |
| `cos configure --evening-summary-time HH:MM` | 毎日何時に終業サマリーを送るか |
| `cos configure --morning-brief-platform weixin\|feishu\|wecom` | 朝のブリーフィング / サマリー / リマインダーをどの IM に送るか（初期設定は最後にペアリングした個人チャット） |
| `cos configure --chase on\|off` | バックグラウンドで催促を作るかどうか（オフにしてもリマインダーや朝のブリーフィングは通常どおり） |
| `cos configure --feishu-inbound on\|off` | Feishu のメッセージを受信するかどうか |
| `cos staff-home set <目录>` / `show` | 出勤フォルダ：ここでセッションを開くと自動で IM につなぐ |

## IM

| コマンド | 役割 |
|---|---|
| `cos attach register` | ペアリング済みの IM につなぐ（未ペアリングなら 6 桁のペアリングコードを出す） |
| `cos attach pair [--chat-type group]` | 個人チャットをもうひとつペアリング / グループに参加 |
| `cos attach wait` / `reply` | メッセージを待つ / 返信する（Staff 自身が使う） |
| `cos attach ask-owner --text …` | グループでのお願いに許可が必要なとき、個人チャットでボスに確認する |
| `cos attach status` / `detach` / `forget` | 状態を見る / 切断 / ペアリングを忘れる |

## リズム

| コマンド | 役割 |
|---|---|
| `cos brief morning [--send] [--shown]` | 朝のブリーフィングをプレビュー / すぐ送る。`--shown` で「ボスに見せ済み」と記録し、その日は送らない |
| `cos brief evening [--send]` | 終業サマリーをプレビュー / すぐ送る |
| `cos remind add --text … --at HH:MM\|"YYYY-MM-DD HH:MM" \| --in-min N [--every day\|week]` | 時刻指定のリマインダー / 繰り返しリマインダー |
| `cos remind list` / `cancel --id …` | リマインダーを見る / 取り消す |
| `cos risk list` | 現在のリスク（見るだけで送らない） |

## 予定と同期

| コマンド | 役割 |
|---|---|
| `cos calendar add --title … --at … --minutes N\|--end …\|--all-day [--location …] [--remind N]` | 予定を記録（所要時間がないと拒否） |
| `cos calendar list --day today\|tomorrow\|YYYY-MM-DD \| --week` | 予定を見る |
| `cos calendar find --text …` / `move --id … --at …` / `update` / `cancel --id …` | 探す / 時間を変更 / 変更 / 取り消す |
| `cos calendar connect --name … --kind code --connector feishu [--calendar <id>] [--read-only]` | Feishu カレンダーをつなぎ、バックグラウンドで自動同期 |
| `cos calendar connect --name … --kind agent` | ホストの機能で同期するカレンダーをつなぐ（セッション内で同期） |
| `cos calendar sync-in --file …` / `sync-out` / `sync-ack --file …` | agent コネクタの 3 ステップ同期 |
| `cos calendar sync` / `connections` / `disconnect --name …` | 手動で 1 回同期 / 接続を見る / 停止 |

## 委任

| コマンド | 役割 |
|---|---|
| `cos delegate options` | このマシンで使われているアシスタントの一覧 |
| `cos delegate add --to <id> --what … [--by YYYY-MM-DD] --approved` | 任せる（`--approved` を付けないと、ボスに確認すべき文言だけを返す） |
| `cos delegate list` / `done --id … --result …` / `cancel --id …` | 見る / 消し込む / 取り消す |

## 指示・棚卸し・ヘルプ依頼

| コマンド | 役割 |
|---|---|
| `cos expect "<原话>"` / `expect list` / `pause\|cancel\|resume --id …` | 長期的な指示 |
| `cos capabilities --readiness` | ありのままの棚卸し：各機能が今使えるか、あと何が足りないか |
| `cos help-request add --need … --tried … --blocker … --who owner\|dev` / `list` / `close` | ヘルプ依頼票 |
| `cos self-change log --what … --why … --path …` / `list` | 自己アップグレードの記録（管理対象のパスは拒否される） |

## バックグラウンドプログラムと安全

| コマンド | 役割 |
|---|---|
| `cos daemon install` | バックグラウンドプログラムのインストール / 再インストール（ターミナルで見つかるコマンドのパスを書き込む） |
| `cos daemon status` / `report` | 動いているか / 最近の各巡回で何をしたか、警告はあるか |
| `cos integrity check` | インストール時の指紋と照合し、Staff のプログラムが変更されていないか確認 |
| `cos approvals list` / `approve --req-id … --real` / `reject --req-id …` | 承認待ち |
| `cos audit` | チェーン検証付きの行動監査ログ：外部に何を送ったか、誰が承認したか。改ざんされると検出できます |
