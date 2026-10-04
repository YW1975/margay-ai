# Installation and Updates

> This page is maintained as public documentation source. It describes CCL binary installation, update checks, and installation diagnostics.

<!-- section: purpose -->
## Purpose

The npm package `@margay/ccl-core` exposes the `margay` command. Some existing distributions also provide a separate `ccl` launcher. The examples on other pages may use that launcher; substitute `margay` when using the npm package.

<!-- section: capabilities -->
## Capabilities

- Install a stable, latest, or explicit target build with `margay install [target]`.
- Force a reinstall only when intentionally replacing a local installation.
- Check and apply updates with the update or upgrade command surfaces available in the installed build.
- Run `margay doctor` to inspect runtime health, package-manager state, shell integration, updater status, sandbox signals, and workspace trust.
- Verify the current executable with `margay --version` and `margay --help`.
- Install release tarballs with the target host's package manager when a tarball is the distribution artifact.

<!-- section: operational-model -->
## Operational model

Installation commands change the local runtime, not the project. They should not be used as extension points or as a substitute for authentication setup. Installing a new binary does not rewrite `~/.ccl/settings.json`, `~/.ccl/gateway.json`, OAuth state, project `CCL.md`, `.ccl/settings.json`, memory files, or existing session transcripts.

The install command resolves a target channel or explicit version, runs the native installer, checks launcher and shell integration, cleans up older package-manager installs when appropriate, cleans stale shell aliases, and saves `autoUpdatesChannel` only when the user explicitly selected `latest` or `stable`.

`margay doctor` is the right first tool when a command cannot start, resolves to the wrong executable, or behaves differently across shells. A healthy install report is stronger evidence than guessing from a package-manager cache.

<!-- section: configuration -->
## Configuration and commands

| Task | Command | Notes |
| --- | --- | --- |
| Confirm current binary | `margay --version` | The top-level CLI reports the version as the running CCL build. |
| Inspect command surface | `margay --help` | Use the installed build's help as the final source for available flags. |
| Install target build | `margay install [latest|stable|version]` | Target may be a channel or explicit version supported by the installer. |
| Reinstall intentionally | `margay install --force [target]` | Use only when replacing a known install, not as a routine fix. |
| Update local binary | `margay update` or `margay upgrade` | Availability and behavior can differ by build and channel. |
| Diagnose environment | `margay doctor` | Collect its output before changing PATH, shell aliases, or package-manager state. |
| Install tarball | `npm install -g ./margay-ccl-core-<version>.tgz` | Use the package manager appropriate for the host and artifact. |

As of 2026-10-04, the `1.4.5-rc.1` source candidate has been validated and installed locally through both commands. This delivery did not publish rc.1 to npm. A plain npm install uses the registry default tag and must not be assumed to install this candidate. Check each command actually present on your PATH; package-manager metadata can differ from a separately managed launcher.

<!-- section: recovery-rc1 -->
## Recovery and output limits in rc.1

Before replacing an installation, preserve its original launcher and payload and record how to restore them. Use the rollback instructions supplied with that installation; a local validation receipt does not imply that a generic rollback command ships in the npm package.

```bash
margay --version
```

[Error recovery and user consent](error-recovery.md)

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
