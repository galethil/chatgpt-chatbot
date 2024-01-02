#!/bin/bash

# verify if node dependencies are installed
if [ ! -d "node_modules" ]; then
  npm install
fi

# verify if node dependencies are installed
cd backend
if [ ! -d "node_modules" ]; then
  npm install
fi
cd ..

# verify if node dependencies are installed
cd ui
if [ ! -d "node_modules" ]; then
  npm install
fi
cd ..

cd backend
if [ ! -f .env ]; then
  cp .env.example .env
fi
cd ..

# verify if docker is working
if docker ps | tr -d '\n' | grep -Evq 'CONTAINER|mongo'; then
  echo "Docker is probably not running"
  exit 1
fi

echo "App is starting..."

npm run start-app

