import React, { useState, useEffect } from 'react';
import '../styles/globals.css';

interface Settings {
  enableContextMenu: boolean;
  defaultAction: 'simplify' | 'summarize';
  tone: 'formal' | 'casual';
  summaryLength: 'short' | 'medium' | 'long';
}

const DEFAULT_SETTINGS: Settings = {
  enableContextMenu: true,
  defaultAction: 'simplify',
  tone: 'casual',
  summaryLength: 'short',
};

export const Options: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from Chrome storage
    chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
      setSettings(items as Settings);
    });
  }, []);

  const handleChange = (key: keyof Settings, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    chrome.storage.sync.set(settings, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-medical-900 flex items-center gap-3">
            <span className="text-4xl">🏥</span>
            MedClarify Settings
          </h1>
          <p className="text-medical-700 mt-2">
            Customize your medical jargon translation experience
          </p>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-medical-200">
          {/* Context Menu Setting */}
          <div className="mb-8 pb-8 border-b border-medical-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-medical-900">
                  Context Menu Integration
                </h2>
                <p className="text-sm text-medical-600 mt-1">
                  Add MedClarify options to right-click context menu
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableContextMenu}
                  onChange={(e) =>
                    handleChange('enableContextMenu', e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-medical-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-medical-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-medical-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-600"></div>
              </label>
            </div>
          </div>

          {/* Default Action Setting */}
          <div className="mb-8 pb-8 border-b border-medical-200">
            <label className="block text-lg font-semibold text-medical-900 mb-3">
              Default Action
            </label>
            <p className="text-sm text-medical-600 mb-4">
              Choose the default action when using MedClarify
            </p>
            <div className="space-y-3">
              {(['simplify', 'summarize'] as const).map((action) => (
                <label key={action} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="defaultAction"
                    value={action}
                    checked={settings.defaultAction === action}
                    onChange={(e) =>
                      handleChange('defaultAction', e.target.value as 'simplify' | 'summarize')
                    }
                    className="w-4 h-4 text-medical-600"
                  />
                  <span className="text-medical-800 capitalize">{action}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tone Setting */}
          <div className="mb-8 pb-8 border-b border-medical-200">
            <label className="block text-lg font-semibold text-medical-900 mb-3">
              Tone
            </label>
            <p className="text-sm text-medical-600 mb-4">
              Choose the tone for simplified text
            </p>
            <div className="space-y-3">
              {(['formal', 'casual'] as const).map((tone) => (
                <label key={tone} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="tone"
                    value={tone}
                    checked={settings.tone === tone}
                    onChange={(e) => handleChange('tone', e.target.value as 'formal' | 'casual')}
                    className="w-4 h-4 text-medical-600"
                  />
                  <span className="text-medical-800 capitalize">{tone}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary Length Setting */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-medical-900 mb-3">
              Summary Length
            </label>
            <p className="text-sm text-medical-600 mb-4">
              Choose the default length for summaries
            </p>
            <div className="space-y-3">
              {(['short', 'medium', 'long'] as const).map((length) => (
                <label key={length} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="summaryLength"
                    value={length}
                    checked={settings.summaryLength === length}
                    onChange={(e) =>
                      handleChange('summaryLength', e.target.value as 'short' | 'medium' | 'long')
                    }
                    className="w-4 h-4 text-medical-600"
                  />
                  <span className="text-medical-800 capitalize">{length}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-medical-200">
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-6 bg-medical-600 text-white rounded-lg font-semibold hover:bg-medical-700 transition-colors"
            >
              Save Settings
            </button>
            <button
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              className="flex-1 py-3 px-6 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-sm text-green-800">✓ Settings saved successfully!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-medical-600 text-sm">
          <p>MedClarify v1.0.0 • Powered by Chrome Built-in AI APIs</p>
        </div>
      </div>
    </div>
  );
};

