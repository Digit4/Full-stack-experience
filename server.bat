@echo off
REM Setup and start backend + frontend

echo Installing backend dependencies...
cd backend
npm install

echo Installing frontend dependencies...
cd ..\frontend
npm install

echo Starting backend and frontend in new windows...

cd ..
start cmd /k "cd backend && npm dev"
start cmd /k "cd frontend && npm dev"

