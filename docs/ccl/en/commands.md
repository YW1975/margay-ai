# Commands

> Complete reference for CCL session commands (slash commands).

During any CCL session, you can use slash commands to control the session, manage the Ralph-Lisa Loop, and access CCL features. Type `/` during a session to see all available commands.

---

## Core commands

| Command | Description |
|---------|-------------|
| `/help` | Show available commands and brief descriptions |
| `/exit` or `Ctrl+D` | End the current session |
| `/clear` | Clear the screen |
| `/model` | Switch models during a session |

---

## Ralph-Lisa Loop commands

| Command | Description |
|---------|-------------|
| `/check-turn` | Check whose turn it is in the Ralph-Lisa Loop |
| `/submit-work "[TAG] ..."` | Submit work and pass the turn |
| `/view-status` | See current session status (step, round, pending actions) |
| `/read-review` | Read Lisa's latest feedback |
| `/next-step "name"` | Enter a new step after consensus |

---

## Session management

| Command | Description |
|---------|-------------|
| `/resume` | Open the session picker to continue a previous conversation |
| `/branch` | Fork the current session into a new one |
| `/context` | See what's using space in the context window |
| `/compact` | Compact the conversation to free context space |
| `/compact focus on <topic>` | Compact while preserving context about a specific topic |

---

## Configuration

| Command | Description |
|---------|-------------|
| `/init` | Walk through creating a CCL.md for your project |
| `/agents` | Configure custom subagents |
| `/doctor` | Diagnose common issues with your installation |
| `/mcp` | Check per-server MCP context costs |
| `/statusline` | Configure your terminal status line |

---

## Using commands

Most commands work without arguments:

```text
/help
/clear
/check-turn
```

Some accept optional arguments:

```text
/compact focus on the API changes
/next-step "implementation"
/submit-work "[PLAN] Add OAuth2 login"
```

---

## Command shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Command completion |
| `↑` | Command history |
| `/` | Show all commands and skills |
| `Shift+Tab` | Cycle permission modes |
| `Esc` | Stop the current tool call |
| `Ctrl+C` | Interrupt the current operation |

---

## See also

- [CLI Reference](/en/cli-reference) — Complete `ccl` command-line reference
- [Ralph-Lisa Loop](/en/ralph-lisa-loop) — Dual-agent collaboration protocol
- [Getting Started with RLL](/en/getting-started-rll) — Step-by-step walkthrough
