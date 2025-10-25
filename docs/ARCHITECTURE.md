# Architecture Guide

## System Overview

MedClarify is a Chrome Extension built with Manifest V3 that uses Chrome's built-in AI APIs to simplify and summarize medical text.

## Components

### 1. Popup (`src/popup/`)
- **Purpose**: Main user interface
- **Files**: `Popup.tsx`, `popup.html`, `index.tsx`
- **Features**:
  - Text input area
  - Simplify/Summarize tabs
  - Copy to clipboard
  - AI availability status
  - Loading states and error handling

### 2. Options Page (`src/options/`)
- **Purpose**: Settings and preferences
- **Files**: `Options.tsx`, `options.html`, `index.tsx`
- **Features**:
  - Enable/disable context menu
  - Default action selection
  - Tone preference (formal/casual)
  - Summary length preference
  - Persistent storage via Chrome Storage API

### 3. Background Service Worker (`src/background/background.ts`)
- **Purpose**: Extension lifecycle and message routing
- **Features**:
  - Handles extension installation
  - Creates context menu items
  - Routes messages between components
  - Manages settings storage

### 4. Content Script (`src/content/content.ts`)
- **Purpose**: Runs on web pages
- **Features**:
  - Captures selected text
  - Listens for messages from popup/background
  - Displays notifications
  - Handles context menu actions

### 5. AI APIs Wrapper (`src/utils/aiApis.ts`)
- **Purpose**: Encapsulates Chrome AI APIs
- **Functions**:
  - `checkAIAvailability()` - Check which APIs are available
  - `simplifyMedicalText()` - Uses Rewriter API
  - `summarizeMedicalText()` - Uses Summarizer API
  - `translateMedicalText()` - Uses Translator API
  - Error handling and session cleanup

## Data Flow

```
User Input (Popup)
    ↓
Popup Component
    ↓
AI APIs Wrapper
    ↓
Chrome AI APIs (Rewriter/Summarizer)
    ↓
Result Display
    ↓
Copy to Clipboard
```

## Message Passing

```
Popup ←→ Background ←→ Content Script
  ↓
Chrome Storage API
```

**Message Types**:
- `getSelectedText` - Retrieve selected text from page
- `getSettings` - Fetch user preferences
- `saveSettings` - Store user preferences
- `simplifyText` - Process text simplification
- `summarizeText` - Process text summarization

## File Structure

```
src/
├── popup/
│   ├── Popup.tsx          # Main component
│   ├── popup.html         # HTML template
│   └── index.tsx          # Entry point
├── options/
│   ├── Options.tsx        # Settings component
│   ├── options.html       # HTML template
│   └── index.tsx          # Entry point
├── background/
│   └── background.ts      # Service worker
├── content/
│   └── content.ts         # Content script
├── utils/
│   └── aiApis.ts          # AI APIs wrapper
├── styles/
│   └── globals.css        # Global styles
└── manifest.json          # Extension config
```

## Build Process

1. **TypeScript Compilation** - `tsc` compiles TypeScript to JavaScript
2. **Vite Build** - Bundles React components and assets
3. **Manifest Copy** - Copies manifest.json to dist folder
4. **Output** - Creates dist/ folder with all files

## Chrome APIs Used

- **chrome.runtime** - Message passing and lifecycle
- **chrome.storage.sync** - Persistent settings storage
- **chrome.contextMenus** - Right-click menu integration
- **chrome.tabs** - Tab management
- **chrome.scripting** - Content script injection

## Chrome AI APIs Used

- **Rewriter API** - Simplify text with casual tone
- **Summarizer API** - Create key-point summaries
- **Translator API** - Translate medical terms
- **Prompt API** - General text generation

## Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Custom Theme** - Medical color palette (medical-50 to medical-900)
- **Responsive Design** - Works on all screen sizes

## Development Workflow

1. Make changes to source files
2. Run `npm run build` to rebuild
3. Reload extension in Chrome (click refresh icon)
4. Test changes in popup/options/content script

## Performance Considerations

- **Code Splitting** - Separate bundles for popup, options, background, content
- **Lazy Loading** - AI APIs loaded on demand
- **Session Cleanup** - AI sessions destroyed after use
- **Error Handling** - Graceful fallbacks for API failures

---

**Need more details?** → [Development Guide](./DEVELOPMENT.md)

