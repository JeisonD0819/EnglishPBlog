#!/bin/bash
# GitHub Pages Deployment Script
# Run this after updating REPO_NAME in vite.config.ts

set -e

echo "🚀 Building for GitHub Pages..."
npm run build

echo "📦 Deploying to gh-pages branch..."
npx gh-pages -d dist

echo "✅ Deployed! Check your GitHub Pages URL:"
echo "   https://USERNAME.github.io/REPO-NAME/"