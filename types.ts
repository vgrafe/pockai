type OpenAiRole = "user" | "assistant" | "system";

interface ChatCompletionRequestMessage {
  role: OpenAiRole;
  content: string;
  name?: string;
}

type Contact = {
  name: string;
  personality: string;
  voiceId?: string;
  voiceName?: string;
  history: ChatCompletionRequestMessage[];
};

type Voice = { name: string; voice_id: string };
