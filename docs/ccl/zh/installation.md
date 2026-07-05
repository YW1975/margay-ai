# 安装与更新

> 本页作为公开文档源维护。它说明 CCL 二进制安装、更新检查和安装诊断。

<!-- section: purpose -->
## Purpose

CCL 以 `@margay/ccl-core` 包中的 `ccl` 二进制分发。安装文档必须区分三件事：安装或替换二进制、配置 shell 对该二进制的访问，以及保留用户本地状态，例如 settings、gateway file、账号 token、项目 memory 和 session transcript。

<!-- section: capabilities -->
## Capabilities

- 用 `ccl install [target]` 安装 stable、latest 或明确版本的构建。
- 只有在有意替换本地安装时，才强制 reinstall。
- 用当前构建提供的 update 或 upgrade 命令面检查并应用更新。
- 用 `ccl doctor` 检查运行时健康、包管理器状态、shell 集成、更新器状态、sandbox 信号和 workspace trust。
- 用 `ccl --version` 与 `ccl --help` 验证当前可执行文件。
- 当 release 以 tarball 分发时，使用目标主机的 package manager 安装。

<!-- section: operational-model -->
## Operational model

安装命令会改变本地运行时，不会改变项目。它们不应当作扩展点，也不能替代认证配置。安装新二进制不会重写 `~/.ccl/settings.json`、`~/.ccl/gateway.json`、OAuth state、项目 `CCL.md`、`.ccl/settings.json`、memory files 或现有 session transcripts。

Install 命令会解析目标 channel 或明确版本，运行 native installer，检查 launcher 和 shell 集成，在适当时清理旧的 package-manager 安装，清理过期 shell aliases，并且只有用户明确选择 `latest` 或 `stable` 时才保存 `autoUpdatesChannel`。

当命令无法启动、解析到错误 executable，或不同 shell 行为不一致时，`ccl doctor` 是第一诊断工具。健康的 install report 比根据 package-manager cache 猜测更可靠。

<!-- section: configuration -->
## Configuration and commands

| 任务 | 命令 | 说明 |
| --- | --- | --- |
| 确认当前二进制 | `ccl --version` | 顶层 CLI 输出正在运行的 CCL build 版本。 |
| 检查命令面 | `ccl --help` | 以当前安装构建的 help 作为可用 flags 的最终来源。 |
| 安装目标构建 | `ccl install [latest|stable|version]` | Target 可以是 installer 支持的 channel 或明确版本。 |
| 有意重装 | `ccl install --force [target]` | 只在替换已知安装时使用，不作为常规修复。 |
| 更新本地二进制 | `ccl update` 或 `ccl upgrade` | 可用性和行为可能随 build 与 channel 不同。 |
| 诊断环境 | `ccl doctor` | 修改 `PATH`、shell aliases 或 package-manager 状态前先收集输出。 |
| 安装 tarball | `npm install -g ./margay-ccl-core-<version>.tgz` | 使用适合目标主机和 artifact 的 package manager。 |

当前公开 package metadata 标识包名为 `@margay/ccl-core`，版本为 `1.3.1`。不要在 setup scripts 中硬编码更旧版本；诊断用户机器时，以已安装的 `ccl --version` 为准。

<!-- section: source-evidence -->
## Source evidence

- `package.json` 定义 package name `@margay/ccl-core`、当前 package version 和公开 package metadata。
- `main.tsx` 注册 `-v, --version`、顶层 help、print mode，以及普通 print mode 外使用的子命令注册路径。
- `commands/install.tsx` 解析请求 target，调用 native installer，检查 shell setup，清理旧 package-manager 安装，清理旧 aliases，记录 warnings，并在适当时保存选择的 update channel。
- `utils/nativeInstaller/installer.ts` 与 `utils/nativeInstaller/index.ts` 提供 native installation 和 installation-health helpers。
- `commands/doctor/doctor.tsx` 与 `utils/doctorDiagnostic.ts` 提供安装和运行时健康诊断。

<!-- section: related -->
## Related pages

- [快速开始](quickstart.md)
- [配置与设置](configuration.md)
- [环境变量](env-vars.md)
- [故障排查](troubleshooting.md)
- [CLI 参考](cli-reference.md)
