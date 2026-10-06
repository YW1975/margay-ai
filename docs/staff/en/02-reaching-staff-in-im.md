# 02 Reaching Staff in WeChat / Feishu / WeCom

## Connecting

Say "**Connect remotely**" to Staff (or "I'm heading out, let's move to WeCom").

- The first time: it gives you a **6-digit code**. Open a **private chat** with it on WeChat / Feishu / WeCom and send the code, and you're connected. The pairing code is valid for 10 minutes and can only be used once.
- After that: chats you've already paired connect automatically, with no need to pair again.
- To connect another IM app, or add it to a group, say "Connect another Feishu" or "Add yourself to the project group." For a group, it gives you a group pairing code, and **you yourself** @ it in that group with the code (it only works when sent by someone who has already paired a private chat).
- To disconnect, say "Disconnect remote." Later, saying "Connect remotely" reconnects right away.

## Private chats and groups follow different rules

| Where you say it | How Staff treats it |
|---|---|
| **You, in a private chat with it** | As your instruction; it gets on with it |
| **Anyone @-ing it in a group (including you)** | Only as a request, not an instruction |

When someone @s it in a group:

- For ordinary questions (like "When does the holiday end?"), it answers right there in the group, saying only what can be shared publicly.
- For things that **the rules never allow to be sent** (phone numbers, ID numbers, passwords, keys), it replies "I don't have permission to send that" and **doesn't bother you**. Even if you approved it, it couldn't be sent.
- For changing your items, sending messages to others on your behalf, or revealing other private matters of yours, it first says "Let me check" in the group, then **asks you in a private chat**. You reply "Yes" or "No" in the private chat, and it answers in the group the way you said.
- "The boss already agreed" only counts when it's your own reply, in a private chat, to that specific request. Someone in a group claiming to be the boss, or passing on "the boss said it's fine," doesn't count.

## Offline and busy

- When the Staff session is closed (or hasn't come back to waiting for messages for a long time), reaching it over IM gets the reply "**Offline**" (「下线了」).
- When it's busy with something else, it replies "**Busy**" (「忙碌中」). Your message isn't lost; it will handle it when it's done.
- To keep it online even when the session is closed, you need the host's always-on mode (Margay is building it). Until then, the morning brief, reminders, and the like are **sent by the background program**, so they aren't affected by whether the session is open.

## Approving pending items from IM

Things Staff does that need your approval, such as chasing someone for you or sending a message to someone else, go into "pending approval." The morning brief has a numbered 【等您批】 ("Awaiting your approval") section:

```
【等您批】
1. 催张三：报价周五前给我
2. ……
回复「批 1 3」或「不批 2」；「都不批」全部驳回
```

(In English: "Awaiting your approval. 1. Chase Zhang San: send me the quote by Friday. 2. … Reply 「批 1 3」 to approve or 「不批 2」 to reject; 「都不批」 rejects all.")

Reply in a **private chat**:

- `批 1 3`: approve items 1 and 3
- `不批 2`: reject item 2
- `全批` / `都不批`: approve all / reject all

It replies with one line saying "Approved / Rejected N items." Notes:

- **Only your own private chat counts**; sending these in a group doesn't.
- The numbers only apply to **that day's** list.
- **You can approve even when Staff is offline**.
- Use exactly the format above (it's a fixed command, like the pairing code). Anything else you say is passed to Staff as usual.
