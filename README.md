# Electron, Typescript, Vite, Vue, TailwindCSS Starter

A modern, type-safe Electron starter template with Vite, Vue, and TailwindCSS.

![CI](https://github.com/awe-templates/electron-vite-starter/workflows/test/badge.svg)
![Dependency Version](https://img.shields.io/github/package-json/dependency-version/awe-templates/electron-vite-starter/dev/electron)
![Dependency Version](https://img.shields.io/github/package-json/dependency-version/awe-templates/electron-vite-starter/dev/typescript)
![Dependency Version](https://img.shields.io/github/package-json/dependency-version/awe-templates/electron-vite-starter/dev/vite)
![Dependency Version](https://img.shields.io/github/package-json/dependency-version/awe-templates/electron-vite-starter/dev/vitest)
![Dependency Version](https://img.shields.io/github/package-json/dependency-version/awe-templates/electron-vite-starter/dev/postcss)

- [Electron Vite Starter](#electron-vite-starter)
  - [✨ Features](#-features)
  - [🔒 Security Features](#-security-features)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development](#development)
    - [Building](#building)
    - [Testing](#testing)
    - [Linting \& Formatting](#linting--formatting)
  - [🔌 Type-Safe IPC Communication](#-type-safe-ipc-communication)
    - [Defining IPC Routes](#defining-ipc-routes)
    - [Registering Handlers (Main Process)](#registering-handlers-main-process)
    - [Exposing API (Preload Script)](#exposing-api-preload-script)
    - [Using in Renderer Process](#using-in-renderer-process)
  - [🗺️ Path Aliases](#️-path-aliases)
  - [🔄 Development Workflow](#-development-workflow)
  - [📝 Conventional Commits](#-conventional-commits)
    - [Commit Message Format](#commit-message-format)
    - [Allowed Types](#allowed-types)
    - [Examples](#examples)
    - [Git Hooks](#git-hooks)
  - [📂 Directory Organization](#-directory-organization)
  - [⚠️ Error Handling](#️-error-handling)
  - [💻 VSCode Integration](#-vscode-integration)
  - [📦 Package Scripts](#-package-scripts)
  - [🏗️ Building for Distribution](#️-building-for-distribution)
    - [Prerequisites](#prerequisites-1)
    - [Build Configuration](#build-configuration)
    - [Packaging Commands](#packaging-commands)
    - [Build Outputs](#build-outputs)
    - [Customizing the Build](#customizing-the-build)
    - [Code Signing](#code-signing)
  - [📄 License](#-license)
  - [🤝 Contributing](#-contributing)

## ✨ Features

- **[Electron](https://electronjs.org/)** - Latest stable version for cross-platform desktop apps
- **[TypeScript](https://www.typescriptlang.org/)** - Full type safety with strict mode enabled
- **[Vite](https://vite.dev/)** - Lightning-fast build tool with HMR
- **[@egoist/tipc](https://github.com/egoist/tipc)** - Type-safe IPC communication
- **[@electron-toolkit](https://github.com/alex8088/electron-toolkit)** - Utilities for Electron development (utils, preload, tsconfig)
- **[ESLint](https://eslint.org/)** - Code linting with flat config
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Vitest](https://vitest.dev/)** - Fast unit testing with Electron API mocks
- **[PostCSS](https://postcss.org/)** - CSS processing with Autoprefixer
- **[Commitlint](https://commitlint.js.org/)** - Conventional commit message validation
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for automated quality checks
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD workflow for automated testing across platforms

## 🔒 Security Features

This template follows Electron security best practices:

- ✅ Context isolation enabled
- ✅ Node integration disabled in renderer
- ✅ Preload script with controlled API exposure
- ✅ Content Security Policy (CSP) headers
- ✅ Navigation and window creation restrictions
- ✅ External links open in default browser
- ✅ Single instance lock

## 📁 Project Structure

```txt
electron-vite-starter/
├── electron/              # Electron-specific code
│   ├── main/              # Main process
│   │   ├── main.ts        # Entry point
│   │   ├── window.ts      # Window management
│   │   ├── menu.ts        # Application menu
│   │   └── ipc.ts         # IPC handlers
│   ├── preload/           # Preload scripts
│   │   └── preload.ts     # API exposure
│   └── shared/            # Shared IPC definitions
│       └── ipc.ts         # IPC route definitions
├── src/                   # Application code (renderer)
│   ├── index.html         # HTML template
│   ├── main.ts            # TypeScript entry point
│   └── styles.css         # Styles
├── types/                 # Type definitions
│   └── vite-env.d.ts      # Vite and Electron API types
├── tests/                 # Test files
│   ├── setup.ts           # Test setup and mocks
│   ├── main/              # Main process tests
│   └── renderer/          # Renderer process tests
├── build/                 # Build resources
│   ├── README.md          # Icon setup instructions
│   ├── icon.icns          # macOS icon (add this)
│   ├── icon.ico           # Windows icon (add this)
│   └── icons/             # Linux icons (add these)
├── .scripts/              # Build scripts
│   └── dev.mjs            # Development script
├── .github/               # GitHub configuration
│   └── workflows/         # CI/CD workflows
│       └── ci.yml         # Continuous integration
├── .husky/                # Git hooks
│   ├── pre-commit         # Pre-commit hook (lint, type-check, test)
│   └── commit-msg         # Commit message validation
├── vite.main.config.ts    # Vite config for main process
├── vite.renderer.config.ts # Vite config for renderer
├── tsconfig.json          # Base TypeScript config
├── tsconfig.main.json     # Main process TS config
├── tsconfig.renderer.json # Renderer process TS config
├── electron-builder.yml   # electron-builder config
├── eslint.config.mjs      # ESLint flat config
├── commitlint.config.mjs  # Commitlint config
├── .prettierrc            # Prettier config
├── .gitattributes         # Git attributes for consistent line endings
└── vitest.config.ts       # Vitest config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22 or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone or download this template
git clone <repository-url>

# Install dependencies
pnpm install
```

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

This will:

1. Start Vite dev server for the renderer process (<http://localhost:5173>)
2. Build and watch the main process
3. Launch Electron with DevTools open

### Building

Build for production:

```bash
pnpm build
```

This creates optimized builds for both main and renderer processes in the `dist/` directory.

### Testing

Run tests:

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui
```

### Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check formatting
pnpm format:check

# Type check
pnpm type-check
```

## 🔌 Type-Safe IPC Communication

This template uses [@egoist/tipc](https://github.com/egoist/tipc) for fully type-safe IPC communication.

### Defining IPC Routes

Define your IPC routes in `electron/shared/ipc.ts`:

```typescript
import { tipc } from '@egoist/tipc/main';
import os from 'os';

export const router = {
  // Get app version
  getAppVersion: tipc.create().procedure.action(async () => {
    const { app } = await import('electron');
    return app.getVersion();
  }),

  // Complex query with structured response
  getSystemInfo: tipc
    .create()
    .procedure.action(async () => {
      return {
        platform: os.platform(),
        arch: os.arch(),
        version: os.release(),
        hostname: os.hostname(),
      };
    }),
};

export type AppRouter = typeof router;
```

### Registering Handlers (Main Process)

Register the router in `electron/main/ipc.ts`:

```typescript
import { registerIpcMain } from '@egoist/tipc/main';
import { router } from '@shared/ipc';

// Register IPC handlers
registerIpcMain(router);
```

### Exposing API (Preload Script)

The preload script (`electron/preload/preload.ts`) creates a type-safe client and exposes individual methods to the renderer:

```typescript
import { contextBridge, ipcRenderer } from 'electron';
import { createClient } from '@egoist/tipc/renderer';
import type { AppRouter } from '@shared/ipc';

// Create type-safe IPC client
const api = createClient<AppRouter>({
  ipcInvoke: ipcRenderer.invoke.bind(ipcRenderer),
});

// Expose individual API methods (Proxy objects cannot be cloned by contextBridge)
contextBridge.exposeInMainWorld('electronAPI', {
  api: {
    getAppVersion: () => api.getAppVersion(),
    saveData: (input: { key: string; value: unknown }) => api.saveData(input),
    getSystemInfo: () => api.getSystemInfo(),
    getVersions: () => api.getVersions(),
  },
  platform: process.platform,
});
```

### Using in Renderer Process

Use the exposed API in your TypeScript code:

```typescript
// Fully type-safe! TypeScript knows the parameter and return types
const version = await window.electronAPI.api.getAppVersion();
console.log('App version:', version);

// Example with button
const button = document.getElementById('my-button');
button?.addEventListener('click', async () => {
  const info = await window.electronAPI.api.getSystemInfo();
  console.log(info);
});
```

## 🗺️ Path Aliases

The following path aliases are configured:

- `@main/*` → `electron/main/*`
- `@app/*` → `src/*`
- `@shared/*` → `electron/shared/*`
- `@preload/*` → `electron/preload/*`
- `@types/*` → `types/*`

Example usage:

```typescript
// In Electron code
import { router } from '@shared/ipc';
import { createMainWindow } from '@main/window';

// Import types
import type { ElectronAPI } from '@preload/preload';
```

## 🔄 Development Workflow

1. **Add new IPC routes**: Define routes in `electron/shared/ipc.ts`
2. **Implement handlers**: Add handlers in `electron/main/ipc.ts`
3. **Use in renderer**: Call the type-safe API from your TypeScript code in `src/`
4. **Test**: Write tests in `tests/` directory
5. **Build**: Run `pnpm build` for production

## 📝 Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with automated validation via commitlint and husky.

### Commit Message Format

```markdown
<type>(<optional scope>): <subject>

<optional body>

<optional footer>
```

### Allowed Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `build` - Build system or dependency changes
- `ci` - CI configuration changes
- `chore` - Other changes that don't modify src or test files
- `revert` - Reverts a previous commit

### Examples

```bash
feat: add dark mode toggle
fix(auth): resolve login timeout issue
docs: update README with installation steps
test: add unit tests for IPC handlers
```

### Git Hooks

The project uses husky to run automated checks:

- **pre-commit**: Runs `pnpm lint`, `pnpm type-check`, and `pnpm test` before allowing commits
- **commit-msg**: Validates commit messages follow conventional commit format

## 📂 Directory Organization

- **`electron/`** - All Electron-specific code (main process, preload, IPC definitions)
- **`src/`** - Your application code (renderer process, UI, business logic)
- **`tests/`** - Test files mirroring the structure
- **`.scripts/`** - Build and development scripts

## ⚠️ Error Handling

Example of error handling in IPC:

```typescript
// In electron/shared/ipc.ts
saveData: tipc
  .create()
  .procedure.input<{ key: string; value: unknown }>()
  .action(async ({ input }) => {
    try {
      await saveToDatabase(input.key, input.value);
      return { success: true, message: 'Saved successfully' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }),

// Renderer process
const result = await window.electronAPI.api.saveData({
  key: 'myKey',
  value: 'myValue',
});

if (result.success) {
  console.log('Success:', result.message);
} else {
  console.error('Error:', result.message);
}
```

## 💻 VSCode Integration

Recommended extensions (defined in `.vscode/extensions.json`):

- ESLint
- Prettier
- TypeScript
- Vitest

Settings are pre-configured in `.vscode/settings.json` for:

- Format on save
- Auto-fix ESLint issues
- TypeScript workspace version

## 📦 Package Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm build:main` | Build main process only |
| `pnpm build:renderer` | Build renderer process only |
| `pnpm package` | Build and package for current platform |
| `pnpm package:mac` | Build and package for macOS |
| `pnpm package:win` | Build and package for Windows |
| `pnpm package:linux` | Build and package for Linux |
| `pnpm test` | Run all tests |
| `pnpm test:ui` | Run tests with UI |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm type-check` | Run TypeScript compiler checks |

## 🏗️ Building for Distribution

This template comes with electron-builder pre-configured for packaging and distributing your application.

### Prerequisites

Before building for distribution, you need to provide application icons. See [`build/README.md`](build/README.md) for detailed instructions on creating and adding icons for each platform.

### Build Configuration

The electron-builder configuration is already set up in `electron-builder.yml` with sensible defaults:

- **appId**: `com.electron.app` (change this to your app's identifier)
- **productName**: `Electron Vite Starter` (change this to your app's name)
- **Output directory**: `release/`
- **Build resources**: `build/` (place icons here)

### Packaging Commands

```bash
# Package for current platform
pnpm package

# Package for specific platforms
pnpm package:mac     # Creates DMG and ZIP for macOS
pnpm package:win     # Creates NSIS installer and portable EXE for Windows
pnpm package:linux   # Creates AppImage and DEB for Linux
```

### Build Outputs

After packaging, you'll find the installers in the `release/` directory:

**macOS**

- `.dmg` - Disk image installer
- `.zip` - Compressed application

**Windows**

- `.exe` - NSIS installer
- `.exe` (portable) - Standalone executable

**Linux**

- `.AppImage` - Universal Linux application
- `.deb` - Debian package

### Customizing the Build

Edit `electron-builder.yml` to customize your build configuration:

```yaml
appId: com.yourcompany.yourapp
productName: Your App Name
copyright: Copyright © 2025 Your Company

mac:
  category: public.app-category.productivity

win:
  target:
    - nsis
    - portable
    - zip

linux:
  target:
    - AppImage
    - deb
    - rpm
  category: Utility
```

### Code Signing

For production releases, you should code sign your applications:

**macOS**: Set up Apple Developer certificates and add to `electron-builder.yml`:

```yaml
mac:
  identity: Developer ID Application: Your Name (TEAM_ID)
```

**Windows**: Obtain a code signing certificate and configure in `electron-builder.yml`:

```yaml
win:
  certificateFile: path/to/cert.pfx
  certificatePassword: password
```

See [electron-builder documentation](https://www.electron.build/) for comprehensive configuration options and platform-specific details.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
