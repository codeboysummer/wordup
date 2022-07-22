import React from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import { Button, VStack, Heading, HStack, IconButton } from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition from "react-speech-recognition";
interface Props {
  word: string;

  setword: React.Dispatch<React.SetStateAction<string>>;
}
const VoicetoText: React.FC<Props> = ({ word, setword }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleListener = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  return (
    
    <>
      <VStack w={'100%'} h={'40%'} justifyContent={'space-around'}>
        <IconButton
          aria-label="iconbtn"
          variant={"outline"}
          onClick={handleListener}
          colorScheme={listening ? "red" : "blue"}
          icon={<FaMicrophone />}
        />
        <Heading color={"white"}>{word}</Heading>
        <Heading color={"white"}>{transcript}</Heading>
        <HStack>
          <Button onClick={resetTranscript}>clear</Button>
          <Button
            onClick={() =>
              transcript ? setword(transcript) : alert("enter word")
            }
          >
            Submit
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default VoicetoText;
