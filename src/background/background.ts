/**
 * Background Service Worker for MedClarify
 * Handles context menu creation and message routing
 */

// Create context menu items on extension install/update
chrome.runtime.onInstalled.addListener(() => {
  // Create parent context menu
  chrome.contextMenus.create({
    id: 'medclarify-parent',
    title: 'MedClarify',
    contexts: ['selection'],
  });

  // Create simplify option
  chrome.contextMenus.create({
    id: 'medclarify-simplify',
    parentId: 'medclarify-parent',
    title: 'Simplify Medical Text',
    contexts: ['selection'],
  });

  // Create summarize option
  chrome.contextMenus.create({
    id: 'medclarify-summarize',
    parentId: 'medclarify-parent',
    title: 'Summarize Medical Text',
    contexts: ['selection'],
  });

  console.log('MedClarify extension installed');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id) return;

  const selectedText = info.selectionText || '';

  if (info.menuItemId === 'medclarify-simplify') {
    // Send message to content script to process simplification
    chrome.tabs.sendMessage(tab.id, {
      action: 'simplifyText',
      text: selectedText,
    });
  } else if (info.menuItemId === 'medclarify-summarize') {
    // Send message to content script to process summarization
    chrome.tabs.sendMessage(tab.id, {
      action: 'summarizeText',
      text: selectedText,
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(
      {
        enableContextMenu: true,
        defaultAction: 'simplify',
        tone: 'casual',
        summaryLength: 'short',
      },
      (settings) => {
        sendResponse(settings);
      }
    );
    return true; // Will respond asynchronously
  }

  if (request.action === 'saveSettings') {
    chrome.storage.sync.set(request.settings, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Handle AI processing requests from content scripts
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'processSimplify') {
    // Process simplification request
    console.log('Processing simplification request');
    sendResponse({ success: true });
    return true;
  }

  if (request.action === 'processSummarize') {
    // Process summarization request
    console.log('Processing summarization request');
    sendResponse({ success: true });
    return true;
  }

  if (request.action === 'processExplain') {
    // Process explanation request
    console.log('Processing explanation request');
    sendResponse({ success: true });
    return true;
  }
});

// Log when service worker starts
console.log('MedClarify background service worker loaded');

