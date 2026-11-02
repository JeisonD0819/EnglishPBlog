# MMR Robot Blog - Project Documentation

## Project Overview

This is a **React + TypeScript + Vite** blog project documenting the development of a **Mobile Manipulator Robot (MMR)** as a final degree project. The blog showcases the journey from an incomplete mobile platform to a fully integrated robot through 9 stages of design, manufacturing, and assembly.

**Project Name:** `mmr-robot-blog`  
**Repository:** GitHub Pages deployment at `/EnglishPBlog/`  
**Framework:** React 18, TypeScript, Vite  
**Styling:** Tailwind CSS with custom design system  
**Animations:** Framer Motion  
**Deployment:** GitHub Pages via `gh-pages` package

---

## Project Structure

```
blog-project/
├── public/
│   └── images/           # Static images (IM1.JPG - IM9.JPG, RobotVideo.mp4)
├── src/
│   ├── components/
│   │   ├── ScrollExpansionImage.tsx  # Interactive scroll-based image expansion
│   │   └── VideoPlayer.tsx           # Custom video player with hover autoplay
│   ├── App.tsx           # Main application with all blog sections
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles + Tailwind imports
│   └── vite-env.d.ts     # TypeScript declarations
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration with custom theme
├── vite.config.ts        # Vite config with GitHub Pages base path
├── tsconfig.json         # TypeScript config
├── tsconfig.node.json    # TypeScript config for Node
├── postcss.config.js     # PostCSS config
├── deploy.sh / deploy.ps1 # Deployment scripts
└── DEPLOY.md             # Deployment documentation
```

---

## Key Technologies & Dependencies

### Production Dependencies
- **react** ^18.3.1 - UI framework
- **react-dom** ^18.3.1 - React DOM renderer
- **framer-motion** ^11.3.30 - Animation library

### Development Dependencies
- **@vitejs/plugin-react** ^4.3.1 - Vite React plugin
- **typescript** ^5.5.4 - TypeScript compiler
- **vite** ^5.3.5 - Build tool
- **tailwindcss** ^3.4.7 - Utility-first CSS
- **autoprefixer** ^10.4.19 - CSS vendor prefixes
- **postcss** ^8.4.40 - CSS processor
- **gh-pages** ^6.1.1 - GitHub Pages deployment
- **@types/react** ^18.3.3 - React type definitions
- **@types/react-dom** ^18.3.0 - React DOM type definitions

---

## Design System

### Color Palette (Tailwind Config)

**Ink (Neutral/Grayscale):**
- `ink-50` to `ink-950` - Warm grays from `#fafafa` to `#09090b`

**Accent (Warm Orange/Amber):**
- `accent-50` to `accent-950` - Warm oranges from `#fdf8f3` to `#39150a`
- Primary brand color: `accent-500` (`#db742e`)

### Typography
- **Sans:** Inter (system-ui fallback) - UI text, body copy
- **Display:** Playfair Display (Georgia fallback) - Headlines, titles

### Custom Animations (Tailwind)
- `animate-fade-in` - Fade in
- `animate-slide-up` - Slide up from bottom
- `animate-slide-in-left` - Slide in from left
- `animate-slide-in-right` - Slide in from right

---

## Application Architecture

### Main Components

#### `App.tsx` - Root Component
- **State:** `scrollY` for navbar background transition
- **Sections:** 9 content sections defined as data array
- **Layout:** Fixed navbar → Hero header → Main content sections → Footer
- **Navigation:** Smooth scroll to section anchors
- **Scroll Effects:** Navbar backdrop blur on scroll, intersection observer for section animations

#### Section Data Structure
Each section contains:
```typescript
{
  id: string;           // Anchor ID
  title: string;        // Main heading
  subtitle?: string;    // Optional subtitle
  content: string;      // Paragraphs separated by \n\n
  images?: Image[];     // Image objects with src, alt, title, caption
  videos?: Video[];     // Video objects with src, poster, title, caption, autoplay, loop, muted, controls
  afterImages?: string; // Text to show after images
}
```

#### `ScrollExpansionImage.tsx`
- **Props:** src, alt, title?, caption?, className?, preserveAspectRatio?
- **Features:**
  - Scroll-based scale animation (1x → 1.3x)
  - Progressive overlay reveal (title/caption)
  - "Explore" indicator appears when scrolled past center
  - Framer Motion entrance animations
  - Aspect ratio control (4/3 default or preserve original)

#### `VideoPlayer.tsx`
- **Props:** src, poster?, title?, caption?, className?, autoplay?, loop?, muted?, controls?
- **Features:**
  - Hover-to-play (when muted)
  - Custom play button overlay
  - Poster image fallback
  - Title/caption gradient overlay
  - "Video" indicator badge on hover
  - Framer Motion animations

---

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

---

## Deployment Configuration

