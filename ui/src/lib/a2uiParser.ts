const DELIMITER = '---a2ui_JSON---';

export interface ParsedResponse {
  text: string;
  a2uiMessages: unknown[] | null;
}

/**
 * Some reasoning models (e.g. DeepSeek-R1, Qwen-thinking) emit <think>…</think>
 * blocks before the actual response. Strip them out entirely.
 */
function stripThinkingBlocks(raw: string): string {
  return raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

export function parseAgentResponse(raw: string): ParsedResponse {
  const cleaned = stripThinkingBlocks(raw);
  const delimIndex = cleaned.indexOf(DELIMITER);
  if (delimIndex === -1) {
    return { text: cleaned.trim(), a2uiMessages: null };
  }

  const rawText = cleaned.slice(0, delimIndex);
  const jsonPart = cleaned.slice(delimIndex + DELIMITER.length).trim();

  let a2uiMessages: unknown[] | null = null;
  try {
    const parsed = JSON.parse(jsonPart);
    a2uiMessages = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // malformed JSON — fall through with null
  }

  // When a2ui JSON was parsed successfully, the model may have leaked reasoning
  // text before its actual reply sentence. Use only the last non-empty line.
  let text: string;
  if (a2uiMessages) {
    const lastLine = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .at(-1) ?? '';
    text = lastLine;
  } else {
    text = rawText.trim();
  }

  return { text, a2uiMessages };
}

