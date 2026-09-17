# Using CCL and Duo in VS Code

<!-- section: availability -->
<a id="guide-availability"></a>
## Current interface and verification limits

Updated 2026-09-17. Start with the same CCL terminal interface inside the IDE's integrated terminal. `/ide` connects editor capabilities; it does not convert terminal chat into a native graphical chat panel.

| Route | Verification status |
| --- | --- |
| Terminal Duo in the installed development build | Three real headed scenarios passed, totaling 46 steps |
| CCL connection to VS Code | Handshake, advertised service capabilities, and actual connection verified with a temporary environment variable |
| Default IDE connection | `bufferUtil.mask is not a function` reproduced; not fixed |
| Complete Duo flow in the VS Code integrated terminal | Instructions below; the observed handshake came from external WezTerm, and the complete integrated-terminal flow remains unverified |
| Trae, native CCL/Duo chat panels, session migration | Unverified; VS Code connectivity does not establish compatibility |

The Duo development build displays `1.4.0-beta.0`; that does not mean the npm package with that version contains the new features. Check that your build supports `/duo-agent`.

<!-- section: setup -->
<a id="guide-setup"></a>
## Prepare VS Code

You need VS Code, the `code` shell command, and the compatible IDE service provided by the official `anthropic.claude-code` extension. The tested extension version was 2.1.274.

CCL discovers services in `~/.ccl/ide` by default. The extension must receive the same configuration directory when the IDE starts. The following example uses separate user-data and extension directories. Enter your project directory first:

```sh
CLAUDE_CONFIG_DIR="$HOME/.ccl" CCL_CONFIG_DIR="$HOME/.ccl" \
  code --user-data-dir "$HOME/.local/share/ccl/ide-profile/user-data" \
  --extensions-dir "$HOME/.local/share/ccl/ide-profile/extensions" \
  --install-extension anthropic.claude-code

CLAUDE_CONFIG_DIR="$HOME/.ccl" CCL_CONFIG_DIR="$HOME/.ccl" \
  code --new-window \
  --user-data-dir "$HOME/.local/share/ccl/ide-profile/user-data" \
  --extensions-dir "$HOME/.local/share/ccl/ide-profile/extensions" "$PWD"
```

Installation obtains the currently available extension, which may differ from the tested version. If you customized `CCL_CONFIG_DIR`, set both variables to that directory. Do not copy lock files, tokens, or raw sessions to assemble a connection.

If `code` is unavailable, install the shell command from VS Code's command palette. A running IDE may keep its previous environment. Save your files, close this separate profile's windows, and launch it with the command above.

<!-- section: terminal -->
<a id="guide-terminal"></a>
## Start in the integrated terminal

1. Open the same project in VS Code and CCL. If another CCL is already connected to this VS Code instance, select `None` in its `/ide` menu or exit it; the current interface indicates one CCL connection at a time.
2. Choose “Terminal → New Terminal.” Confirm that your shell resolves the intended CCL development build, then run:

```sh
command -v ccl
WS_NO_BUFFER_UTIL=1 ccl --ide
```

3. If it is not selected automatically, run `/ide` in CCL and select Visual Studio Code.
4. Configure both models in the same terminal interface, then enter your task:

```text
/model
/duo-agent
/duo --reviewer-model <fixed-model-id>
```

Replace the placeholder with an available model ID. Duo can wait without a goal. See the [Duo guide](duo.md) for pause and counter-review rules.

<!-- section: troubleshooting -->
<a id="guide-troubleshooting"></a>
## Troubleshoot connectivity

`WS_NO_BUFFER_UTIL=1` uses the JavaScript WebSocket implementation for this process, bypassing the reproduced optional native-module error. It does not fix the default behavior or permanently change your environment or installed package. No Gateway change is needed.

If no IDE is found, check the project, configuration directory, and extension startup. A successful handshake proves connectivity only: this check did not invoke each IDE tool, send a real-model task, or verify the complete integrated-terminal Duo flow.

<!-- section: native-panels -->
<a id="guide-native-panels"></a>
## Can chat move into a native panel?

The official Claude Code and Codex extensions each provide a native chat interface. The Claude Code extension can share session history with its official CLI. The Codex extension supports a sidebar, file context, and change review. See the [Claude Code documentation](https://code.claude.com/docs/en/vs-code) and [Codex documentation](https://developers.openai.com/codex/ide/).

Those are capabilities of the respective official products. Using an existing panel with CCL, supporting multiple models and Duo input/pause/challenge/resume, and migrating current chat all require separate verification. A dedicated Duo panel and session-migration solution have not been delivered.

<!-- section: related -->
<a id="guide-related"></a>
## Continue reading

- [Duo: Peer Collaboration](duo.md)
- [Interactive Sessions](interactive-sessions.md)
- [Installation and Updates](installation.md)
- [Troubleshooting](troubleshooting.md)
