# 06 Boundaries and audit trail

## Outgoing messages need your approval

- When it sends a message to **other people** on your behalf (chasing someone, replying to someone outside, sending a document), it first goes into "pending approval" and is sent only after you agree. You can approve in Margay, or reply 「批 1」 (approve item 1) in your IM private chat (see chapter 02).
- Messages sent to **your own private chat** (morning brief, reminders, summaries, risk alerts) don't need approval, but they still go through the sensitive-information check.
- Everything sent out is recorded in a **tamper-evident audit log**. Ask "What messages did you send out for me this week?" and it looks them up in the audit records for you.

## Sensitive information is blocked

Phone numbers, ID numbers, passwords, keys, and the like **simply can't be sent under the rules**, no matter who asks, and not even if you approve. If someone in a group asks, it replies "I don't have permission to send that" and doesn't bother you.

## What's said in groups isn't an instruction

Anyone @-ing it in a group (including you) is only making a request. For things that need authorization, it asks you in a private chat; "The boss agreed" only counts as your own reply in a private chat (see chapter 02).

## It can't secretly change its own program

Staff's official program and officially installed skills are **off-limits to it**:

- Its editing tools are blocked from touching these files;
- If it ever got around that (for example, through the command line) and changed them, the background program checks them every round against the "fingerprint" recorded at install time, so **it's caught within 15 minutes at most**, and it tells you privately "Staff's program has been changed";
- Reinstalling itself to "launder" the change doesn't work either: if anything changed after a reinstall, you get a notification saying "The program was just reinstalled; N files differ from before." **If it was an upgrade you or development did, ignore it; if not, go check on your computer.**

This is **after-the-fact detection**: the promise is "any change will be caught, you'll be told, and there's a record," not "it's impossible to change."

## Things can be undone

- Reminders, standing orders, calendar items, and delegations can all be cancelled;
- Stopping calendar sync doesn't delete the records in Staff;
- Handed-off work can be cancelled ("That one doesn't need doing anymore").
