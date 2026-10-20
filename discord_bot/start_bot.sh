#!/usr/bin/env bash
# Mutants & Masterminds 2E VTT - Discord Relay Bot Launcher for Linux/macOS

echo "======================================================================"
echo "  Mutants & Masterminds 2E VTT - Discord Relay Bot Launcher"
echo "======================================================================"
echo ""

# Check for node
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js was not found on your system!"
    echo "Please install Node.js (v16.9 or newer) from https://nodejs.org/"
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm was not found on your system!"
    exit 1
fi

# Install dependencies if missing
if [ ! -d "node_modules" ]; then
    echo "[INFO] First-time setup: installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed."
        exit 1
    fi
    echo "[INFO] Dependencies installed successfully!"
    echo ""
fi

# Setup .env if missing
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "[INFO] Created .env from template."
        echo "[IMPORTANT] Please edit .env with your DISCORD_TOKEN and CHANNEL_ID before running."
        exit 0
    fi
fi

echo "[INFO] Starting Discord Relay Bot..."
node bot.js
