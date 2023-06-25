// const functions = [
//   {
//     name: "get_current_weather",
//     description: "Get the current weather in a given location",
//     parameters: {
//       type: "object",
//       properties: {
//         location: {
//           type: "string",
//           description: "The city and state, e.g. San Francisco, CA",
//         },
//         unit: { type: "string", enum: ["celsius", "fahrenheit"] },
//       },
//       required: ["location"],
//     },
//   },
// ];

export const callChatGPTWithConvo = async (
  messages: ChatCompletionRequestMessage[],
  openAiKey: string
) => {
  const req = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages,
      // functions,
    }),
  });

  return req.json();
};
