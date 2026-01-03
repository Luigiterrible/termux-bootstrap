#!/data/data/com.termux/files/usr/bin/bash

# ==============================================================================
# Termux Bootstrap Universal Updater
# Shell-agnostic script to update all components.
# ==============================================================================

# --- Colors ---
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# --- Helper ---
log_step() { echo -e "${BLUE}[-] $1...${NC}"; }

# --- Main Update Logic ---

log_step "Updating System Packages"
pkg update -y && pkg upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"

if command -v npm &> /dev/null; then
    log_step "Updating NPM Global Packages (Gemini, etc)"
    npm update -g
fi

if command -v pip &> /dev/null; then
    log_step "Updating Python Tools (yt-dlp, spotdl)"
    pip install --upgrade yt-dlp spotdl 2>/dev/null
fi

if [ -d "$HOME/termux-whisper/.git" ]; then
    log_step "Updating Termux Whisper"
    # Run in a subshell to avoid changing current directory
    (cd "$HOME/termux-whisper" && git pull)
fi

if [ -d "$HOME/termux-bootstrap/.git" ]; then
    log_step "Updating Termux Bootstrap"
    (cd "$HOME/termux-bootstrap" && git pull)
fi

echo -e "${GREEN}[OK] Upgrade Complete!${NC}"
