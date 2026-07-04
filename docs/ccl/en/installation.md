# Installation and Updates

> This page is maintained as public documentation source. It describes CCL binary installation, update checks, and installation diagnostics.

<!-- section: purpose -->
## Purpose

CCL is distributed as the `ccl` binary from the `@margay/ccl-core` package. Installation docs must separate three concerns: installing or replacing the binary, configuring shell access to that binary, and preserving user-local state such as settings, gateway files, account tokens, project memory, and session transcripts.

<!-- section: capabilities -->
## Capabilities

- Install a stable, latest, or explicit target build with `ccl install [target]`.
- Force a reinstall only when intentionally replacing a local installation.
- Check and apply updates with the update or upgrade command surfaces available in the installed build.
- Run `ccl doctor` to inspect runtime health, package-manager state, shell integration, updater status, sandbox signals, and workspace trust.
- Verify the current executable with `ccl --version` and `ccl --help`.
- Install release tarballs with the target host's package manager when a tarball is the distribution artifact.

<!-- section: operational-model -->
## Operational model

Installation commands change the local runtime, not the project. They should not be used as extension points or as a substitute for authentication setup. Installing a new binary does not rewrite `~/.ccl/settings.json`, `~/.ccl/gateway.json`, OAuth state, project `CCL.md`, `.ccl/settings.json`, memory files, or existing session transcripts.

The install command resolves a target channel or explicit version, runs the native installer, checks launcher and shell integration, cleans up older package-manager installs when appropriate, cleans stale shell aliases, and saves `autoUpdatesChannel` only when the user explicitly selected `latest` or `stable`.

`ccl doctor` is the right first tool when a command cannot start, resolves to the wrong executable, or behaves differently across shells. A healthy install report is stronger evidence than guessing from a package-manager cache.

<!-- section: configuration -->
## Configuration and commands

| Task | Command | Notes |
| --- | --- | --- |
| Confirm current binary | `ccl --version` | The top-level CLI reports the version as the running CCL build. |
| Inspect command surface | `ccl --help` | Use the installed build's help as the final source for available flags. |
| Install target build | `ccl install [latest|stable|version]` | Target may be a channel or explicit version supported by the installer. |
| Reinstall intentionally | `ccl install --force [target]` | Use only when replacing a known install, not as a routine fix. |
| Update local binary | `ccl update` or `ccl upgrade` | Availability and behavior can differ by build and channel. |
| Diagnose environment | `ccl doctor` | Collect its output before changing PATH, shell aliases, or package-manager state. |
| Install tarball | `npm install -g ./margay-ccl-core-<version>.tgz` | Use the package manager appropriate for the host and artifact. |

Current public package metadata identifies the package as `@margay/ccl-core` and version `1.3.0`. Do not hard-code an older version in setup scripts; verify with the installed `ccl --version` when diagnosing a user machine.

<!-- section: source-evidence -->
## Source evidence

- `package.json` defines package name `@margay/ccl-core`, current package version, and the public package metadata.
- `main.tsx` registers `-v, --version`, top-level help, print mode, and the subcommand registration path used outside ordinary print mode.
- `commands/install.tsx` resolves the requested target, calls the native installer, checks shell setup, cleans older package-manager installs, cleans old aliases, records warnings, and saves the selected update channel when appropriate.
- `utils/nativeInstaller/installer.ts` and `utils/nativeInstaller/index.ts` provide native installation and installation-health helpers.
- `commands/doctor/doctor.tsx` and `utils/doctorDiagnostic.ts` provide installation and runtime health diagnostics.

<!-- section: related -->
## Related pages

- [Quickstart](quickstart.md)
- [Configuration and Settings](configuration.md)
- [Environment Variables](env-vars.md)
- [Troubleshooting](troubleshooting.md)
- [CLI Reference](cli-reference.md)
