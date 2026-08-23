@echo off
cd /d "%~dp0"
call npm install --prefix backend
call npm install --prefix frontend
echo.
echo Installation complete. Run RUN-CIVICPULSE.cmd to start the app.
pause
