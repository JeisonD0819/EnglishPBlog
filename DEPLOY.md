# GitHub Pages Deployment Guide

## Why Your Page is Blank

The most common reason: **Wrong `base` path in `vite.config.ts`**

When deploying to `https://USERNAME.github.io/REPO-NAME/`, Vite needs to know the subdirectory so it generates correct asset paths (CSS, JS, images).

---

## Quick Fix (3 Steps)

### 1. Update `vite.config.ts`

Open `vite.config.ts` and replace `YOUR-REPO-NAME` with your **actual repository name**:

```ts
// vite.config.ts
const REPO_NAME = 'mmr-robot-blog'  // ← Your repo name here (no .git)
export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
})
```

**Examples:**
| Your GitHub Repo URL | REPO_NAME value |
|---------------------|-----------------|
| `github.com/JeisonDiaz/mmr-robot-blog` | `'mmr-robot-blog'` |
| `github.com/JeisonDiaz/EnglishProyect` | `'EnglishProyect'` |
| `github.com/MyUser/my-robot-project` | `'my-robot-project'` |

### 2. Build & Deploy

**Option A: Using npm script (recommended)**
```bash
npm run deploy
```

**Option B: Manual steps**
```bash
npm run build
npx gh-pages -d dist
```

### 3. Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages** (left sidebar)
2. Under **Build and deployment** → **Source**: Select **"Deploy from a branch"**
3. **Branch**: Select `gh-pages` / `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes, then visit: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## Troubleshooting

### Still blank after deploy?
1. **Hard refresh**: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
2. Check browser console for 404 errors on assets
3. Verify `base` path matches repo name **exactly** (case-sensitive!)

### 404 on CSS/JS files?
Your `base` path is wrong. Check the Network tab - if it requests `/assets/index.css` instead of `/REPO-NAME/assets/index.css`, fix the base path.

### Images not loading?
Images in `public/images/` are copied to `dist/images/` during build. The `ScrollExpansionImage` component uses `/images/IM1.JPG` which becomes `/REPO-NAME/images/IM1.JPG` with correct base path.

### Custom domain?
Add a `CNAME` file to `public/` with your domain:
```
echo "blog.yourdomain.com" > public/CNAME
```
Then redeploy.

---

## Automated Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in repo Settings → Pages → Source: **"GitHub Actions"**

---

## Checklist Before Deploy

- [ ] `REPO_NAME` in `vite.config.ts` matches GitHub repo name exactly
- [ ] `npm run build` completes without errors
- [ ] `dist` folder contains `index.html`, `assets/`, `images/`
- [ ] GitHub Pages source set to `gh-pages` branch
- [ ] Waited 2-3 minutes for propagation

---

## Local Preview of Production Build

```bash
npm run build
npm run preview
```
Opens at `http://localhost:4173/REPO-NAME/` (with correct base path)