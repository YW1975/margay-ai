# 安装与更新

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 以 `@margay/ccl-core` 包中的 `ccl` 二进制分发，并提供 native 安装、更新检查、内部构建回滚支持和环境诊断命令。

<!-- section: capabilities -->
## 能力范围

- 使用 `ccl install [target]` 安装 stable、latest 或指定版本。
- 使用 `ccl update` 或 `ccl upgrade` 检查并应用更新。
- 使用 `ccl doctor` 检查更新器和运行时健康状态。

<!-- section: operational-model -->
## 运行模型

- 安装命令属于运维命令，不是扩展点。帮助中标记为内部用途的命令不应作为公开自动化接口使用。

<!-- section: configuration -->
## 配置与命令

- 相关命令：`install`、`update`、`upgrade`、`doctor`，以及启用时的内部 rollback 辅助命令。

## 包版本与 Tarball

当前公开 CCL 构建以 `@margay/ccl-core` 发布；1.2.23 包暴露 `ccl` 二进制，`ccl --version` 会显示 `1.2.23 (CCL)`。

如果以 tarball 分发，在目标主机上用对应包管理器安装，例如 `npm install -g ./margay-ccl-core-1.2.23.tgz`。tarball 只包含编译后的运行时和公开包文件；`~/.ccl/settings.json`、`~/.ccl/gateway.json`、OAuth 状态和项目 memory 文件都留在目标主机本地，不能靠重新打包修复。


<!-- section: source-evidence -->
## 源码依据

- `package.json`
- `main.tsx`
- `commands/upgrade/upgrade.tsx`
- `commands/doctor/doctor.tsx`

<!-- section: related -->
## 相关页面

- [快速开始](quickstart.md)
- [配置与设置](configuration.md)
- [故障排查](troubleshooting.md)
