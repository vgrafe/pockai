import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { useRef, useState } from "react";
import { Buffer } from "buffer";
import { Platform } from "react-native";

export const useRecorder = ({
  onSoundRecorded,
}: {
  onSoundRecorded: (audio: Audio.Recording, minutesRecording: number) => void;
}) => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [isRecording, setIsRecording] = useState(false);
  const timerRef = useRef(0);

  const startRecording = async () => {
    timerRef.current = Date.now();
    try {
      console.log("Recording started...");
      setIsRecording(true);

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    const msRecording = Date.now() - timerRef.current;
    console.log("Stopping recording.");
    setIsRecording(false);

    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    onSoundRecorded(recording, msRecording / 1000 / 60);
  };

  return {
    isRecording,
    recording,
    startRecording,
    stopRecording,
  };
};

export const playSound = async (blob: Blob) => {
  if (Platform.OS === "web") {
    return playSoundWeb(blob);
  } else {
    return playSoundNative(blob);
  }
};

const playSoundWeb = async (blob: Blob) => {
  return new Promise<AudioBufferSourceNode>(async (resolve) => {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new window.AudioContext();
    const source = audioContext.createBufferSource();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
    source.onended = () => {
      resolve(source);
    };
  });
};

const playSoundNative = async (blob: Blob) => {
  return new Promise<Audio.Sound>((resolve) => {
    const fr = new FileReader();
    fr.onload = async () => {
      if (!(fr.result instanceof ArrayBuffer)) return;

      const fileUri = `${FileSystem.documentDirectory}/something.mp3`;
      const binaryData = new Uint8Array(fr.result);
      const base64String = Buffer.from(binaryData).toString("base64");

      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { sound } = await Audio.Sound.createAsync({ uri: fileUri });

      await sound.playAsync();
      resolve(sound);
    };

    fr.readAsArrayBuffer(blob);
  });
};

export const uriToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const uriToBase64 = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => {
      if (!(fr.result instanceof ArrayBuffer)) return;
      const binaryData = new Uint8Array(fr.result);
      const base64String = Buffer.from(binaryData).toString("base64");
      resolve(base64String);
    };
    fr.readAsArrayBuffer(blob);
  });
};
