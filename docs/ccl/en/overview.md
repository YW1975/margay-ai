# Overview

> CCL is a terminal-based agentic coding assistant from MargayAI that helps you write, edit, and understand code.

CCL brings MargayAI's coding assistant experience directly into your terminal. It reads your codebase, runs commands, edits files, and helps you ship faster — all through natural language conversation. Think of it as a senior engineer who can see your entire project, run your build tools, and make coordinated changes across dozens of files.

**What makes CCL different:** Unlike standard CCL usage, the **dual-agent collaboration harness** pairs two AI agents — **Ralph** (Lead Developer) and **Lisa** (Code Reviewer) — in a turn-based protocol. Ralph plans and writes code; Lisa reviews and verifies quality. A mandatory gate system ensures every code change passes through structured quality checkpoints before it can be merged.

You can use CCL for anything you can do from the command line: exploring code, fixing bugs, writing tests, refactoring, creating PRs, and more.

---

## What you can do

CCL is a general-purpose tool. Here are the most common ways developers use it:

| Task | Example prompt |
|------|--------------|
| **Explore code** | "What does this project do?" |
| **Fix bugs** | "Fix the race condition in src/cache.ts" |
| **Add features** | "Add OAuth2 login with Google and GitHub" |
| **Refactor** | "Rename UserRepository to UserStore across the codebase" |
| **Write tests** | "Write unit tests for src/parser/json.ts" |
| **Review code** | "Review my changes and suggest improvements" |
| **Run commands** | "Run the test suite and fix any failures" |
| **Create PRs** | "Create a branch, implement the feature, and open a PR" |
| **Structured collaboration** | "Use the Ralph-Lisa Loop for this complex refactor" |

---

## CCL's dual-agent collaboration model

While standard CCL usage is a direct conversation with the coding assistant, CCL also supports a **structured dual-agent mode** called the **Ralph-Lisa Loop (RLL)**. This is ideal for complex tasks where you want every change planned, tested, reviewed, and agreed upon before landing.

### How it works

1. **Ralph** (Lead Developer) understands the task, plans the approach, writes code, and runs tests.
2. **Lisa** (Code Reviewer) reviews every submission, verifies test results, and either approves or sends it back for fixes.
3. They take turns through a structured protocol with mandatory quality gates.

### When to use it

| Scenario | Use standard CCL | Use Ralph-Lisa Loop |
|----------|------------------|---------------------|
| Quick questions, file reads | Yes | No |
| Simple bug fixes (< 5 files) | Yes | Optional |
| Complex refactors (> 10 files) | Optional | **Yes** |
| Feature additions with tests | Optional | **Yes** |
| Architectural changes | Optional | **Yes** |
| Production-critical fixes | Optional | **Yes** |

### Key features

- **Turn-based protocol** — Explicit `ccl whose-turn` checks prevent collisions
- **Mandatory gates** — `[PLAN]` → `[TDD-PLAN]` → `[CODE]` → `[FIX]` → `[CONSENSUS]`
- **Complexity management** — Auto-judges task complexity and adapts workflow
- **Built-in test harness** — WezTerm and Playwright end-to-end testing
- **WeCom integration** — Remote notifications for stuck agents and failures
- **Data closed loop** — Token capture, user identity, and audit trails

Learn more: [Ralph-Lisa Loop](/en/ralph-lisa-loop), [Getting Started with RLL](/en/getting-started-rll).

---

## How to start

### Terminal (macOS, Linux, WSL)

```bash
# Install
curl -fsSL https://ccl.ai/install.sh | bash

# Start in any project directory
cd /path/to/your/project
ccl
```

### Windows

```powershell
# Install
irm https://ccl.ai/install.ps1 | iex

# Start
ccl
```

See [Quickstart](/en/quickstart) for a full walkthrough.

---

## Where CCL runs

CCL is available wherever you work:

| Environment | How to access |
|-------------|---------------|
| **Terminal** | `ccl` command (macOS, Linux, Windows) |
| **VS Code** | CCL extension |
| **JetBrains** | CCL plugin |
| **Web** | [CCL_URL]/code |

The core experience is the same everywhere: natural language conversation, file access, command execution, and the optional Ralph-Lisa Loop.

---

## What's next

<CardGroup cols={2}>
  <Card title="Quickstart" icon="rocket" href="/en/quickstart">
    Get up and running in minutes
  </Card>

  <Card title="How CCL works" icon="book" href="/en/how-ccl-works">
    Understand the agentic loop and architecture
  </Card>

  <Card title="Ralph-Lisa Loop" icon="arrows-spin" href="/en/ralph-lisa-loop">
    Structured dual-agent collaboration
  </Card>

  <Card title="Common workflows" icon="graduation-cap" href="/en/common-workflows">
    Step-by-step guides for typical tasks
  </Card>
</CardGroup>
