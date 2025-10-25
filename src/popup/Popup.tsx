import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import {
  checkAIAvailability,
  simplifyMedicalText,
  summarizeMedicalText,
} from '../utils/aiApis';

interface AIAvailability {
  prompt: boolean;
  translator: boolean;
  summarizer: boolean;
  rewriter: boolean;
}

export const Popup: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [aiAvailability, setAiAvailability] = useState<AIAvailability>({
    prompt: false,
    translator: false,
    summarizer: false,
    rewriter: false,
  });
  const [activeTab, setActiveTab] = useState<'simplify' | 'summarize'>('simplify');

  useEffect(() => {
    // Check AI availability
    checkAIAvailability().then(setAiAvailability);

    // Get selected text from active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'getSelectedText' },
          (response) => {
            if (response?.selectedText) {
              setSelectedText(response.selectedText);
            }
          }
        );
      }
    });
  }, []);

  const handleSimplify = async () => {
    if (!selectedText.trim()) {
      setError('Please select some medical text first');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const simplified = await simplifyMedicalText(selectedText);
      setResult(simplified);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to simplify text'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!selectedText.trim()) {
      setError('Please select some medical text first');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const summarized = await summarizeMedicalText(selectedText);
      setResult(summarized);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to summarize text'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="w-96 bg-gradient-to-br from-medical-50 to-medical-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-medical-900 flex items-center gap-2">
          <span className="text-2xl">🏥</span>
          MedClarify
        </h1>
        <p className="text-sm text-medical-700 mt-1">
          Translate medical jargon into plain language
        </p>
      </div>

      {/* AI Availability Status */}
      <div className="mb-4 p-3 bg-white rounded-lg border border-medical-200">
        <p className="text-xs font-semibold text-medical-900 mb-2">
          AI APIs Status:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(aiAvailability).map(([key, available]) => (
            <div key={key} className="flex items-center gap-1">
              <span className={available ? 'text-green-500' : 'text-red-500'}>
                {available ? '✓' : '✗'}
              </span>
              <span className="capitalize text-medical-700">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-medical-900 mb-2">
          Selected Text:
        </label>
        <textarea
          value={selectedText}
          onChange={(e) => setSelectedText(e.target.value)}
          placeholder="Paste or select medical text here..."
          className="w-full h-24 p-3 border border-medical-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 resize-none"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('simplify')}
          className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
            activeTab === 'simplify'
              ? 'bg-medical-600 text-white'
              : 'bg-white text-medical-700 border border-medical-300 hover:bg-medical-50'
          }`}
        >
          Simplify
        </button>
        <button
          onClick={() => setActiveTab('summarize')}
          className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
            activeTab === 'summarize'
              ? 'bg-medical-600 text-white'
              : 'bg-white text-medical-700 border border-medical-300 hover:bg-medical-50'
          }`}
        >
          Summarize
        </button>
      </div>

      {/* Action Button */}
      <button
        onClick={activeTab === 'simplify' ? handleSimplify : handleSummarize}
        disabled={loading || !selectedText.trim()}
        className="w-full py-2 px-4 bg-medical-600 text-white rounded-lg font-semibold hover:bg-medical-700 disabled:bg-medical-300 disabled:cursor-not-allowed transition-colors mb-4"
      >
        {loading ? 'Processing...' : activeTab === 'simplify' ? 'Simplify' : 'Summarize'}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Result Section */}
      {result && (
        <div className="mb-4 p-4 bg-white rounded-lg border border-medical-200">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-medical-900">Result:</p>
            <button
              onClick={handleCopy}
              className="text-xs px-2 py-1 bg-medical-100 text-medical-700 rounded hover:bg-medical-200 transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="text-sm text-medical-800 leading-relaxed">{result}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-medical-600 text-center">
        <p>Powered by Chrome Built-in AI APIs</p>
      </div>
    </div>
  );
};

