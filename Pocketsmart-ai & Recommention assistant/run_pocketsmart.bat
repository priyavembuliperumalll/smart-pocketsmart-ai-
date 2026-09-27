@echo off
title PocketSmart AI
cd /d "%~dp0"
py -m uvicorn main:app --host 127.0.0.1 --port 8000
pause
