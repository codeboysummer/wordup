import React from "react";
import {FaQuestion} from 'react-icons/fa'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { Highlight } from '@chakra-ui/react'

const Instructions = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <IconButton  bgGradient="linear(to-l, #7928CA, #FF0080)" aria-label="button" icon={<FaQuestion/>}></IconButton>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Instructions</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
            <Highlight query='submit'  styles={{ px: '1', py: '1', bg: 'orange.100' }}>

to use word up click on the mic and say one word that you want the defintion for 
            after clicking submit you can also click on the synoyms for their defintions 
            said the wrong word? click Clear
</Highlight>
            </PopoverBody>

            <PopoverFooter>Enjoy!</PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

export default Instructions;
