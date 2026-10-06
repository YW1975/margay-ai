# 04 To-dos, calendar, and delegation

## Notes (to-dos)

- "**Note this down for me: send the quote to Lao Wang by Friday**" becomes a to-do with a deadline, with you as the owner.
- "What's on my to-do list?", "Where am I stuck?", "Where is that quote at?", "What should I do next?", "This one is done."
- These are kept in Staff's own ledger, which the morning brief, end-of-day summary, and risk alerts all read from.
- If the host also has another to-do tool installed (such as WeCom to-dos), "Note this down for me" **goes to Staff by default**. It only goes to the other tool if you say explicitly "Put it in my WeCom to-dos." Anything noted elsewhere won't show up in the morning brief or summaries.

**Reminder vs. calendar item**: "Remind me to drink water at 10" is **one thing at one moment** → a reminder. "Meet Lao Lu from 3 to 4 pm" is **an appointment with a start and an end** → a calendar item.

## The calendar

Staff has its own calendar: **a record plus a background timer, with no screen of its own**. The morning brief, end-of-day summary, and pre-meeting reminders all read from it.

- **Add**: "**Meeting Lao Lu Wednesday at 3 pm, for an hour, in Wangjing**".
  - If you don't say how long, it asks "Roughly how long?" rather than guessing;
  - For all-day things (business trips, time off), it doesn't ask about length: "I'm in Hangzhou all day Friday";
  - If it clashes with something already scheduled, it asks whether you still want to add it.
- **View**: "What's on tomorrow?", "This week's schedule", "Am I free tomorrow afternoon?"
- **Change / delete**: "Move Wednesday's meeting to 4" (same length), "Push that meeting back half an hour", "Cancel the meeting with Lao Lu." If several items could match, it asks which one you mean.
- Recurring items (a weekly Monday meeting) aren't supported in the calendar yet; for now use a reminder: "Remind me about the team meeting every Monday at 10."

## Syncing with the calendar you already use

If you want to view and drag things around in your phone calendar or Feishu calendar, have Staff set up a **two-way sync** with that calendar: changes on either side carry over to the other.

- Say "**Sync my schedule to my Feishu calendar**" (or "Switch to Google Calendar"). It first asks: which calendar? Two-way, or read-only (just pull that calendar's items in)?
- **Only one calendar syncs at a time**; switching to another stops the old one (records in Staff aren't deleted). Say "**Stop syncing for now**" to stop.
- **If the same item was changed on both sides**: the later change wins, and it **tells you privately** which side it kept. If that's wrong, tell it and it will change it back.
- **Feishu**: supported out of the box. To sync **your own** Feishu calendar, first **share the calendar with Staff's Feishu account in Feishu, with edit permission**. Without sharing, it can only sync the Staff account's own calendar. After that, the background program syncs automatically every round.
- **Other calendars** (Google, Mac Calendar…): if the host (Margay) already has that calendar connected, Staff syncs it during a session using the host's capability. If nothing is available, it has the "connector builder" skill build a connector and then connects through it.
- Ask "How's the sync going?" or "Any conflicts?", and it tells you which calendar is connected, when it last synced, and whether anything went wrong.

## Handing work to other assistants (delegation)

Margay has many specialist assistants (social media operations, app development, workflow architect, code review…). When one step of what you've asked for is better suited to one of them:

- You can say it directly, "**Who's best to make this PPT?**" or "**Hand the Xiaohongshu posting to the social media assistant**", and Staff will also suggest it on its own when it breaks down a task and spots a good fit.
- It **asks you first**: who to hand it to, why, and roughly when to expect results, then "OK?" **It only hands it over once you agree**, and the program enforces this too (without your agreement, nothing is recorded or handed over).
- In the Margay desktop app, it creates a conversation with that assistant and passes along your exact words. In the command-line version, it tells you which assistant to go to.
- Handed-off work is recorded and shows up under 【交出去的事】 (Handed off) in the morning brief. If there's no result past the agreed time, it alerts you on the spot (see chapter 03).
- When the result comes back, tell it "That one's done, the result is…", and it closes the item and keeps moving the original task forward.