### GitHub Pages Setup
- **Base Path:** `/EnglishPBlog/` (configured in `vite.config.ts`)
- **Deploy Script:** `npm run build && npx gh-pages -d dist`
- **Branch:** `gh-pages` (auto-created by gh-pages package)
- **Repository:** Should match `REPO_NAME` in vite.config.ts

### Vite Config (`vite.config.ts`)
```typescript
const REPO_NAME = 'EnglishPBlog'
base: `/${REPO_NAME}/`
```

**To deploy to a different repository:** Change `REPO_NAME` to match your GitHub repository name.

---

## Content Management

### Adding/Modifying Sections
Edit the `sections` array in `App.tsx` (lines 13-162). Each section follows the structure above.

### Images
- Place images in `public/images/`
- Reference using `${BASE_URL}images/FILENAME.JPG`
- `BASE_URL` is automatically set from `import.meta.env.BASE_URL`

### Videos
- Place videos in `public/images/`
- Reference same as images
- Supported formats: MP4 (recommended)

---

## Styling Guidelines

### Custom CSS Classes (in `index.css`)
- `.prose-custom` - Typography styles for blog content
- Tailwind `@layer utilities` for custom utilities

### Color Usage
- **Text:** `ink-900` (headings), `ink-700` (body), `ink-500` (muted)
- **Accents:** `accent-500` (primary), `accent-100/30` (backgrounds)
- **Backgrounds:** `ink-50` (page), `white` (cards)
- **Borders:** `ink-200` (dividers)

### Responsive Breakpoints
- Mobile: `< 768px` (default)
- Tablet: `md:` ≥ 768px
- Desktop: `lg:` ≥ 1024px

---

## Animation Patterns

### Section Entrance (App.tsx)
```typescript
// IntersectionObserver triggers at 10% viewport
// Framer Motion: opacity 0→1, y 40→0, duration 0.8s, custom easing
initial={{ opacity: 0, y: 40 }}
animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
```

### Image Expansion (ScrollExpansionImage.tsx)
```typescript
// Scroll progress 0→1 maps to scale 1→1.3
const scale = 1 + scrollProgress * 0.3
// Overlay opacity follows scroll progress
style={{ opacity: scrollProgress }}
```

### Navbar Scroll Effect
```typescript
// Background appears after 100px scroll
background: scrollY > 100 ? "rgba(250, 250, 250, 0.95)" : "transparent"
backdropFilter: scrollY > 100 ? "blur(20px)" : "none"
```

---

## TypeScript Configuration

- **Target:** ES2020
- **Module:** ESNext
- **ModuleResolution:** Bundler
- **Strict:** true
- **JSX:** react-jsx
- **Paths:** `@/*` → `./src/*`

---

## Common Tasks

### Adding a New Blog Section
1. Add new object to `sections` array in `App.tsx`
2. Add images to `public/images/`
3. Update section IDs for navigation consistency

### Modifying the Design System
1. Edit `tailwind.config.js` for colors, fonts, animations
2. Edit `src/index.css` for global styles
3. Run `npm run dev` to preview changes

### Updating Deployment Repository
1. Edit `vite.config.ts` → change `REPO_NAME`
2. Run `npm run deploy`

### Adding Custom Components
1. Create `.tsx` file in `src/components/`
2. Import and use in `App.tsx`
3. Follow existing patterns (TypeScript interfaces, Framer Motion, Tailwind)

---

## Troubleshooting

### Build Errors
- Run `npm run build` to see TypeScript errors
- Check `tsconfig.json` for path aliases
- Ensure all imports use correct extensions

### Images Not Loading
- Verify images in `public/images/`
- Check `BASE_URL` usage: `${BASE_URL}images/FILENAME.JPG`
- Confirm `vite.config.ts` base path matches deployment

### Animations Not Working
- Verify Framer Motion imports
- Check `className` prop forwarding in components
- Ensure `initial`/`animate` props are correctly structured

### Deployment Issues
- Confirm `REPO_NAME` in `vite.config.ts` matches GitHub repo
- Check `gh-pages` branch exists after deploy
- Verify GitHub Pages settings point to `gh-pages` branch

---

## Performance Notes

- **Code Splitting:** Vite handles automatically
- **Image Optimization:** Consider WebP/AVIF for production
- **Video:** Use compressed MP4, consider poster images
- **Bundle Analysis:** Run `npm run build` and check `dist/` size
- **Fonts:** Inter & Playfair Display loaded via Google Fonts (add to index.html if needed)

---

## Future Enhancements

- [ ] Add blog post CMS/markdown support
- [ ] Implement dark mode toggle
- [ ] Add search functionality
- [ ] Create RSS feed
- [ ] Add comment system
- [ ] Implement pagination for long posts
- [ ] Add syntax highlighting for code blocks
- [ ] Create admin interface for content management

---

## License & Attribution

Final Degree Project - Mobile Manipulator Robot Documentation  
Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion