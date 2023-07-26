import { Platform } from "react-native";

export const callWhisperWithAudioUrl = async (
  uri: string,
  openAiKey: string
) => {
  const audioFileResponse = await fetch(uri);
  const audioFileBlob = await audioFileResponse.blob();

  const body = new FormData();

  if (Platform.OS === "web") {
    body.append(
      "file",
      new File([audioFileBlob], "something.m4a", { type: "audio/m4a" })
    );
  } else {
    body.append("file", {
      uri,
      name: "something.m4a",
      type: `audio/m4a`,
    } as unknown as Blob);
  }

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
  // headers["Content-Type"] = "multipart/form-data";
  headers["Authorization"] = `Bearer ${openAiKey}`;
  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "post",
      body,
      headers,
    }
  );

  if (response.ok) return await response.json();

  throw await response.json();
};
