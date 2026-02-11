#!/bin/bash

echo "🔄 Stopping all dev servers..."
pkill -f "vite"

echo "🧹 Clearing Vite cache..."
rm -rf node_modules/.vite

echo "🧹 Clearing dist folder..."
rm -rf dist

echo "✨ Starting fresh dev server..."
npm run dev -- --host 0.0.0.0 --force
