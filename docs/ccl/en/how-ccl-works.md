> ## Documentation Index
> Fetch the complete documentation index at: [CCL_URL]/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# How CCL works

> Understand the dual-agent loop, built-in tools, and how CCL interacts with your project.

CCL is an agentic assistant that runs in your terminal. While it excels at coding, it can help with anything you can do from the command line: writing docs, running builds, searching files, researching topics, and more.

This guide covers the core architecture, built-in capabilities, and [tips for working effectively](#work-effectively-with-ccl). For step-by-step walkthroughs, see [Common workflows](/en/common-workflows). For extensibility features like skills, MCP, and hooks, see [Extend CCL](/en/features-overview).

## The agentic loop

When you give CCL a task, it works through three phases: **gather context**, **take action**, and **verify results**. These phases blend together. CCL uses tools throughout, whether searching files to understand your code, editing to make changes, or running tests to check its work.

The loop adapts to what you ask. A question about your codebase might only need context gathering. A bug fix cycles through all three phases repeatedly. A refactor might involve extensive verification. CCL decides what each step requires based on what it learned from the previous step, chaining dozens of actions together and course-correcting along the way.

You're part of this loop too. You can interrupt at any point to steer CCL in a different direction, provide additional context, or ask it to try a different approach. CCL works autonomously but stays responsive to your input.

The agentic loop is powered by two components: [models](#models) that reason and [tools](#tools) that act. CCL serves as the **agentic harness** around the dual-agent system: it provides the tools, context management, and execution environment that turn language models into capable coding agents.

## The dual-agent collaboration

CCL's unique architecture pairs two specialized agents who collaborate in turns:

| Agent | Role | Responsibility |
| ----- | ---- | -------------- |
| **Ralph** | Lead Developer | Writes code, implements features, runs tests, and makes changes |
| **Lisa** | Code Reviewer | Reviews submissions, validates quality, and provides feedback |

Ralph and Lisa work together to ensure high-quality output. Ralph does the implementation work, then submits it for review. Lisa examines the work against project standards, test plans, and quality gates. If Lisa approves, the work moves forward. If Lisa finds issues, she sends it back with specific feedback, and Ralph addresses the concerns before resubmitting.

This collaboration happens automatically within the CCL loop. You interact with the system as a whole, while the dual-agent protocol handles quality assurance behind the scenes.

## Turn-based protocol

CCL operates on a strict turn-based protocol between Ralph and Lisa. At any point, only one agent is active:

1. **Ralph's turn**: Ralph analyzes the task, gathers context, writes code, runs tests, and prepares a submission
2. **Submission**: Ralph submits work using a tagged message (e.g., `[PLAN]`, `[CODE]`, `[FIX]`) which passes the turn to Lisa
3. **Lisa's turn**: Lisa reviews the submission, checks quality gates, and responds with `[PASS]` or `[NEEDS_WORK]`
4. **Handoff**: If Lisa passes the work, Ralph receives the turn back and can proceed. If Lisa needs work, Ralph must address the feedback before continuing

You can check whose turn it is at any time by running `ccl whose-turn`. The system manages the handoff automatically, ensuring both agents stay synchronized.

Key commands in the turn protocol:

| Command | Purpose |
|---------|---------|
| `ccl whose-turn` | Check which agent is currently active |
| `ccl submit-ralph --file <path>` | Ralph submits work and passes turn to Lisa |
| `ccl read review.md` | Read Lisa's latest feedback |
| `ccl status` | View current session state and pending actions |

## Gate system

CCL enforces a mandatory phased workflow through quality gates. Each phase must be completed and reviewed before proceeding to the next:

| Phase | Tag | Purpose | Gate |
| ----- | --- | ------- | ---- |
| **Planning** | `[PLAN]` | Architecture discussion and approach alignment | Gate-free discussion |
| **Test Planning** | `[TDD-PLAN]` | Lock test plan into actual test cases | Complexity judgment + test plan validation |
| **Research** | `[RESEARCH]` | Reference implementations, protocols, external APIs | Evidence verification |
| **Implementation** | `[CODE]` | Write and test the actual code | Test results + lint/type checks |
| **Fix** | `[FIX]` | Address Lisa's feedback | Regression + new tests |
| **Consensus** | `[CONSENSUS]` | Confirm agreement on completed work | Mutual confirmation |

The gate system ensures that:
- Complex tasks are properly analyzed before coding begins
- Tests are planned before implementation
- Research is verified when involving external APIs or protocols
- All code submissions include actual test results
- Lisa's feedback is addressed with reasoning

You cannot skip phases. The system validates submissions and rejects attempts to bypass the workflow.

## Complexity management

Before coding begins, CCL automatically judges the complexity of each task to determine the appropriate workflow:

1. **Complexity analysis**: The system analyzes the task description, codebase, and requirements to classify the task as simple, standard, complex, or expert
2. **Tier assignment**: Based on complexity, the task is assigned to appropriate quality tiers (unit tests, integration tests, smoke tests, security checks)
3. **Workflow adaptation**: Complex and expert tasks require additional phases like `[CLARIFY]` for requirement clarification before test planning
4. **Gate enforcement**: The complexity classification determines which gates are mandatory and which tests are required

This ensures that simple tasks move quickly while complex tasks receive the thorough analysis and testing they need.

### Models

CCL uses configured coding models to understand your code and reason about tasks. CCL can read code in any language, understand how components connect, and figure out what needs to change to accomplish your goal. For complex tasks, it breaks work into steps, executes them, and adjusts based on what it learns.

[Multiple models](/en/model-config) are available with different tradeoffs. Sonnet handles most coding tasks well. Opus provides stronger reasoning for complex architectural decisions. Switch with `/model` during a session or start with `ccl --model <name>`.

When this guide says "CCL chooses" or "CCL decides," it's the model doing the reasoning.

### Tools

Tools are what make CCL agentic. Without tools, CCL can only respond with text. With tools, CCL can act: read your code, edit files, run commands, search the web, and interact with external services. Each tool use returns information that feeds back into the loop, informing CCL's next decision.

The built-in tools generally fall into five categories, each representing a different kind of agency.

| Category              | What CCL can do                                                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File operations**   | Read files, edit code, create new files, rename and reorganize                                                                                                |
| **Search**            | Find files by pattern, search content with regex, explore codebases                                                                                           |
| **Execution**         | Run shell commands, start servers, run tests, use git                                                                                                         |
| **Web**               | Search the web, fetch documentation, look up error messages                                                                                                   |
| **Code intelligence** | See type errors and warnings after edits, jump to definitions, find references (requires [code intelligence plugins](/en/discover-plugins#code-intelligence)) |

These are the primary capabilities. CCL also has tools for spawning subagents, asking you questions, and other orchestration tasks. See [Tools available to CCL](/en/tools-reference) for the complete list.

CCL chooses which tools to use based on your prompt and what it learns along the way. When you say "fix the failing tests," CCL might:

1. Run the test suite to see what's failing
2. Read the error output
3. Search for the relevant source files
4. Read those files to understand the code
5. Edit the files to fix the issue
6. Run the tests again to verify

Each tool use gives CCL new information that informs the next step. This is the agentic loop in action.

**Extending the base capabilities:** The built-in tools are the foundation. You can extend what CCL knows with [skills](/en/skills), connect to external services with [MCP](/en/mcp), automate workflows with [hooks](/en/hooks), and offload tasks to [subagents](/en/sub-agents). These extensions form a layer on top of the core agentic loop. See [Extend CCL](/en/features-overview) for guidance on choosing the right extension for your needs.

## What CCL can access

This guide focuses on the terminal. CCL also runs in [VS Code](/en/vs-code), [JetBrains IDEs](/en/jetbrains), and other environments.

When you run `ccl` in a directory, CCL gains access to:

* **Your project.** Files in your directory and subdirectories, plus files elsewhere with your permission.
* **Your terminal.** Any command you could run: build tools, git, package managers, system utilities, scripts. If you can do it from the command line, CCL can too.
* **Your git state.** Current branch, uncommitted changes, and recent commit history.
* **Your [CCL.md](/en/memory).** A markdown file where you store project-specific instructions, conventions, and context that CCL should know every session.
* **[Auto memory](/en/memory#auto-memory).** Learnings CCL saves automatically as you work, like project patterns and your preferences. The first 200 lines or 25KB of MEMORY.md, whichever comes first, load at the start of each session.
* **Extensions you configure.** [MCP servers](/en/mcp) for external services, [skills](/en/skills) for workflows, [subagents](/en/sub-agents) for delegated work, and [CCL in Chrome](/en/chrome) for browser interaction.
* **The dual-agent state.** Session history, review feedback, turn status, and gate progress for the Ralph/Lisa collaboration.

Because CCL sees your whole project, it can work across it. When you ask CCL to "fix the authentication bug," it searches for relevant files, reads multiple files to understand context, makes coordinated edits across them, runs tests to verify the fix, and commits the changes if you ask. This is different from inline code assistants that only see the current file.

## Environments and interfaces

The agentic loop, tools, and capabilities described above are the same everywhere you use CCL. What changes is where the code executes and how you interact with it.

### Execution environments

CCL runs in three environments, each with different tradeoffs for where your code executes.

| Environment        | Where code runs                         | Use case                                                   |
| ------------------ | --------------------------------------- | ---------------------------------------------------------- |
| **Local**          | Your machine                            | Default. Full access to your files, tools, and environment |
| **Cloud**          | [CCL_VENDOR]-managed VMs                   | Offload tasks, work on repos you don't have locally        |
| **Remote Control** | Your machine, controlled from a browser | Use the web UI while keeping everything local              |

### Interfaces

You can access CCL through the terminal, the [desktop app](/en/desktop), [IDE extensions](/en/vs-code), [ccl.ai/code]([CCL_URL]/code), [Remote Control](/en/remote-control), [Slack](/en/slack), and [CI/CD pipelines](/en/github-actions). The interface determines how you see and interact with CCL, but the underlying agentic loop is identical. See [Use CCL everywhere](/en/overview#use-ccl-everywhere) for the full list.

## Work with sessions

CCL saves your conversation locally as you work. Each message, tool use, and result is written to a plaintext JSONL file under `~/.ccl/projects/`, which enables [rewinding](#undo-changes-with-checkpoints), [resuming, and forking](#resume-or-fork-sessions) sessions. Before CCL makes code changes, it also snapshots the affected files so you can revert if needed. For paths, retention, and how to clear this data, see [application data in `~/.ccl`](/en/ccl-directory#application-data).

**Sessions are independent.** Each new session starts with a fresh context window, without the conversation history from previous sessions. CCL can persist learnings across sessions using [auto memory](/en/memory#auto-memory), and you can add your own persistent instructions in [CCL.md](/en/memory).

### Work across branches

Each CCL conversation is a session tied to your current directory. The `/resume` picker shows sessions from the current worktree by default, with keyboard shortcuts to widen the list to other worktrees or projects. See [Manage sessions](/en/sessions#use-the-session-picker) for the full list of picker shortcuts and how name resolution works.

CCL sees your current branch's files. When you switch branches, CCL sees the new branch's files, but your conversation history stays the same. CCL remembers what you discussed even after switching.

Since sessions are tied to directories, you can run parallel CCL sessions by using [git worktrees](/en/worktrees), which create separate directories for individual branches.

### Resume or fork sessions

Resuming a session with `ccl --continue` or `ccl --resume` reopens it under the same session ID and appends new messages to the existing conversation. Forking with `--fork-session` or `/branch` copies the history into a new session ID, leaving the original unchanged.

For the resume flags, the `/resume` picker, naming, and what happens when the same session is open in two terminals, see [Manage sessions](/en/sessions).

### The context window

CCL's context window holds your conversation history, file contents, command outputs, [CCL.md](/en/memory), [auto memory](/en/memory#auto-memory), loaded skills, and system instructions. As you work, context fills up. CCL compacts automatically, but instructions from early in the conversation can get lost. Put persistent rules in CCL.md, and run `/context` to see what's using space.

For an interactive walkthrough of what loads and when, see [Explore the context window](/en/context-window).

#### When context fills up

CCL manages context automatically as you approach the limit. It clears older tool outputs first, then summarizes the conversation if needed. Your requests and key code snippets are preserved; detailed instructions from early in the conversation may be lost. Put persistent rules in CCL.md rather than relying on conversation history.

To control what's preserved during compaction, add a "Compact Instructions" section to CCL.md or run `/compact` with a focus (like `/compact focus on the API changes`).

If a single file or tool output is so large that context refills immediately after each summary, CCL stops auto-compacting after a few attempts and shows an error instead of looping. See [Auto-compaction stops with a thrashing error](/en/troubleshooting#auto-compaction-stops-with-a-thrashing-error) for recovery steps.

Run `/context` to see what's using space. MCP tool definitions are deferred by default and loaded on demand via [tool search](/en/mcp#scale-with-mcp-tool-search), so only tool names consume context until CCL uses a specific tool. Run `/mcp` to check per-server costs.

#### Manage context with skills and subagents

Beyond compaction, you can use other features to control what loads into context.

[Skills](/en/skills) load on demand. CCL sees skill descriptions at session start, but the full content only loads when a skill is used. For skills you invoke manually, set `disable-model-invocation: true` to keep descriptions out of context until you need them. For skills you didn't write, use [`skillOverrides`](/en/skills#override-skill-visibility-from-settings) to do the same from settings.

[Subagents](/en/sub-agents) get their own fresh context, completely separate from your main conversation. Their work doesn't bloat your context. When done, they return a summary. This isolation is why subagents help with long sessions.

See [context costs](/en/features-overview#understand-context-costs) for what each feature costs, and [reduce token usage](/en/costs#reduce-token-usage) for tips on managing context.

## Stay safe with checkpoints and permissions

CCL has two safety mechanisms: checkpoints let you undo file changes, and permissions control what CCL can do without asking.

### Undo changes with checkpoints

**Every file edit is reversible.** Before CCL edits any file, it snapshots the current contents. If something goes wrong, press `Esc` twice to rewind to a previous state, or ask CCL to undo.

Checkpoints are local to your session, separate from git. They only cover file changes. Actions that affect remote systems (databases, APIs, deployments) can't be checkpointed, which is why CCL asks before running commands with external side effects.

### Control what CCL can do

Press `Shift+Tab` to cycle through permission modes:

* **Default**: CCL asks before file edits and shell commands
* **Auto-accept edits**: CCL edits files and runs common filesystem commands like `mkdir` and `mv` without asking, still asks for other commands
* **Plan mode**: CCL explores and proposes a plan without editing your source files; permission prompts still apply as in default mode
* **Auto mode**: CCL evaluates all actions with background safety checks. Currently a research preview

You can also allow specific commands in `.ccl/settings.json` so CCL doesn't ask each time. This is useful for trusted commands like `npm test` or `git status`. Settings can be scoped from organization-wide policies down to personal preferences. See [Permissions](/en/permissions) for details.

***

## Work effectively with CCL

These tips help you get better results from CCL.

### Ask CCL for help

CCL can teach you how to use it. Ask questions like "how do I set up hooks?" or "what's the best way to structure my CCL.md?" and CCL will explain.

Built-in commands also guide you through setup:

* `/init` walks you through creating a CCL.md for your project
* `/agents` helps you configure custom subagents
* `/doctor` diagnoses common issues with your installation

### It's a conversation

CCL is conversational. You don't need perfect prompts. Start with what you want, then refine:

```text theme={null}
Fix the login bug
```

\[CCL investigates, tries something]

```text theme={null}
That's not quite right. The issue is in the session handling.
```

\[CCL adjusts approach]

When the first attempt isn't right, you don't start over. You iterate.

#### Interrupt and steer

You can redirect CCL at any point without waiting for the turn to finish or starting over:

* **Press `Esc`** to stop CCL immediately. The running tool call is canceled and CCL waits for your next instruction.
* **Type a correction and press `Enter`** to send it without stopping the running tool. CCL reads it as soon as the current action completes and adjusts before deciding its next step.

### Be specific upfront

The more precise your initial prompt, the fewer corrections you'll need. Reference specific files, mention constraints, and point to example patterns.

```text theme={null}
The checkout flow is broken for users with expired cards.
Check src/payments/ for the issue, especially token refresh.
Write a failing test first, then fix it.
```

Vague prompts work, but you'll spend more time steering. Specific prompts like the one above often succeed on the first attempt.

### Give CCL something to verify against

CCL performs better when it can check its own work. Include test cases, paste screenshots of expected UI, or define the output you want.

```text theme={null}
Implement validateEmail. Test cases: 'user@example.com' -> true,
'invalid' -> false, 'user@.com' -> false. Run the tests after.
```

For visual work, paste a screenshot of the design and ask CCL to compare its implementation against it.

### Explore before implementing

For complex problems, separate research from coding. Use plan mode (`Shift+Tab` twice) to analyze the codebase first:

```text theme={null}
Read src/auth/ and understand how we handle sessions.
Then create a plan for adding OAuth support.
```

Review the plan, refine it through conversation, then let CCL implement. This two-phase approach produces better results than jumping straight to code.

### Delegate, don't dictate

Think of delegating to a capable colleague. Give context and direction, then trust CCL to figure out the details:

```text theme={null}
The checkout flow is broken for users with expired cards.
The relevant code is in src/payments/. Can you investigate and fix it?
```

You don't need to specify which files to read or what commands to run. CCL figures that out.

## What's next

<CardGroup cols={2}>
  <Card title="Extend with features" icon="puzzle-piece" href="/en/features-overview">
    Add Skills, MCP connections, and custom commands
  </Card>

  <Card title="Common workflows" icon="graduation-cap" href="/en/common-workflows">
    Step-by-step guides for typical tasks
  </Card>
</CardGroup>
