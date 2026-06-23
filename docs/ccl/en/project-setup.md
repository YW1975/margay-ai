# Project Setup

> Understand how CCL configures and tracks projects through the `.ccl/` directory, gate manifests, and presets.

CCL stores project-specific configuration in a `.ccl/` directory at your project root. This directory controls workflow automation, local permissions, task tracking, and quality gate configuration. This guide covers the directory structure, the `gate-manifest.json` system, the preset framework, and the CLI commands used to initialize and synchronize projects.

---

## The `.ccl/` directory

The `.ccl/` directory is where CCL persists project-level state and configuration. It is created automatically when you run `ccl init` and is safe to commit to version control (excluding any personal settings you choose to keep private).

### Directory structure

```
.ccl/
├── goal-marker.json          # Persistent goal tracking for the current task
├── settings.local.json         # Local permissions and environment overrides
└── workflows/                  # Workflow automation scripts
    └── task-orchestrator.js    # AI task orchestration workflow
```

---

## `.ccl/goal-marker.json`

The goal marker file stores the current task's objective in a structured format. It is read at the start of each session to recover context after compaction or when resuming a session.

```json
{
  "goal": "Add OAuth2 login to the authentication module",
  "created_at": "2026-06-22T10:00:00Z",
  "updated_at": "2026-06-22T14:30:00Z",
  "status": "in_progress"
}
```

This file ensures that even if the conversation context is lost, the agent can recover the original intent and continue without requiring the user to restate the goal.

---

## `.ccl/workflows/`

The `workflows/` directory contains JavaScript workflow files that CCL can invoke via the `ccl skill` command. These workflows are self-contained automation scripts that run in the CCL harness.

### `task-orchestrator.js`

The built-in task orchestrator workflow manages the full lifecycle of task intake, analysis, storage, and reporting:

| Phase | Purpose |
|-------|---------|
| **S1-intake** | Ingest content from direct input, documents, or external integrations |
| **S2-analyze** | Extract tasks, deadlines, priorities, and dependencies using an AI agent |
| **S3-store** | Persist tasks as event streams (`.jsonl`) and maintain an index |
| **S4-detect** | Detect overdue, stale, and blocked tasks |
| **S5-recommend** | Generate top-3 priorities and actionable suggestions |
| **S6-report** | Produce weekly or ad-hoc reports in Markdown |

Task data is stored under `.ccl/tasks/` as append-only JSONL event streams, with an `index.json` for fast lookup. The workflow passes data between phases in memory, avoiding redundant disk reads.

To invoke the workflow:

```bash
ccl skill task-orchestrator --source_type direct_input --content "Fix the login bug by Friday"
```

---

## `.ccl/settings.local.json`

This file stores local overrides for permissions, environment variables, and agent behavior. It is scoped to the current machine and user, making it ideal for personal preferences that should not be shared across the team.

```json
{
  "permissions": {
    "allow": [
      "Bash(mkdir -p .ccl/workflows)",
      "Bash(cp ~/templates/task-orchestrator.js .ccl/workflows/)"
    ]
  },
  "env": {
    "RL_POLICY_MODE": "warn"
  }
}
```

Settings are merged with global `~/.ccl/settings.json` and organization-level policies. Local settings take precedence for the current project.

---

## `gate-manifest.json`

The `gate-manifest.json` file lives at the project root and defines the quality gate configuration for the Ralph-Lisa loop. It is the source of truth for tier whitelists, project type, and baseline expectations.

### Project type

The `project_type` field hints the default baseline tier set for the project archetype:

| Type | Expected tiers | Typical use case |
|------|---------------|------------------|
| `cli` | unit, integration | Command-line tools and scripts |
| `web-app` | unit, smoke, integration | Browser-based applications |
| `mobile-app` | unit, e2e | iOS and Android applications |
| `library` | unit | Reusable packages and SDKs |
| `service` | unit, integration, security | Backend services and APIs |

Set the project type with:

```bash
ccl gate-manifest --type cli
```

### `default_baseline`

The `default_baseline` array lists the tiers that are expected for the project's archetype. It is used during the `[TDD-PLAN]` review to verify that the planned test coverage matches the project's needs.

