# GitHub Pages Deployment Script for Windows
# Run this after updating REPO_NAME in vite.config.ts

Write-Host "🚀 Building for GitHub Pages..." -ForegroundColor Green
npm run build

Write-Host "📦 Deploying to gh-pages branch..." -ForegroundColor Green
npx gh-pages -d dist

Write-Host "✅ Deployed! Check your GitHub Pages URL:" -ForegroundColor Green
Write-Host "   https://USERNAME.github.io/REPO-NAME/" -ForegroundColor Cyan