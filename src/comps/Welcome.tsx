import React from "react";
import { Heading, VStack,Text } from "@chakra-ui/react";
import VoicetoText from "./VoicetoText";

const Welcome = () => {
  return (
    <>
      <VStack>
        <Heading color={'white'}>Welcome! To </Heading>
        <Heading
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          WordUp{" "}
        </Heading>
        
        
      </VStack>
    </>
  );
};

export default Welcome;