```json
{
  "project_type": "cli",
  "default_baseline": ["unit", "integration"]
}
```

If the manifest's `default_baseline` is missing tiers expected by the archetype, the system emits a `project-type-tier-mismatch` warning at submission time. You should either add the missing tiers or explicitly opt out with `RL_PROJECT_TYPE_TIERS_OFF=1`.

### `canonical_tier_ids`

The `canonical_tier_ids` array is the whitelist of valid tier IDs. Any tier referenced in a complexity judgment or test plan that is not in this list blocks `complexity-verify` and prevents submission.

```json
{
  "canonical_tier_ids": ["unit", "integration", "e2e", "security", "smoke"]
}
```

Update this whitelist intentionally when adding new quality tiers. Never bypass it.

---

## Preset system

Presets are pre-configured quality gate templates that enforce specific audit rules per project type. They live in the CCL CLI templates directory and are referenced by key.

### Available presets

| Preset key | Description |
|------------|-------------|
| `cli-cmd` | Command-line utilities with argument parsing and exit codes |
| `cli-schema` | Schema-validated CLI tools (JSON, YAML, config files) |
| `desktop` | Desktop applications with UI state and file I/O |
| `mobile` | Mobile apps with platform-specific APIs and lifecycle |
| `web-ui` | Browser-based frontends with DOM and visual regression |
| `plugin` | Editor/IDE plugins with extension APIs |
| `platform-server-cmd` | Platform server commands with deployment and rollback |

### Preset audit

When a project has `preset.enabled=true` configured, the preset audit runs during Lisa's review. It produces structured `Narrow[]` findings covering four audit kinds:

| Audit kind | Description |
|------------|-------------|
| **omission** | A required tier is missing from the Test Results section |
| **fake-evidence** | A tier is present but the command or result is empty, placeholder, or template-only |
| **weak-oracle** | The test oracle is tautological (e.g., "test passes" without verbs like *proves*, *demonstrates*, or *covers*) |
| **threshold-missing** | A numeric tier (performance, stability) lacks a threshold value |

Run the preset audit manually:

```bash
ccl preset audit --file .dual-agent/work.md --preset cli-cmd --json
```

The audit is additive: it does not remove any existing review requirements. If the audit returns an empty array, the review proceeds normally without preset-specific narrows.

### Preset teardown

Presets that involve spawning processes, tmux sessions, or daemons may include an optional `teardown` field. If a spawn-class preset lacks teardown, `loadPresetByNameWithDiagnostics()` returns a warning. This is enforced to prevent resource leaks during test runs.

---

## Initialization

### `ccl init "<task>"`

Initialize a new CCL project in the current directory. This command:

1. Creates the `.ccl/` directory structure
2. Writes `goal-marker.json` with the provided task description
3. Copies default workflows (e.g., `task-orchestrator.js`) into `.ccl/workflows/`
4. Creates a starter `CCL.md` if one does not exist
5. Generates a `gate-manifest.json` with sensible defaults based on detected project type

```bash
ccl init "Add OAuth2 login to the authentication module"
```

After initialization, you can start the Ralph-Lisa loop with `ccl start`.

---

## Project synchronization

### `ccl sync-project`

Synchronize the current project with upstream templates and configuration. This command:

1. Fetches the latest workflow templates from the CCL installation
2. Updates `.ccl/workflows/` if newer versions are available
3. Validates `gate-manifest.json` against the current schema
4. Reports any missing or deprecated configuration keys
5. Optionally updates `CCL.md` with new best-practice sections

```bash
ccl sync-project
```

Use this after upgrading CCL to ensure your project benefits from new features, workflow improvements, and updated preset definitions. The command is safe to run repeatedly: it never overwrites local customizations without prompting.

---

## Quick reference

```bash
# Initialize a new project
ccl init "<task description>"

# Synchronize with upstream templates
ccl sync-project

# Set project type in gate manifest
ccl gate-manifest --type <cli|web-app|mobile-app|library|service>

# Run preset audit
ccl preset audit --file .dual-agent/work.md --preset <key> --json

# Invoke the task orchestrator workflow
ccl skill task-orchestrator --source_type direct_input --content "<task>"
```
