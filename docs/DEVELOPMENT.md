# Development Guide

## Getting Started

### Setup Development Environment

```bash
# Install dependencies
npm install

# Start development build
npm run dev

# In another terminal, rebuild after changes
npm run build
```

## Project Structure

```
src/
├── popup/          # Main UI component
├── options/        # Settings page
├── background/     # Service worker
├── content/        # Content script
├── utils/          # Helper functions
├── styles/         # CSS files
└── manifest.json   # Extension config
```

## Making Changes

### 1. Modify UI Components

Edit React components in `src/popup/` or `src/options/`:

```typescript
// src/popup/Popup.tsx
export default function Popup() {
  const [text, setText] = useState('');
  
  return (
    <div className="p-4">
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
```

### 2. Add AI Functions

Extend `src/utils/aiApis.ts`:

```typescript
export const myNewFunction = async (text: string): Promise<string> => {
  try {
    // Your AI API logic here
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### 3. Update Styling

Edit `src/styles/globals.css` or use Tailwind classes:

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
.custom-class {
  @apply p-4 rounded-lg shadow-md;
}
```

### 4. Modify Background Service Worker

Edit `src/background/background.ts`:

```typescript
// Handle new message types
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'myNewAction') {
    // Handle action
    sendResponse({ success: true });
  }
});
```

## Code Style

### TypeScript

- Use strict mode (enabled in tsconfig.json)
- Define interfaces for data structures
- Use type annotations for function parameters

```typescript
interface Settings {
  enableContextMenu: boolean;
  defaultAction: 'simplify' | 'summarize';
}

function saveSettings(settings: Settings): void {
  // Implementation
}
```

### React

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for prop types

```typescript
interface PopupProps {
  title: string;
  onClose: () => void;
}

export default function Popup({ title, onClose }: PopupProps) {
  return <div>{title}</div>;
}
```

### CSS

- Use Tailwind CSS classes
- Avoid inline styles
- Use custom classes for complex styles

```typescript
<div className="flex items-center justify-between p-4 bg-medical-50 rounded-lg">
  {/* Content */}
</div>
```

## Testing

### Manual Testing

1. Build the extension: `npm run build`
2. Load in Chrome: `chrome://extensions/`
3. Test each feature:
   - Popup opens correctly
   - Text input works
   - Simplify/Summarize buttons work
   - Settings save and persist
   - Context menu appears

### Browser Console

Check for errors in DevTools:
- Right-click popup → Inspect
- Check Console tab for errors
- Use `console.log()` for debugging

## Building for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## Debugging

### Enable Logging

Add console logs to track execution:

```typescript
console.log('Starting simplification...', text);
const result = await simplifyMedicalText(text);
console.log('Result:', result);
```

### Inspect Extension

1. Go to `chrome://extensions/`
2. Click "Details" on MedClarify
3. Click "Inspect views" → "background page"
4. Use DevTools to debug

### Check Messages

Monitor message passing:

```typescript
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('Message received:', request);
  sendResponse({ received: true });
});
```

## Common Tasks

### Add a New Setting

1. Update `Settings` interface in `src/options/Options.tsx`
2. Add UI control in `Options.tsx`
3. Handle in `src/background/background.ts`
4. Use in components via `chrome.storage.sync.get()`

### Add a New AI Function

1. Create function in `src/utils/aiApis.ts`
2. Add error handling
3. Call from popup or content script
4. Display results to user

### Modify Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      medical: {
        50: '#f0f9ff',
        // ... more colors
      }
    }
  }
}
```

## Useful Commands

```bash
npm run dev          # Development build
npm run build        # Production build
npm run type-check   # Check TypeScript errors
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run preview      # Preview production build
```

## Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Chrome AI APIs](https://developer.chrome.com/docs/ai/)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Questions?** → [Troubleshooting Guide](./TROUBLESHOOTING.md)

