# Quickstart

> Welcome to CCL!

This quickstart guide will have you using AI-powered coding assistance in a few minutes. By the end, you'll understand how to use CCL for common development tasks.

## Before you begin

Make sure you have:

* A terminal or command prompt open
* A code project to work with
* A MargayAI account, a configured gateway token, or access through a [supported cloud provider](/en/third-party-integrations)

<Note>
  This guide covers the terminal CLI. CCL is also available on the [web](https://ccl.ai/code), as a desktop app, in [VS Code](/en/vs-code) and [JetBrains IDEs](/en/jetbrains), in [Slack](/en/slack), and in CI/CD with [GitHub Actions](/en/github-actions) and [GitLab](/en/gitlab-ci-cd). See [all interfaces](/en/overview#use-ccl-code-everywhere).
</Note>

## Step 1: Install CCL

To install CCL, use one of the following methods:

<Tabs>
  <Tab title="Native Install (Recommended)">
    **macOS, Linux, WSL:**

    ```bash theme={null}
    curl -fsSL https://ccl.ai/install.sh | bash
    ```

    **Windows PowerShell:**

    ```powershell theme={null}
    irm https://ccl.ai/install.ps1 | iex
    ```

    **Windows CMD:**

    ```batch theme={null}
    curl -fsSL https://ccl.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
    ```

    <Info>
      Native installations automatically update in the background to keep you on the latest version.
    </Info>
  </Tab>

  <Tab title="Homebrew">
    ```bash theme={null}
    brew install --cask ccl-code
    ```

    <Info>
      Homebrew installations do not auto-update. Run `brew upgrade ccl-code` periodically.
    </Info>
  </Tab>

  <Tab title="WinGet">
    ```powershell theme={null}
    winget install MargayAI.CCL
    ```

    <Info>
      WinGet installations do not auto-update. Run `winget upgrade MargayAI.CCL` periodically.
    </Info>
  </Tab>
</Tabs>

## Step 2: Log in to your account

CCL requires an account to use. Start an interactive session with the `ccl` command and you'll be prompted to log in on first use:

```bash theme={null}
ccl
```

For MargayAI accounts, gateway tokens, or compatible provider accounts, follow the prompts to complete authentication in your browser or terminal. To switch accounts later or re-authenticate, type `/login` inside the running session:

```text theme={null}
/login
```

Once logged in, your credentials are stored and you won't need to log in again.

## Step 3: Start your first session

Open your terminal in any project directory and start CCL:

```bash theme={null}
cd /path/to/your/project
ccl
```

You'll see the CCL prompt with the version, current model, and working directory shown above it. Type `/help` for available commands or `/resume` to continue a previous conversation.

## Step 4: Ask your first question

Let's start with understanding your codebase. Try one of these commands:

```text theme={null}
what does this project do?
```

```text theme={null}
what technologies does this project use?
```

```text theme={null}
where is the main entry point?
```

```text theme={null}
explain the folder structure
```

## Step 5: Make your first code change

Now let's make CCL do some actual coding. Try a simple task:

```text theme={null}
add a hello world function to the main file
```

CCL will:

1. Find the appropriate file
2. Show you the proposed changes
3. Ask for your approval
4. Make the edit

<Note>
  CCL always asks for permission before modifying files. You can approve individual changes or enable "Accept all" mode for a session.
</Note>

## Step 6: Use the Ralph-Lisa Loop for structured collaboration

For complex tasks where you want structured review, CCL offers the **Ralph-Lisa Loop** — a turn-based dual-agent collaboration protocol.

### Initialize a task

```bash theme={null}
ccl init "Implement user authentication with OAuth2"
```

This creates the `.dual-agent/` directory and starts the session.

### Check whose turn it is

```bash theme={null}
ccl whose-turn
```

- `ralph` → Ralph is working. Read Lisa's feedback and continue.
- `lisa` → Lisa is reviewing. Wait for her feedback.

### Submit work as Ralph

```bash theme={null}
cat > .dual-agent/submit.md << 'EOF'
[PLAN]

Implement OAuth2 login with Google and GitHub providers.

### Approach
1. Add OAuth2 strategy module
2. Integrate with existing auth middleware
3. Write tests for token exchange and refresh

### Test plan
- npm test --prefix auth
- Coverage: token exchange, refresh, error handling
EOF

ccl submit-ralph --file .dual-agent/submit.md
```

Lisa will review your plan and respond with `[PASS]` or `[NEEDS_WORK]`.

### Read Lisa's feedback

```bash theme={null}
ccl read review.md
```

Address her feedback and submit `[CODE]` with real test results.

### Learn more

See [Getting Started with the Ralph-Lisa Loop](/en/getting-started-rll) for a full walkthrough.

## Step 7: Use Git with CCL

CCL makes Git operations conversational:

```text theme={null}
what files have I changed?
```

```text theme={null}
commit my changes with a descriptive message
```

```text theme={null}
create a new branch called feature/quickstart
```

```text theme={null}
show me the last 5 commits
```

## Step 8: Fix a bug or add a feature

CCL is effective at debugging and feature implementation.

```text theme={null}
add input validation to the user registration form
```

```text theme={null}
there's a bug where users can submit empty forms - fix it
```

CCL will:

* Locate the relevant code
* Understand the context
* Implement a solution
* Run tests if available

## Step 9: Test out other common workflows

**Refactor code**

```text theme={null}
refactor the authentication module to use async/await instead of callbacks
```

**Write tests**

```text theme={null}
write unit tests for the calculator functions
```

**Update documentation**

```text theme={null}
update the README with installation instructions
```

**Code review with the Ralph-Lisa Loop**

```text theme={null}
review my changes and suggest improvements. Use the Ralph-Lisa Loop.
```

<Tip>
  Talk to CCL like you would a helpful colleague. Describe what you want to achieve, and it will help you get there.
</Tip>

## Essential commands

Here are the most important commands for daily use.

**Shell commands**

| Command | What it does | Example |
|---------|--------------|---------|
| `ccl` | Start interactive mode | `ccl` |
| `ccl "task"` | Run a one-time task | `ccl "fix the build error"` |
| `ccl -p "query"` | Run one-off query, then exit | `ccl -p "explain this function"` |
| `ccl -c` | Continue most recent conversation | `ccl -c` |
| `ccl -r` | Resume a previous conversation | `ccl -r` |
| `ccl init "task"` | Initialize Ralph-Lisa Loop | `ccl init "add OAuth2"` |
| `ccl start` | Start the RLL session | `ccl start` |
| `ccl whose-turn` | Check whose turn it is | `ccl whose-turn` |

**Session commands**

| Command | What it does | Example |
|---------|--------------|---------|
| `/clear` | Clear conversation history | `/clear` |
| `/help` | Show available commands | `/help` |
| `/exit` or Ctrl+D | Exit CCL | `/exit` |
| `/check-turn` | Check RLL turn | `/check-turn` |
| `/submit-work` | Submit work in RLL | `/submit-work "[CODE] ..."` |
| `/read-review` | Read Lisa's feedback | `/read-review` |

See the [CLI reference](/en/cli-reference) for the complete list.

## Pro tips for beginners

For more, see [best practices](/en/best-practices) and [common workflows](/en/common-workflows).

<AccordionGroup>
  <Accordion title="Be specific with your requests">
    Instead of: "fix the bug"

    Try: "fix the login bug where users see a blank screen after entering wrong credentials"
  </Accordion>

  <Accordion title="Use step-by-step instructions">
    Break complex tasks into steps:

    ```text theme={null}
    1. create a new database table for user profiles
    2. create an API endpoint to get and update user profiles
    3. build a webpage that allows users to see and edit their information
    ```
  </Accordion>

  <Accordion title="Let CCL explore first">
    Before making changes, let CCL understand your code:

    ```text theme={null}
    analyze the database schema
    ```
  </Accordion>

  <Accordion title="Save time with shortcuts">
    * Type `/` to see all commands and skills
    * Use Tab for command completion
    * Press ↑ for command history
    * Press `Shift+Tab` to cycle permission modes
  </Accordion>
</AccordionGroup>

## What's next?

Now that you've learned the basics, explore more advanced features:

<CardGroup cols={2}>
  <Card title="How CCL works" icon="microchip" href="/en/how-ccl-works">
    Understand the agentic loop, built-in tools, and architecture
  </Card>

  <Card title="Ralph-Lisa Loop" icon="arrows-spin" href="/en/ralph-lisa-loop">
    Structured dual-agent collaboration protocol
  </Card>

  <Card title="Common workflows" icon="graduation-cap" href="/en/common-workflows">
    Step-by-step guides for typical tasks
  </Card>

  <Card title="Extend CCL" icon="puzzle-piece" href="/en/features-overview">
    Customize with CCL.md, skills, hooks, MCP, and more
  </Card>
</CardGroup>
