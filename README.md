# Image Transform

A desktop application for creative image transformations, built with Tauri v2, React 19, and Rust.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Desktop**: Tauri v2
- **Backend**: Rust
- **Styling**: CSS Modules

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) for your OS

### Windows: Rust and linker setup

1. **Set default Rust toolchain** (if you see “no default is configured”):
   ```bash
   rustup default stable
   ```

2. **MSVC linker (`link.exe` not found)**  
   The Windows MSVC target needs Visual Studio’s C++ build tools. Use either:

   - **Option A (recommended):** Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) and select the **“Desktop development with C++”** workload. This installs the MSVC compiler and linker.

   - **Option B:** Use the GNU toolchain instead of MSVC:
     ```bash
     rustup default stable-x86_64-pc-windows-gnu
     ```
     You must have [MinGW-w64](https://www.mingw-w64.org/) installed and on your `PATH`.

## Setup

```bash
npm install
```

## Development

```bash
npm run tauri dev
```

## Build

```bash
npm run tauri build
```

## Troubleshooting

- **“rustup could not choose a version of cargo”**  
  Run: `rustup default stable`

- **“linker `link.exe` not found” (Windows)**  
  Install Visual Studio Build Tools with the “Desktop development with C++” workload, or switch to the GNU toolchain (see [Windows: Rust and linker setup](#windows-rust-and-linker-setup) above).

- **Vite “spawn EPERM” when loading config**  
  If this happens in a restricted environment (e.g. some terminals or sandboxes), run `npm run tauri dev` in a normal terminal with full permissions.

## Project Structure

- `src/` – React frontend (Vite)
- `src-tauri/` – Tauri Rust backend
