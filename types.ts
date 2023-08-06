interface ChatCompletionRequestMessage {
  role: "user" | "assistant" | "system";
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
