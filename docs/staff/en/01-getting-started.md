# 01 Meet Staff and get started

## What Staff is

Staff is a personal assistant that lives inside Margay (it works in both the desktop app and the command-line CLI). It has one goal: **to be like a reliable human assistant**.

- **It knows what you have going on**: your to-dos, goals, schedule, what you've handed to whom, and your standing orders.
- **It moves things forward even when you haven't asked**: it plans your day every morning, reminds you on time, reminds you before meetings, sums up your day before you leave, and speaks up right away when something is about to go wrong.
- **It stays within boundaries, its actions can be undone, and it keeps a record**: anything sent to other people needs your approval; sensitive information doesn't leak; it can't change its own program, and if it tries, that gets caught.

Everything it keeps is stored on your own computer (in Staff's data folder), so it works without WeCom or Feishu. Once you connect an IM app, you can reach it even when you're away from your computer.

## First time: onboarding

In Margay, say "**Get set up for me**" to Staff. It will:

1. Introduce itself.
2. Ask you one thing at a time, in this order:
   - What should I call you? (It uses this name from then on.)
   - What is your main job? Do you lead a team? (No pick-list; it decides which capabilities to bring based on your answer.)
   - Is there anything I should pay special attention to? (Each point becomes a standing order; see chapter 05.)
   - What do you have on your plate right now that you'd like me to start tracking? (Each item becomes a to-do with you as the owner.)
3. Take care of two setup steps:
   - **How to reach you**: it gives you a 6-digit code. Send it to Staff in a private chat on WeChat / Feishu / WeCom and you're connected (see chapter 02). It **never asks for any ID**.
   - **What time each morning to send today's plan** (see chapter 03).

You can say "That's enough for now" at any point; it will ask the rest later when the time is right.

## Starting work automatically when you open a session

You can give Staff a "work folder." After that, whenever you open a Margay CLI session in that folder, it automatically, **without you saying anything**:

- connects to IM (the private chats and groups you've paired before);
- recalls what to call you, your standing orders, and today's reminders.

When you close that session, anyone reaching it over IM gets an "offline" reply.

> How to set it up (one time, usually done by whoever installs it): `cos staff-home set <目录>`. See chapter 08.

## The background program

Staff has a background program that runs a round **every 15 minutes**: sending the morning brief, timed reminders, pre-meeting reminders, the end-of-day summary, and risk alerts, and syncing the calendar. **It keeps running even when no Staff session is open**, so these messages don't depend on you keeping a session open.

If the background program can't send messages, it shows a notification on your Mac (at most once a day for the same cause). See chapter 07 for how to fix it.
