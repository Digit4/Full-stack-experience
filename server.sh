#!/bin/bash
# Setup and start backend + frontend
set -e

echo "Installing backend dependencies..."
cd backend
npm install

echo "Installing frontend dependencies..."
cd ../frontend
npm install

cd ..
gnome-terminal -- bash -c "cd backend && npm dev; exec bash" &

gnome-terminal -- bash -c "cd frontend && npm dev; exec bash" &
