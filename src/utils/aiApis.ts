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
 * Note: APIs are available in content script context, not popup
 */
export const checkAIAvailability = async () => {
  try {
    // Try to check availability through content script
    const availability = {
      prompt: typeof window !== 'undefined' && !!window.ai?.prompt,
      translator: typeof window !== 'undefined' && !!window.ai?.translator,
      summarizer: typeof window !== 'undefined' && !!window.ai?.summarizer,
      rewriter: typeof window !== 'undefined' && !!window.ai?.rewriter,
    };

    // If all are false, APIs might be available but not yet initialized
    // Return true for all to allow attempts
    if (!Object.values(availability).some(v => v)) {
      return {
        prompt: true,
        translator: true,
        summarizer: true,
        rewriter: true,
      };
    }

    return availability;
  } catch (error) {
    console.warn('Error checking AI availability:', error);
    // Return true for all to allow attempts
    return {
      prompt: true,
      translator: true,
      summarizer: true,
      rewriter: true,
    };
  }
};

/**
 * Translate medical jargon to plain language
 */
export const translateMedicalJargon = async (text: string): Promise<string> => {
  try {
    // Check if API is available
    if (!window.ai?.translator) {
      throw new Error('Translator API not available in this context. Please ensure Chrome 121+ is installed and AI APIs are enabled.');
    }

    // Check if translation is supported
    const canTranslate = await window.ai.translator.canTranslate('en', 'en');
    if (!canTranslate) {
      throw new Error('Translation not supported on this device. Please check Chrome settings.');
    }

    // Create translator session
    const translator = await window.ai.translator.create({
      sourceLanguage: 'en',
      targetLanguage: 'en',
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    // Translate the text
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
    // Check if API is available
    if (!window.ai?.rewriter) {
      throw new Error('Rewriter API not available in this context. Please ensure Chrome 121+ is installed and AI APIs are enabled.');
    }

    // Check if rewriting is supported
    const canRewrite = await window.ai.rewriter.canRewrite();
    if (!canRewrite) {
      throw new Error('Rewriting not supported on this device. Please check Chrome settings.');
    }

    // Create rewriter session
    const rewriter = await window.ai.rewriter.create({
      tone: 'casual',
      format: 'plain-text',
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    // Rewrite the text
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
    // Check if API is available
    if (!window.ai?.summarizer) {
      throw new Error('Summarizer API not available in this context. Please ensure Chrome 121+ is installed and AI APIs are enabled.');
    }

    // Check if summarization is supported
    const canSummarize = await window.ai.summarizer.canSummarize();
    if (!canSummarize) {
      throw new Error('Summarization not supported on this device. Please check Chrome settings.');
    }

    // Create summarizer session
    const summarizer = await window.ai.summarizer.create({
      type: 'key-points',
      length: 'short',
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    // Summarize the text
    const result = await summarizer.summarize(text);
    summarizer.destroy();
    return result;
  } catch (error) {
    console.error('Summarization error:', error);
    throw error;
  }
};

/**
 * Use Chrome Prompt API to explain medical terms
 */
export const explainMedicalTerms = async (text: string): Promise<string> => {
  try {
    // Check if API is available
    if (!window.ai?.prompt) {
      throw new Error('Prompt API not available in this context. Please ensure Chrome 121+ is installed and AI APIs are enabled.');
    }

    // Create prompt session
    const session = await window.ai.prompt.create({
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    // Create medical context for explanation
    const medicalContext = `You are a medical terminology expert. Explain the following medical text in simple, plain language that a patient can understand. Focus on making complex medical terms accessible.

Medical Text: "${text}"

Provide a clear, concise explanation.`;

    // Get explanation from AI
    const result = await session.prompt(medicalContext);
    session.destroy();
    return result;
  } catch (error) {
    console.error('Prompt API error:', error);
    throw error;
  }
};

/**
 * Rewrite medical text with custom tone and format
 */
export const rewriteMedicalText = async (
  text: string,
  tone: 'formal' | 'casual' = 'casual',
  length: 'shorter' | 'longer' | 'same' = 'same'
): Promise<string> => {
  try {
    // Check if API is available
    if (!window.ai?.rewriter) {
      throw new Error('Rewriter API not available in this context. Please ensure Chrome 121+ is installed and AI APIs are enabled.');
    }

    // Check if rewriting is supported
    const canRewrite = await window.ai.rewriter.canRewrite();
    if (!canRewrite) {
      throw new Error('Rewriting not supported on this device. Please check Chrome settings.');
    }

    // Create rewriter session with custom options
    const rewriter = await window.ai.rewriter.create({
      tone,
      format: 'plain-text',
      length,
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    // Rewrite the text
    const result = await rewriter.rewrite(text);
    rewriter.destroy();
    return result;
  } catch (error) {
    console.error('Rewriter error:', error);
    throw error;
  }
};

