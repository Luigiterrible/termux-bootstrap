#!/data/data/com.termux/files/usr/bin/bash

# Termux Bootstrap Script

echo "[-] Updating package lists and upgrading existing packages..."
pkg update -y && pkg upgrade -y

echo "[-] Installing essential packages (git, fish, nodejs, figlet, neofetch)..."
pkg install git fish nodejs figlet neofetch -y

echo "[-] Setting up Termux storage access..."
echo "    (You may need to grant permission in the popup)"
termux-setup-storage

echo "[-] Installing Gemini CLI..."
npm install -g @google/gemini-cli

echo "[-] Configuring Fish Shell..."
mkdir -p ~/.config/fish
CONFIG_FILE=~/.config/fish/config.fish

# Add command-not-found handler and neofetch to config if not present
if ! grep -q "command-not-found" "$CONFIG_FILE" 2>/dev/null; then
    cat << 'EOF' >> "$CONFIG_FILE"

function __fish_command_not_found_handler --on-event fish_command_not_found
    /data/data/com.termux/files/usr/libexec/termux/command-not-found $argv[1]
end

function cls
    clear
end

neofetch
EOF
fi

echo "[-] Setting Fish as default shell..."
chsh -s fish

echo "[-] Removing Termux welcome message (MOTD)..."
if [ -f "$PREFIX/etc/motd" ]; then
    rm "$PREFIX/etc/motd"
fi

echo "[-] Configuration complete!"
echo "    Restart Termux to see the changes."
