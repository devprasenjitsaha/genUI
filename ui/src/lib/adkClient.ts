const ADK_BASE = '/api';
const APP_NAME = 'a2ui_agent';

export async function createSession(userId: string): Promise<string> {
  const resp = await fetch(
    `${ADK_BASE}/apps/${APP_NAME}/users/${userId}/sessions`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }
  );
  if (!resp.ok) throw new Error(`Failed to create session: ${resp.statusText}`);
  const data = await resp.json();
  return data.id as string;
}

export interface AgentEvent {
  author?: string;
  content?: {
    role: string;
    parts: Array<{
      text?: string;
      function_call?: unknown;
      function_response?: unknown;
    }>;
  };
  partial?: boolean;
  is_final_response?: boolean;
  error_message?: string;
}

export async function* streamMessage(
  userId: string,
  sessionId: string,
  text: string
): AsyncGenerator<AgentEvent> {
  const resp = await fetch(`${ADK_BASE}/run_sse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_name: APP_NAME,
      user_id: userId,
      session_id: sessionId,
      new_message: {
        role: 'user',
        parts: [{ text }],
      },
      streaming: false,
    }),
  });

  if (!resp.ok) throw new Error(`ADK request failed: ${resp.statusText}`);

  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const jsonStr = line.slice(6).trim();
      if (!jsonStr || jsonStr === '[DONE]') continue;
      try {
        yield JSON.parse(jsonStr) as AgentEvent;
      } catch {
        // skip malformed event
      }
    }
  }
}
