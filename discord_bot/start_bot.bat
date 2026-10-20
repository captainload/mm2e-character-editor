@echo off
setlocal enabledelayedexpansion
title MM2E Discord Relay Bot
chcp 65001 >nul

echo ======================================================================
echo   Mutants & Masterminds 2E VTT - Discord Relay Bot Launcher
echo ======================================================================
echo.

:: Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js was not found on your system!
    echo.
    echo To run this bot, you need Node.js (v16.9 or newer).
    echo Please download and install it from: https://nodejs.org/
    echo.
    echo After installing, restart this script.
    echo.
    pause
    exit /b 1
)

:: Check for npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm was not found on your system!
    echo Please ensure npm is installed and in your system PATH.
    echo.
    pause
    exit /b 1
)

:: Check dependencies
if not exist node_modules (
    echo [INFO] First-time setup detected. Installing dependencies...
    echo Running: npm install
    echo.
    call npm install
    if !errorlevel! neq 0 (
        echo.
        echo [ERROR] npm install encountered an error.
        echo Please ensure you have an active internet connection.
        echo.
        pause
        exit /b 1
    )
    echo [INFO] Dependencies installed successfully!
    echo.
)

:: Check configuration
if not exist .env (
    if exist .env.example (
        copy .env.example .env >nul
        echo [INFO] Created .env from template.
        echo.
        echo [IMPORTANT] Please open .env in a text editor (Notepad, VS Code) and:
        echo   1. Set DISCORD_TOKEN to your bot token from Discord Developer Portal
        echo   2. Set CHANNEL_ID to your game channel ID
        echo.
        pause
    )
)

echo [INFO] Starting Discord Relay Bot...
echo [INFO] Local Bridge will listen on port 18820 (default).
echo.
node bot.js

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Bot exited with error code %errorlevel%.
    echo.
    pause
)
