import React from 'react'
import {
    Modal,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,Text,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import {useDisclosure} from '@chakra-ui/react'
  
 

  interface props{
    word:any
    getexample: () => JSX.Element | undefined
   data:object
   getaudio:() => JSX.Element | undefined

  }


const MoreOnThis :React.FC<props> = ({word,getexample,getaudio}) => {
  

    const OverlayTwo = () => (
      
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2px'
        />
      )
      const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayTwo />)
  return (
    <><Button
    ml='4'
    onClick={() => {
      setOverlay(<OverlayTwo />)
      onOpen()
    }}
  >
    more on {word}
  </Button>
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    {overlay}
    <ModalContent>
      <ModalHeader>{word}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <>
        
        {getexample()}
        <br />
        {getaudio()}
        
        

        </>
        

      </ModalBody>
      <ModalFooter>
      <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal></>
  )
}

export default MoreOnThis