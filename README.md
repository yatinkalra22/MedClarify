# MedClarify - Medical Jargon Translator

A Chrome Extension that translates medical jargon into plain language using Chrome's Built-in AI APIs.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the extension
npm run build

# 3. Load in Chrome
# - Go to chrome://extensions/
# - Enable Developer mode (top-right)
# - Click "Load unpacked"
# - Select the "dist" folder
```

## ✨ Features

- **Simplify Medical Text** - Convert complex medical terminology into plain language
- **Summarize Content** - Get key points from medical articles and documents
- **Context Menu Integration** - Right-click to simplify or summarize selected text
- **Settings Page** - Customize preferences and behavior
- **On-Device Processing** - Uses Chrome's built-in AI APIs (no external servers)

## 🛠️ Tech Stack

- **React 18.2** - UI framework
- **TypeScript 5.3** - Type-safe development
- **Vite 5.0** - Fast build tool
- **Tailwind CSS 3.3** - Styling
- **Manifest V3** - Latest Chrome Extension standard
- **Chrome AI APIs** - Rewriter, Summarizer, Translator, Prompt APIs

## 📋 Requirements

- Node.js 16+
- Chrome 121+ (for AI APIs)
- npm/yarn/pnpm

## 📁 Project Structure

```
MedClarify/
├── src/
│   ├── popup/          # Main popup UI
│   ├── options/        # Settings page
│   ├── background/     # Service worker
│   ├── content/        # Content script
│   ├── utils/          # AI APIs wrapper
│   ├── styles/         # Global styles
│   └── manifest.json   # Extension config
├── dist/               # Build output
├── docs/               # Documentation
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## 📚 Documentation

- **[Getting Started](./docs/QUICKSTART.md)** - 5-minute setup guide
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and data flow
- **[Development Guide](./docs/DEVELOPMENT.md)** - How to develop and extend
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🔧 Available Commands

```bash
npm run dev          # Development with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Check TypeScript errors
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🎯 How It Works

1. **Popup Interface** - Users paste medical text into the popup
2. **AI Processing** - Chrome's built-in AI APIs process the text
3. **Results Display** - Simplified or summarized text is shown
4. **Context Menu** - Right-click integration for quick access
5. **Settings** - Customize behavior via options page

## 🐛 Troubleshooting

**Extension not showing?**
- Make sure you selected the `dist` folder (not root)
- Click refresh in `chrome://extensions/`
- Check Developer mode is enabled

**AI APIs not working?**
- Check Chrome version: `chrome://version/` (need 121+)
- Restart Chrome
- See [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)

## 📖 Learning Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Chrome AI APIs](https://developer.chrome.com/docs/ai/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Next Steps

1. Follow the [Quick Start](./docs/QUICKSTART.md) guide
2. Load the extension in Chrome
3. Test the features
4. Customize colors and UI in `src/`
5. Read [Development Guide](./docs/DEVELOPMENT.md) to add features

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Ready to get started?** → [Quick Start Guide](./docs/QUICKSTART.md)
