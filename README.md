# Termux Bootstrap

This repository contains a simple script to bootstrap a new Termux environment with essential tools.

## Features

- Updates and upgrades Termux packages.
- Installs **Git**.
- Installs **Fish Shell** and sets it as default.
- Installs **Node.js** (required for Gemini).
- Installs **Gemini CLI** (`@google/gemini-cli`).
- Installs **Neofetch** & **Figlet** for a custom terminal look.
- Configures Fish with `command-not-found` handler and auto-Neofetch.
- Requests **Termux Storage Access**.
- Removes the default Termux MOTD.

## Usage

### Option 1: Clone and Run (Requires Git)

If you already have `git` installed:

```bash
git clone https://github.com/MuathAmer/termux-bootstrap.git
cd termux-bootstrap
chmod +x setup.sh
./setup.sh
```

### Option 2: One-Liner (Requires Curl)

If you don't have `git` but have `curl`:

```bash
pkg install curl -y
bash <(curl -s https://raw.githubusercontent.com/MuathAmer/termux-bootstrap/main/setup.sh)
```

## After Installation



- **Restart Termux** to apply changes and enter the Fish shell automatically.

- Type `gemini` to start using the Gemini AI assistant.



## Credits



- This project integrates configuration logic and ideas from [termux-fish](https://github.com/msn-05/termux-fish) for the Fish shell setup.


