# Installation and Updates

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL is distributed as the `ccl` binary from the `@margay/ccl-core` package and includes commands for native installation, update checks, rollback support in internal builds, and environment diagnostics.

<!-- section: capabilities -->
## Capabilities

- Install a stable, latest, or explicit target build with `ccl install [target]`.
- Check and apply updates with `ccl update` or `ccl upgrade`.
- Inspect updater and runtime health with `ccl doctor`.

<!-- section: operational-model -->
## Operational model

- Installation commands are operational commands, not extension points. Treat internal-only commands marked in help as unsupported for public automation.

<!-- section: configuration -->
## Configuration and commands

- Relevant commands: `install`, `update`, `upgrade`, `doctor`, and internal rollback helpers where enabled.

<!-- section: source-evidence -->
## Source evidence

- `package.json`
- `main.tsx`
- `commands/upgrade/upgrade.tsx`
- `commands/doctor/doctor.tsx`

<!-- section: related -->
## Related pages

- [Quickstart](quickstart.md)
- [Configuration and Settings](configuration.md)
- [Troubleshooting](troubleshooting.md)
