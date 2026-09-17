# 在 VS Code 中使用 CCL 与 Duo

<!-- section: availability -->
<a id="guide-availability"></a>
## 当前可用方式与验证边界

更新于 2026-09-17。先在 IDE 集成终端中使用 CCL 的同一个终端界面。`/ide` 连接编辑器能力，不会把终端聊天转换成原生图形聊天面板。

| 路径 | 验证状态 |
| --- | --- |
| 已安装开发构建的终端 Duo | 三项真实有头场景共 46 步通过 |
| CCL 连接 VS Code | 临时环境变量下已验证握手、服务能力和实际连接 |
| 默认 IDE 连接 | 已复现 `bufferUtil.mask is not a function`，尚未修复 |
| VS Code 集成终端中的 Duo 全流程 | 以下为操作步骤；本轮实际握手来自外部 WezTerm，尚未独立验收完整流程 |
| Trae、CCL/Duo 原生聊天面板、会话迁移 | 尚未验证，不由 VS Code 连接结果推定兼容 |

此 Duo 开发构建虽显示 `1.4.0-beta.0`，不代表 npm 同版本已包含新功能。先确认自己的构建支持 `/duo-agent`。

<!-- section: setup -->
<a id="guide-setup"></a>
## 准备 VS Code

需要 VS Code、可用的 `code` 命令和官方 `anthropic.claude-code` 扩展提供的兼容 IDE 服务。本次实测扩展版本为 2.1.274。

CCL 默认在 `~/.ccl/ide` 发现服务；扩展需要在 IDE 启动时取得相同配置目录。下面使用独立的用户数据及扩展目录，先进入项目目录，再执行：

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

安装命令取得的是当前可用扩展，不保证恰为实测版本。若自定义 `CCL_CONFIG_DIR`，将两个变量都改成该实际目录。不要复制锁文件、token 或原始会话来拼接连接。

如果找不到 `code`，先在 VS Code 命令面板安装 shell 命令。已运行的 IDE 可能沿用旧环境；先保存文件并关闭这个独立配置的窗口，再用上述命令启动。

<!-- section: terminal -->
<a id="guide-terminal"></a>
## 在集成终端启动

1. 确认 VS Code 和 CCL 打开同一项目。若另一 CCL 已连接这个 VS Code，先在其 `/ide` 菜单选择 `None` 或退出它；当前界面提示一次连接一个 CCL。
2. 选择“终端 → 新建终端”。确认 shell 解析到你想使用的 CCL 开发构建，运行：

```sh
command -v ccl
WS_NO_BUFFER_UTIL=1 ccl --ide
```

3. 如未自动选中，在 CCL 中执行 `/ide` 并选择 Visual Studio Code。
4. 在同一终端界面配置双方模型，再输入任务：

```text
/model
/duo-agent
/duo --reviewer-model <固定模型ID>
```

将占位符替换为实际可用模型 ID。Duo 无目标时可以待命，暂停和反审规则见 [Duo 指南](duo.md)。

<!-- section: troubleshooting -->
<a id="guide-troubleshooting"></a>
## 连接问题怎样处理

`WS_NO_BUFFER_UTIL=1` 让本次进程使用 WebSocket 的 JavaScript 实现，绕过已复现的可选原生模块错误。它不是默认行为的修复，也不会永久修改环境或安装包；无需修改 Gateway。

若找不到 IDE，先检查项目与配置目录是否一致、扩展是否已启动。成功握手只证明服务连接：本轮没有逐项调用 IDE 工具或发送真实模型任务，也没有完整验收集成终端中的 Duo 流程。

<!-- section: native-panels -->
<a id="guide-native-panels"></a>
## 能直接切到聊天面板吗

Claude Code 官方扩展和 Codex 官方扩展各自提供原生聊天界面。Claude Code 官方扩展可与官方 CLI 共享会话历史；Codex 官方扩展支持侧边栏、文件上下文与修改审查。详见 [Claude Code 官方说明](https://code.claude.com/docs/en/vs-code) 和 [Codex 官方说明](https://developers.openai.com/codex/ide/)。

这些是各自官方产品的能力。现有扩展是否能作为 CCL 的后端入口，是否兼容多模型、Duo 的意见/暂停/挑战/恢复，以及如何迁移当前聊天，均需要单独验证。当前没有已交付的专用 Duo 面板或会话迁移方案。

<!-- section: related -->
<a id="guide-related"></a>
## 继续阅读

- [Duo：对等双 Agent 协作](duo.md)
- [交互式会话](interactive-sessions.md)
- [安装与更新](installation.md)
- [故障排查](troubleshooting.md)
