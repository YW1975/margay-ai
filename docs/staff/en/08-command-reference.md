# 08 Command reference

> Day to day, **you don't need to memorize these commands**; just talk to Staff. This page is for setup, troubleshooting, or development.
> `cos` is the entry point in Staff's main skill folder (CLI version: `~/.ccl/skills/margay-chief/cos`; desktop version: `~/.margay/config/skills/margay-chief/cos`).

## Onboarding and configuration

| Command | What it does |
|---|---|
| `cos onboard --conversational` | Onboarding: gives the next thing to ask / say, step by step |
| `cos configure --morning-brief-time HH:MM` | What time to send the morning brief each day |
| `cos configure --evening-summary-time HH:MM` | What time to send the end-of-day summary each day |
| `cos configure --morning-brief-platform weixin\|feishu\|wecom` | Which IM app the brief / summary / reminders go to (default: the most recently paired private chat) |
| `cos configure --chase on\|off` | Whether the background generates follow-up chasers (reminders and the brief continue when off) |
| `cos configure --feishu-inbound on\|off` | Whether to receive Feishu messages |
| `cos staff-home set <目录>` / `show` | Work folder: opening a session here connects IM automatically |

## IM

| Command | What it does |
|---|---|
| `cos attach register` | Connect already-paired IM (gives a 6-digit pairing code if never paired) |
| `cos attach pair [--chat-type group]` | Pair another private chat / add to a group |
| `cos attach wait` / `reply` | Wait for messages / reply to messages (used by Staff itself) |
| `cos attach ask-owner --text …` | Ask the boss privately when a group request needs authorization |
| `cos attach status` / `detach` / `forget` | Show status / disconnect / forget pairing |

## Daily rhythm

| Command | What it does |
|---|---|
| `cos brief morning [--send] [--shown]` | Preview / send the morning brief now; `--shown` records "already shown to the boss" so it isn't pushed again that day |
| `cos brief evening [--send]` | Preview / send the end-of-day summary now |
| `cos remind add --text … --at HH:MM\|"YYYY-MM-DD HH:MM" \| --in-min N [--every day\|week]` | Timed reminder / recurring reminder |
| `cos remind list` / `cancel --id …` | List / cancel reminders |
| `cos risk list` | Current risks (view only, nothing sent) |

## Calendar and sync

| Command | What it does |
|---|---|
| `cos calendar add --title … --at … --minutes N\|--end …\|--all-day [--location …] [--remind N]` | Add a calendar item (refused if no length is given) |
| `cos calendar list --day today\|tomorrow\|YYYY-MM-DD \| --week` | View the calendar |
| `cos calendar find --text …` / `move --id … --at …` / `update` / `cancel --id …` | Find / reschedule / edit / cancel |
| `cos calendar connect --name … --kind code --connector feishu [--calendar <id>] [--read-only]` | Connect a Feishu calendar; the background syncs automatically |
| `cos calendar connect --name … --kind agent` | Connect a calendar synced through the host's capability (syncs during a session) |
| `cos calendar sync-in --file …` / `sync-out` / `sync-ack --file …` | The three sync steps for an agent connector |
| `cos calendar sync` / `connections` / `disconnect --name …` | Run one sync manually / list connections / stop |

## Delegation

| Command | What it does |
|---|---|
| `cos delegate options` | List of assistants in use on this machine |
| `cos delegate add --to <id> --what … [--by YYYY-MM-DD] --approved` | Hand off work (without `--approved` it only returns what to ask the boss) |
| `cos delegate list` / `done --id … --result …` / `cancel --id …` | List / close out / cancel |

## Standing orders, inventory, and help requests

| Command | What it does |
|---|---|
| `cos expect "<原话>"` / `expect list` / `pause\|cancel\|resume --id …` | Standing orders (`<原话>` = your exact words) |
| `cos capabilities --readiness` | Honest inventory: whether each capability works now and what step is missing |
| `cos help-request add --need … --tried … --blocker … --who owner\|dev` / `list` / `close` | Help requests |
| `cos self-change log --what … --why … --path …` / `list` | Record of self-upgrades (managed paths are refused) |

## Background program and security

| Command | What it does |
|---|---|
| `cos daemon install` | Install / reinstall the background program (writes in the command paths it can find in your terminal) |
| `cos daemon status` / `report` | Whether it's running / what recent rounds did and any warnings |
| `cos integrity check` | Compare against the install fingerprint to see whether Staff's program has been changed |
| `cos approvals list` / `approve --req-id … --real` / `reject --req-id …` | Pending approvals |
| `cos audit` | Tamper-evident action audit log (what was sent out, who approved it) |
