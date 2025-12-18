# Tailwind CSS Setup for 11ty Project

This document explains how Tailwind CSS has been configured for this 11ty presentation project.

## ✅ Setup Complete

### Files Created:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration  
- `assets/css/style.css` - Main CSS file with Tailwind directives
- `assets/css/output.css` - Compiled Tailwind CSS (generated)
- `bioinfo1/slide-layout.njk` - 11ty layout template using Tailwind

### Package.json Scripts Added:
```json
{
  "tailwind:build": "tailwindcss -i ./assets/css/style.css -o ./assets/css/output.css",
  "tailwind:watch": "tailwindcss -i ./assets/css/style.css -o ./assets/css/output.css --watch",
  "tailwind:prod": "tailwindcss -i ./assets/css/style.css -o ./assets/css/output.css --minify"
}
```
### Complete Development Workflow:
1. **Build Tailwind CSS**: `npm run tailwind:build`
2. **Build 11ty site**: `npm run build` or `npm run dev`
3. **View presentation**: Open `_site/bioinfo1/index.html` in browser

## 🚀 Usage

### Development Workflow:
1. **Build Tailwind CSS**: `npm run tailwind:build`
2. **Watch mode**: `npm run tailwind:watch` (for automatic rebuilding)
3. **Build site**: `npm run build` or `npm run dev`

### Tailwind Classes Used:
The presentation uses extensive Tailwind utility classes:

#### Layout:
- `grid grid-cols-2` - Two-column grids
- `grid grid-cols-3` - Three-column grids  
- `flex items-center justify-center` - Flexbox centering
- `text-center`, `text-left` - Text alignment

#### Typography:
- `text-3xl`, `text-2xl`, `text-xl` - Font sizes
- `font-bold`, `font-semibold` - Font weights
- `leading-relaxed` - Line height
- `bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500` - Gradient text

#### Spacing:
- `mt-8`, `mb-4`, `p-4`, `mx-auto` - Margin and padding
- `space-x-4` - Horizontal spacing between elements

#### Colors:
- `text-purple-600`, `text-blue-500`, `text-green-600` - Text colors
- `bg-blue-400`, `hover:bg-blue-500` - Background colors
- `border-2 border-blue-500` - Border styling

#### Responsive:
- All classes are responsive by default with Tailwind's prefix system

## 🔧 Configuration

### Tailwind Config (`tailwind.config.js`):
- Scans `bioinfo1/**/*.{html,njk,md}` and `src/**/*.{html,njk,md}`
- Extended font families (includes Geo font for branding)

### Layout Integration:
The `slide-layout.njk` template includes:
- Local Tailwind CSS: `<link rel="stylesheet" href="/assets/css/output.css">`
- Font Awesome icons
- Reveal.js dependencies

## 📁 File Structure:
### Eleventy Configuration:
Updated `.eleventy.js` to include:
```javascript
eleventyConfig.addPassthroughCopy("assets");
```

This ensures the compiled CSS is copied to `_site/assets/css/` during build.
```
.
├── assets/css/
│   ├── style.css      # Source with Tailwind directives
│   └── output.css     # Compiled Tailwind (git-ignored)
├── bioinfo1/
│   ├── index.html     # Presentation content
│   └── slide-layout.njk # 11ty layout template
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Styling Benefits:
- ✅ **Utility-first**: No custom CSS needed
- ✅ **Responsive**: Mobile-first responsive design
- ✅ **Consistent**: Design system with Tailwind's scale
- ✅ **Fast**: Purge unused styles in production
- ✅ **Maintainable**: Easy to modify and extend

## 🏗️ Build Process:
1. Run `npm run tailwind:build` to compile CSS
2. Run `npm run build` to build the 11ty site
3. The generated site will be in `_site/` directory

## 📝 Notes:
- The `output.css` file is git-ignored (add to `.gitignore`)
- Use `npm run tailwind:watch` during development for auto-rebuilding
- All styling uses Tailwind utilities - no custom CSS classes needed