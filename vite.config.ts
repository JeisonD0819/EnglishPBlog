import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CHANGE THIS: Replace 'YOUR-REPO-NAME' with your actual GitHub repository name
// Example: if your repo is github.com/JeisonDiaz/mmr-blog → base: '/mmr-blog/'
const REPO_NAME = 'EnglishPBlog'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
})