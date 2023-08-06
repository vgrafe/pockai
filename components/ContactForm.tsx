import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { useElevenLabsVoices } from "@/lib/queries";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { VoiceSelector } from "./VoiceSelector";
import { Hr } from "./Hr";

type ContactFormProps = {
  contact: Contact;
  onSave: (contact: Contact) => void;
};

export default function ContactForm(props: ContactFormProps) {
  const [contact, setContact] = useState(props.contact);

  const { data: voices } = useElevenLabsVoices();

  const [selectingVoice, setSelectingVoice] = useState(false);

  if (selectingVoice)
    return (
      <VoiceSelector
        selectedVoiceId={contact.voiceId}
        onSelect={(voice) => {
          setContact({
            ...contact,
            voiceId: voice.voice_id,
            voiceName: voice.name,
          });
          setSelectingVoice(false);
        }}
      />
    );

  return (
    <View style={{ gap: 12, margin: 12 }}>
      <Text style={{ marginLeft: 4, fontWeight: "500" }}>name</Text>
      <TextInput
        value={contact.name}
        onChangeText={(name) => setContact({ ...contact, name })}
      />
      <Hr />
      <Text style={{ marginLeft: 4, fontWeight: "500" }}>personality</Text>
      <Text style={{ margin: 4, marginBottom: 12 }}>
        The following is what will be used for OpenAI's ChatGPT "system prompt".
        This is an initial prompt that is useful to describe personality you
        want to talk to. It is enhanced by the app to make the responses more
        human and less verbose.
      </Text>
      <TextInput
        value={contact?.personality}
        onChangeText={(personality) => {
          setContact({ ...contact!, personality });
        }}
        multiline
        numberOfLines={12}
        style={{ padding: 8, borderRadius: 8, fontSize: 16 }}
      />
      {voices?.voices.length && (
        <>
          <Hr />
          <Text style={{ marginLeft: 4, fontWeight: "500" }}>
            voice synthesis selection
          </Text>
          <Button
            title={contact.voiceName || "not set"}
            style={{
              alignSelf: "flex-start",
            }}
            onPress={() => setSelectingVoice(true)}
          />
        </>
      )}
      <Hr />
      <Button
        title="Save"
        onPress={() => {
          if (contact.name.length && contact.personality.length)
            props.onSave(contact);
        }}
      />
    </View>
  );
}
