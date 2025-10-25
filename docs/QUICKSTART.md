# Quick Start Guide

Get MedClarify up and running in 5 minutes.

## Prerequisites

- Node.js 16 or higher
- Chrome 121 or higher
- npm, yarn, or pnpm

## Installation

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including React, TypeScript, Vite, and Tailwind CSS.

### 2. Build the Extension

```bash
npm run build
```

This creates a `dist/` folder with your compiled extension.

### 3. Load in Chrome

1. Open Chrome and navigate to **`chrome://extensions/`**
2. Toggle **Developer mode** in the top-right corner
3. Click **"Load unpacked"**
4. Select the **`dist`** folder from your project
5. Done! 🎉 The extension appears in your toolbar

## Verify It Works

1. Click the **MedClarify** icon in your Chrome toolbar
2. The popup should open
3. Paste some medical text
4. Click **"Simplify"** or **"Summarize"**
5. Check the browser console (F12) for any errors

## Development

For development with hot reload:

```bash
npm run dev
```

Then rebuild and reload the extension in Chrome after making changes.

## Common Commands

```bash
npm run build        # Build for production
npm run dev          # Development with hot reload
npm run type-check   # Check TypeScript errors
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Troubleshooting

**Extension not showing?**
- Ensure you selected the `dist` folder (not the root)
- Click the refresh icon in `chrome://extensions/`
- Verify Developer mode is enabled

**Build errors?**
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check Node.js version: `node --version`

**AI APIs not working?**
- Check Chrome version: `chrome://version/` (need 121+)
- Restart Chrome
- See [Troubleshooting Guide](./TROUBLESHOOTING.md)

## Next Steps

- Read the [Architecture Guide](./ARCHITECTURE.md) to understand the system
- Check [Development Guide](./DEVELOPMENT.md) to start customizing
- See [Troubleshooting](./TROUBLESHOOTING.md) for common issues

---

**Need help?** → [Troubleshooting Guide](./TROUBLESHOOTING.md)

