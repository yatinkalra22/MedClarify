/**
 * Content Script for MedClarify
 * Runs on web pages to capture selected text and display results
 */

// Listen for messages from background script or popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
    // Get currently selected text on the page
    const selectedText = window.getSelection()?.toString() || '';
    sendResponse({ selectedText });
  }

  if (request.action === 'simplifyText') {
    handleSimplifyText(request.text);
  }

  if (request.action === 'summarizeText') {
    handleSummarizeText(request.text);
  }
});

/**
 * Handle text simplification from context menu
 */
async function handleSimplifyText(text: string) {
  try {
    // Show a notification that processing has started
    showNotification('Simplifying medical text...', 'info');

    // Send message to popup or background to process
    const response = await chrome.runtime.sendMessage({
      action: 'processSimplify',
      text,
    });

    if (response?.result) {
      showNotification(`Simplified: ${response.result}`, 'success');
    }
  } catch (error) {
    console.error('Error simplifying text:', error);
    showNotification('Failed to simplify text', 'error');
  }
}

/**
 * Handle text summarization from context menu
 */
async function handleSummarizeText(text: string) {
  try {
    // Show a notification that processing has started
    showNotification('Summarizing medical text...', 'info');

    // Send message to popup or background to process
    const response = await chrome.runtime.sendMessage({
      action: 'processSummarize',
      text,
    });

    if (response?.result) {
      showNotification(`Summary: ${response.result}`, 'success');
    }
  } catch (error) {
    console.error('Error summarizing text:', error);
    showNotification('Failed to summarize text', 'error');
  }
}

/**
 * Show a notification on the page
 */
function showNotification(message: string, type: 'info' | 'success' | 'error') {
  const notification = document.createElement('div');
  notification.id = 'medclarify-notification';

  const bgColor =
    type === 'success'
      ? '#10b981'
      : type === 'error'
        ? '#ef4444'
        : '#3b82f6';
  const textColor = '#ffffff';

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${bgColor};
    color: ${textColor};
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 999999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Medical terms dictionary for hover detection
 */
const MEDICAL_TERMS = [
  'hypertension', 'diabetes', 'cardiovascular', 'myocardial', 'infarction',
  'arrhythmia', 'thrombosis', 'embolism', 'stenosis', 'aneurysm',
  'pneumonia', 'bronchitis', 'asthma', 'emphysema', 'fibrosis',
  'hepatitis', 'cirrhosis', 'gastritis', 'ulcer', 'colitis',
  'arthritis', 'osteoporosis', 'rheumatoid', 'lupus', 'gout',
  'meningitis', 'encephalitis', 'stroke', 'seizure', 'epilepsy',
  'cancer', 'malignant', 'benign', 'metastasis', 'carcinoma',
  'lymphoma', 'leukemia', 'sarcoma', 'melanoma', 'adenoma',
  'infection', 'sepsis', 'bacteremia', 'viremia', 'fungal',
  'inflammation', 'edema', 'necrosis', 'fibrosis', 'atrophy',
  'hypertrophy', 'hyperplasia', 'dysplasia', 'metaplasia', 'anaplasia',
];

/**
 * Detect medical terms in text and add hover tooltips
 */
function detectAndHighlightMedicalTerms(): void {
  const bodyText = document.body.innerText;
  const foundTerms = MEDICAL_TERMS.filter(term =>
    bodyText.toLowerCase().includes(term)
  );

  if (foundTerms.length > 0) {
    console.log('Found medical terms:', foundTerms);
    // Highlight found terms for user awareness
    highlightTerms(foundTerms);
  }
}

// Initialize medical term detection when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', detectAndHighlightMedicalTerms);
} else {
  detectAndHighlightMedicalTerms();
}

/**
 * Highlight medical terms in the page
 */
function highlightTerms(terms: string[]) {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const nodesToReplace: Array<{ node: Node; term: string }> = [];
  let node;

  while ((node = walker.nextNode())) {
    for (const term of terms) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(node.textContent || '')) {
        nodesToReplace.push({ node, term });
      }
    }
  }

  // Replace text nodes with highlighted versions
  nodesToReplace.forEach(({ node, term }) => {
    const span = document.createElement('span');
    span.innerHTML = (node.textContent || '').replace(
      new RegExp(`\\b(${term})\\b`, 'gi'),
      '<span class="medclarify-term" style="background-color: #fff3cd; cursor: help; border-bottom: 2px dotted #ffc107;" title="Medical term - click to learn more">$1</span>'
    );
    node.parentNode?.replaceChild(span, node);
  });
}

console.log('MedClarify content script loaded');

