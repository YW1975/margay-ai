# 07 Not getting messages?

## First, ask it "What can you do right now?"

Say "**What can you do?**" to Staff and look at the lines for "remind you on time," "send today's plan every morning," and "send a summary at the end of every day":

- If they say "Can do now": the background program is running and can send messages.
- If they say "**Background program can't send messages (cc-connect not found)**": follow the "how to fix" it gives. Usually that means running `cos daemon install` again in a terminal (reinstalling the background program).
- If they say "Background timer hasn't run for N minutes": the background program isn't running; again, reinstall the background program.

## Not getting reminders / the morning brief / the end-of-day summary

1. **Has a time been set yet?** Both the morning brief and the end-of-day summary need a time first ("Send the morning brief at 9 every day", "Send the end-of-day summary at 18:00 every day").
2. **Did it go to a different IM app?** With several IM apps connected, it goes to the most recently paired private chat. To pick one, say "Send the morning brief to WeCom."
3. **Did you already see it?** If you asked "What's on today?" before the morning brief time, it won't push the brief that day.
4. **Can the background program send?** See the section above. When it can't send, your Mac shows a "Staff can't send messages" notification (once a day per cause).
5. **Once it's fixed**: any morning brief / reminder / summary that wasn't sent that day is **resent automatically in the next round**, noting how late it is. For reminders whose time was missed, it tells you privately "Missed a reminder."

## Feishu login about to expire

Staff uses its own Feishu account to read and write Feishu (calendar sync, Feishu messages, and so on). The login has an expiry:

- When it's close to expiring, it reminds you "Feishu login expires MM-DD HH:MM." **Using any of Staff's Feishu features once before then renews it automatically**; if it has already expired, you need to log in again.
- If you haven't turned on Feishu inbound messages and haven't connected a Feishu calendar, not being able to check the Feishu login status won't set off repeated alerts.

## No response when you reach it over IM

- It replies "**Offline**" (「下线了」): the Staff session isn't open. Open it (or open a session in the work folder so it starts work automatically).
- It replies "**Busy**" (「忙碌中」): it's busy with something else; your message won't be lost.
- No reply at all: first ask it on your computer "Who are you connected to remotely right now?" to see whether the IM connection is working; if needed, say "Connect remotely" to reconnect.

## Calendar sync problems

Ask "How's the sync going?" When something goes wrong, it explains why (for example, the Feishu login expired, or it doesn't have edit permission on the calendar); follow its suggestions. Or say "Stop syncing for now" to stop it; the records in Staff aren't affected.
