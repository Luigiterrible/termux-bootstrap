#!/data/data/com.termux/files/usr/bin/bash

# ==============================================================================
# Termux Bootstrap CLI (tb) v2.6.0
# The Swiss Army Knife for your Termux Environment.
# ==============================================================================

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# --- Commands ---

cmd_help() {
    echo -e "\n${PURPLE}============================================${NC}"
    echo -e "${PURPLE}       TERMUX BOOTSTRAP SHORTCUTS           ${NC}"
    echo -e "${PURPLE}============================================${NC}"
    
    echo -e "${GREEN}[Media]${NC}"
    echo -e "  ${CYAN}video${NC}   : Download video to /sdcard/Download"
    echo -e "  ${CYAN}music${NC}   : Smart Spotify download (+Lyrics/LRC)"
    
    echo -e "\n${GREEN}[AI]${NC}"
    echo -e "  ${CYAN}whisper${NC} : AI Speech-to-Text (Offline)"
    echo -e "  ${CYAN}ask${NC}     : Ask AI (Supports piping: echo '...' | ask 'Summary')"
    
    echo -e "\n${GREEN}[Git]${NC}"
    echo -e "  ${CYAN}g${NC}       : git shortcut"
    echo -e "  ${CYAN}gl${NC}      : Pretty, narrow git log for mobile"
    
    echo -e "\n${GREEN}[System]${NC}"
    echo -e "  ${CYAN}up${NC}      : pkg update && upgrade"
    echo -e "  ${CYAN}in${NC}      : pkg install"
    echo -e "  ${CYAN}open${NC}    : Open file in Android app"
    echo -e "  ${CYAN}serve${NC}   : Start web server in current dir"
    echo -e "  ${CYAN}copy${NC}    : Pipe to Android clipboard"
    echo -e "  ${CYAN}paste${NC}   : Paste from Android clipboard"
    echo -e "  ${CYAN}c${NC}       : Clear screen"
    
    echo -e "\n${GREEN}[CLI Manager]${NC}"
    echo -e "  ${CYAN}tb update${NC} : Update System + Bootstrap"
    echo -e "  ${CYAN}tb help${NC}   : Show this guide"
    
    echo -e "\n${YELLOW}Tip: Type 'tb <command>' to manage your environment.${NC}\n"
}

cmd_update() {
    echo -e "${BLUE}[-] Updating System Packages...${NC}"
    pkg update -y && pkg upgrade -y -o Dpkg::Options::=\"--force-confdef\" -o Dpkg::Options::=\"--force-confold\"

    if command -v npm &> /dev/null; then
        echo -e "${BLUE}[-] Updating NPM Global Packages...${NC}"
        npm update -g
    fi

    if command -v pip &> /dev/null; then
        echo -e "${BLUE}[-] Updating Python Tools...${NC}"
        pip install --upgrade yt-dlp spotdl 2>/dev/null
    fi

    if [ -d "$HOME/termux-whisper/.git" ]; then
        echo -e "${BLUE}[-] Updating Termux Whisper...${NC}"
        (cd "$HOME/termux-whisper" && git pull)
    fi

    if [ -d "$HOME/termux-bootstrap/.git" ]; then
        echo -e "${BLUE}[-] Updating Termux Bootstrap...${NC}"
        (cd "$HOME/termux-bootstrap" && git pull)
    fi

    echo -e "${GREEN}[OK] Upgrade Complete!${NC}"
}

# --- Main Dispatch ---

case "$1" in
    update)
        cmd_update
        ;;
    help|*)
        cmd_help
        ;;
esac
