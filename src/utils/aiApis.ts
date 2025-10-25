/**
 * Chrome Built-in AI APIs Utilities
 * Provides interfaces and utilities for Chrome's Prompt API, Translator API, Summarizer API, and Rewriter API
 */

// Type definitions for Chrome AI APIs
declare global {
  interface Window {
    ai?: {
      prompt?: {
        create: (options?: PromptOptions) => Promise<PromptSession>;
      };
      translator?: {
        canTranslate: (sourceLanguage: string, targetLanguage: string) => Promise<boolean>;
        create: (options: TranslatorOptions) => Promise<TranslatorSession>;
      };
      summarizer?: {
        canSummarize: () => Promise<boolean>;
        create: (options?: SummarizerOptions) => Promise<SummarizerSession>;
      };
      rewriter?: {
        canRewrite: () => Promise<boolean>;
        create: (options?: RewriterOptions) => Promise<RewriterSession>;
      };
    };
  }
}

interface PromptOptions {
  signal?: AbortSignal;
}

interface PromptSession {
  prompt: (input: string) => Promise<string>;
  destroy: () => void;
}

interface TranslatorOptions {
  sourceLanguage: string;
  targetLanguage: string;
  signal?: AbortSignal;
}

interface TranslatorSession {
  translate: (input: string) => Promise<string>;
  destroy: () => void;
}

interface SummarizerOptions {
  type?: 'key-points' | 'tl;dr';
  length?: 'short' | 'medium' | 'long';
  signal?: AbortSignal;
}

interface SummarizerSession {
  summarize: (input: string) => Promise<string>;
  destroy: () => void;
}

interface RewriterOptions {
  tone?: 'formal' | 'casual';
  format?: 'markdown' | 'plain-text';
  length?: 'shorter' | 'longer' | 'same';
  signal?: AbortSignal;
}

interface RewriterSession {
  rewrite: (input: string) => Promise<string>;
  destroy: () => void;
}

/**
 * Check if Chrome AI APIs are available
 */
export const checkAIAvailability = async () => {
  return {
    prompt: !!window.ai?.prompt,
    translator: !!window.ai?.translator,
    summarizer: !!window.ai?.summarizer,
    rewriter: !!window.ai?.rewriter,
  };
};

/**
 * Translate medical jargon to plain language
 */
export const translateMedicalJargon = async (text: string): Promise<string> => {
  try {
    if (!window.ai?.translator) {
      throw new Error('Translator API not available');
    }

    const canTranslate = await window.ai.translator.canTranslate('en', 'en');
    if (!canTranslate) {
      throw new Error('Translation not supported');
    }

    const translator = await window.ai.translator.create({
      sourceLanguage: 'en',
      targetLanguage: 'en',
    });

    const result = await translator.translate(text);
    translator.destroy();
    return result;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

/**
 * Simplify medical text using Rewriter API
 */
export const simplifyMedicalText = async (text: string): Promise<string> => {
  try {
    if (!window.ai?.rewriter) {
      throw new Error('Rewriter API not available');
    }

    const canRewrite = await window.ai.rewriter.canRewrite();
    if (!canRewrite) {
      throw new Error('Rewriting not supported');
    }

    const rewriter = await window.ai.rewriter.create({
      tone: 'casual',
      format: 'plain-text',
    });

    const result = await rewriter.rewrite(text);
    rewriter.destroy();
    return result;
  } catch (error) {
    console.error('Rewriting error:', error);
    throw error;
  }
};

/**
 * Summarize medical text
 */
export const summarizeMedicalText = async (text: string): Promise<string> => {
  try {
    if (!window.ai?.summarizer) {
      throw new Error('Summarizer API not available');
    }

    const canSummarize = await window.ai.summarizer.canSummarize();
    if (!canSummarize) {
      throw new Error('Summarization not supported');
    }

    const summarizer = await window.ai.summarizer.create({
      type: 'key-points',
      length: 'short',
    });

    const result = await summarizer.summarize(text);
    summarizer.destroy();
    return result;
  } catch (error) {
    console.error('Summarization error:', error);
    throw error;
  }
};

