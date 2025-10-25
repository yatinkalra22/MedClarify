# Troubleshooting Guide

## Common Issues

### Extension Not Showing in Chrome

**Problem**: Extension doesn't appear in toolbar after loading.

**Solutions**:
1. Verify you selected the `dist` folder (not root directory)
2. Go to `chrome://extensions/` and click refresh icon
3. Check that Developer mode is enabled (toggle in top-right)
4. Try removing and reloading the extension

### Build Errors

**Problem**: `npm run build` fails with errors.

**Solutions**:

**TypeScript Errors**:
```bash
# Check for type errors
npm run type-check

# Fix common issues
npm run format
npm run lint --fix
```

**Module Not Found**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Vite Build Errors**:
```bash
# Clear build cache
rm -rf dist
npm run build
```

### AI APIs Not Working

**Problem**: Simplify/Summarize buttons don't work or show errors.

**Solutions**:

1. **Check Chrome Version**:
   - Go to `chrome://version/`
   - Need Chrome 121 or higher
   - Update Chrome if needed

2. **Restart Chrome**:
   - Close all Chrome windows
   - Reopen Chrome
   - Reload extension

3. **Check Console for Errors**:
   - Right-click popup → Inspect
   - Check Console tab
   - Look for error messages

4. **Verify API Availability**:
   - Open popup
   - Check "AI Availability" status
   - If APIs show as unavailable, restart Chrome

### Popup Not Opening

**Problem**: Clicking extension icon doesn't open popup.

**Solutions**:
1. Check browser console (F12) for errors
2. Reload extension in `chrome://extensions/`
3. Try removing and reloading
4. Check manifest.json paths are correct

### Settings Not Saving

**Problem**: Changes in options page don't persist.

**Solutions**:
1. Check browser console for errors
2. Verify `chrome.storage.sync` permission in manifest.json
3. Try clearing Chrome cache: Settings → Privacy → Clear browsing data
4. Reload extension

### Context Menu Not Appearing

**Problem**: Right-click menu doesn't show MedClarify options.

**Solutions**:
1. Check "Enable Context Menu" in settings
2. Reload extension
3. Verify `contextMenus` permission in manifest.json
4. Try right-clicking on selected text

### Text Not Being Simplified/Summarized

**Problem**: AI functions return empty or error results.

**Solutions**:
1. Check text length (minimum ~20 characters recommended)
2. Verify text is in English
3. Check browser console for specific errors
4. Try with different text
5. Restart Chrome and try again

## Performance Issues

### Extension Slow to Load

**Solutions**:
- Clear browser cache
- Disable other extensions temporarily
- Check available RAM
- Rebuild extension: `npm run build`

### High Memory Usage

**Solutions**:
- Close unused tabs
- Reload extension
- Check for memory leaks in DevTools

## Development Issues

### Hot Reload Not Working

**Problem**: Changes don't reflect after `npm run dev`.

**Solutions**:
1. Rebuild: `npm run build`
2. Reload extension in Chrome
3. Hard refresh popup (Ctrl+Shift+R)

### TypeScript Errors in IDE

**Problem**: IDE shows errors but build succeeds.

**Solutions**:
1. Restart IDE
2. Run `npm run type-check`
3. Check tsconfig.json is correct
4. Update TypeScript: `npm install -D typescript@latest`

### Linting Errors

**Problem**: ESLint shows errors.

**Solutions**:
```bash
# Fix automatically
npm run lint --fix

# Format code
npm run format
```

## Chrome-Specific Issues

### Extension Disabled by Chrome

**Problem**: Extension shows as disabled.

**Solutions**:
1. Go to `chrome://extensions/`
2. Enable the extension
3. Check for errors in Details page
4. Reload extension

### Manifest Errors

**Problem**: "Invalid manifest" error.

**Solutions**:
1. Check manifest.json syntax (valid JSON)
2. Verify all required fields present
3. Check file paths are correct
4. Validate against Manifest V3 spec

## Getting Help

### Check Logs

1. **Popup Console**:
   - Right-click popup → Inspect
   - Check Console tab

2. **Background Worker**:
   - Go to `chrome://extensions/`
   - Click "Inspect views" → "background page"

3. **Content Script**:
   - Open any webpage
   - Press F12 → Console
   - Look for MedClarify messages

### Debug Steps

1. Check browser console for errors
2. Verify Chrome version (121+)
3. Reload extension
4. Clear cache and restart Chrome
5. Rebuild extension: `npm run build`
6. Try with fresh Chrome profile

### Still Having Issues?

1. Check [Architecture Guide](./ARCHITECTURE.md) to understand system
2. Review [Development Guide](./DEVELOPMENT.md) for code examples
3. Check [Quick Start](./QUICKSTART.md) for setup verification
4. Review Chrome Extension documentation

---

**Need more help?** → [Development Guide](./DEVELOPMENT.md)

