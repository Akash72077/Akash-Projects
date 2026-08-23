@echo off
setlocal
cd /d "%~dp0"
title CivicPulse AI - Full Stack

echo ===============================================
echo          CivicPulse AI - Full Stack
echo ===============================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed or not available in PATH.
  echo Install Node.js 20 or newer, then run this file again.
  pause
  exit /b 1
)

if not exist "backend\node_modules\express" (
  echo [1/2] Installing backend packages...
  call npm install --prefix backend
  if errorlevel 1 goto :install_error
) else (
  echo [1/2] Backend packages already installed.
)

if not exist "frontend\node_modules\vite" (
  echo [2/2] Installing frontend packages...
  call npm install --prefix frontend
  if errorlevel 1 goto :install_error
) else (
  echo [2/2] Frontend packages already installed.
)

echo.
echo Starting CivicPulse AI...
echo Frontend: http://localhost:5173
echo Backend : http://localhost:5000
echo.
call npm run dev
pause
exit /b 0

:install_error
echo.
echo Package installation failed. Check your internet connection and npm setup.
pause
exit /b 1
