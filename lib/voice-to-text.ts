export const callWhisperWithAudioUrl = async (
  uri: string,
  openAiKey: string
) => {
  const body = new FormData();
  //@ts-expect-error
  body.append("file", {
    // @ts-ignore
    uri,
    name: "something.m4a",
    type: `audio/m4a`,
  });

  body.append("model", "whisper-1");
  body.append("language", "en");
  // if (whisperConfig?.prompt) {
  //   body.append("prompt", whisperConfig.prompt);
  // }
  // if (whisperConfig?.response_format) {
  //   body.append("response_format", whisperConfig.response_format);
  // }
  // if (whisperConfig?.temperature) {
  //   body.append("temperature", `${whisperConfig.temperature}`);
  // }
  let headers: Record<string, string> = {};
  headers["Content-Type"] = "multipart/form-data";
  headers["Authorization"] = `Bearer ${openAiKey}`;
  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "post",
      body,
      headers,
    }
  );

  const data = await response.json();

  return data.text;
};
