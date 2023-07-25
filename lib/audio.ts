import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { useRef, useState } from "react";
import { Buffer } from "buffer";

export const useRecorder = ({
  onSoundRecorded,
}: {
  onSoundRecorded: (audio: Audio.Recording, minutesRecording: number) => void;
}) => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const timerRef = useRef(0);

  const startRecording = async () => {
    timerRef.current = Date.now();
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started...");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    const msRecording = Date.now() - timerRef.current;
    console.log("Stopping recording.");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    onSoundRecorded(recording, msRecording / 1000 / 60);
  };

  return {
    recording,
    startRecording,
    stopRecording,
  };
};

export const playSound = async (blob: Blob) => {
  const fr = new FileReader();
  fr.onload = async () => {
    const fileUri = `${FileSystem.documentDirectory}/something.mp3`;
    //@ts-expect-error
    const binaryData = new Uint8Array(fr.result);
    const base64String = Buffer.from(binaryData).toString("base64");

    await FileSystem.writeAsStringAsync(fileUri, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });

    return sound.playAsync();
  };

  fr.readAsArrayBuffer(blob);
};
