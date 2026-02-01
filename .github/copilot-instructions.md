# Copilot Instructions for ImageAI

## Architecture Overview

This is a **Tauri v2** desktop application for image transformations with a clear frontend/backend split:

- **Frontend** (`src/`): React 19 + TypeScript + Vite — handles UI and user interactions
- **Backend** (`src-tauri/`): Rust — handles native capabilities and image processing
- **IPC Bridge**: Tauri commands (Rust) ↔ `@tauri-apps/api` (TypeScript)

The Rust entry point delegates to `app_lib::run()` in [src-tauri/src/lib.rs](src-tauri/src/lib.rs), which configures Tauri plugins and runs the app.

## Development Commands

```bash
npm start              # Start dev mode (equivalent to npm run tauri dev)
npm run tauri build    # Production build
```

Note: `npm run dev` starts **only** Vite without Tauri. Always use `npm start` for full desktop development.

## Code Conventions

### Frontend (TypeScript/React)

- **CSS Modules**: Each component has a co-located `.module.css` file (e.g., `Header.tsx` → `Header.module.css`)
- **Component structure**: Functional components with default exports
- **Styling pattern**: Use CSS custom properties for theming (see `--header-bg`, `--header-color` in [Header.module.css](src/components/Header.module.css))
- **Strict TypeScript**: `noUnusedLocals`, `noUnusedParameters` enabled — clean up unused code

### Backend (Rust)

- **Crate name**: `app_lib` (defined in [Cargo.toml](src-tauri/Cargo.toml))
- **Windows subsystem**: `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]` hides console in release
- **Tauri commands**: Add via `.invoke_handler(tauri::generate_handler![command_name])` in `lib.rs`

## Adding New Features

### New Tauri Command (Rust → JS)

1. Define in [src-tauri/src/lib.rs](src-tauri/src/lib.rs):
   ```rust
   #[tauri::command]
   fn my_command(arg: String) -> Result<String, String> { ... }
   ```
2. Register: `.invoke_handler(tauri::generate_handler![my_command])`
3. Call from frontend: `import { invoke } from "@tauri-apps/api/core"; await invoke("my_command", { arg: "value" });`

### New React Component

1. Create `src/components/MyComponent.tsx` and `src/components/MyComponent.module.css`
2. Follow existing pattern: default export, CSS Module import as `styles`

## Tauri Permissions

Capabilities are declared in [src-tauri/capabilities/default.json](src-tauri/capabilities/default.json). Currently enabled:

- `core:default` — base Tauri APIs
- `shell:allow-open` — open URLs/files externally

To add new permissions (e.g., file system access), update this file.

## Key Files

| Purpose                            | Path                                             |
| ---------------------------------- | ------------------------------------------------ |
| Tauri config (window size, app ID) | `src-tauri/tauri.conf.json`                      |
| Rust dependencies                  | `src-tauri/Cargo.toml`                           |
| Frontend dependencies              | `package.json`                                   |
| Vite/build config                  | `vite.config.ts`                                 |
| App entry                          | `src/main.tsx` → `src/App.tsx`                   |
| Rust entry                         | `src-tauri/src/main.rs` → `src-tauri/src/lib.rs` |
