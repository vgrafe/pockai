interface ChatCompletionRequestMessage {
  role: "user" | "assistant" | "system";
  content: string;
  name?: string;
}

interface Persona {
  personality: string;
  location: string;
  conversationStyle: string;
  resiliency: string;
}

interface Personality {
  name: string;
  description?: string;
  voiceName?: string;
  voiceId?: string;
}

type Contact = {
  id: string;
  name: string;
  prompt: string;
  voiceId?: string;
};
