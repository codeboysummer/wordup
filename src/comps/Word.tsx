import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import VoicetoText from "./VoicetoText";
import { useQuery } from "react-query";
import { Text,Box } from "@chakra-ui/react";
import styles from "../list.module.css";
import MoreOnThis from "./MoreOnThis";
import Instructions from "./Instructions";

interface FetchFunctions {
  fetchword: (word: String) => Promise<any>;
  fetchsyno: (word: String) => Promise<any>;
}
function hasSpace(s: string) {
  return s.indexOf(" ") >= 0;
}

const Word: React.FC<FetchFunctions> = ({ fetchword, fetchsyno }) => {
  let define: string = "";

  const [word, setword] = useState("run");
  const { data, status, isLoading, isFetching, isError, error } = useQuery(
    ["definition", word],
    () => fetchword(word)
  );
  const checkarrayitem = (array: []) => {
    let newarray = array.filter((item) => !hasSpace(item));

    return newarray.length
      ? newarray.map((item, i) => (
          <li
            className={styles.item}
            onClick={() => {
              setword(item);
            }}
            key={i}
          >
            <u>{item}</u>
          </li>
        ))
      : "no synonyms";
  };
  const {
    data: syno,
    isLoading: SLoading,
    isFetching: SFetching,
    isError: Sercror,
    error: synerror,
    status: SStatus,
  } = useQuery(["synonyms", word], () => fetchsyno(word));

  const getexample = () => {
    if (isLoading || isFetching) {
      return <>is loading</>;
    } else {
      if (isError) {
        return <>there was an error {error}</>;
      } else {
        try {
          if (
            typeof data[0]["meanings"][1]["definitions"][0]["example"] !==
            "undefined"
          ) {
            let example: string =
              data[0]["meanings"][1]["definitions"][0]["example"];
            return (
              <Text>
                {" "}
                example:
                <br /> {example}
              </Text>
            );
          }
        } catch (e) {
          return <>example not available</>;
        }
      }
    }
  };

  const getaudio = () => {
    if (isLoading || isFetching) {
      return <>is loading</>;
    } else {
      if (isError) {
        return <>there was an error {error}</>;
      } else {
        try {
          if (typeof data[0]['phonetics'][0]['audio'] !== "undefined") {
            let audio: string =
            data[0]['phonetics'][0]['audio']
              
            return <>
            {audio.length>0?
            <audio controls autoPlay>
  <source src={audio} type="audio/ogg"/>
Your browser does not support the audio element.
</audio>:<>there is no audio available</>}
            
            </>;
          }
        } catch (e) {
          return <>audio not available</>;
        }
      }
    }
  };
  


  const getdata = () => {
    if (isLoading || isFetching) {
      return <>is loading</>;
    } else {
      if (isError) {
        return <>there was an error {error}</>;
      } else {
        let definiton = data[0]["meanings"][0]["definitions"][0]["definition"];

        return definiton;
      }
    }
  };

  const getsyno = () => {
    if (SLoading || SFetching) {
      return <>is loading</>;
    } else {
      if (Sercror) {
        return "error";
      } else {
        let synonyms = syno["noun"]["syn"].slice(0, 4);

        return checkarrayitem(synonyms);
      }
    }
  };

  return (
    <>
      {isError || Sercror ? (
        <>
          <Heading color={"red"}>
            error we were not able to find the definition or synonyms of that word make sure you only use one word
          
          </Heading>

          <Heading
            cursor={"pointer"}
            borderBottom={"1px pink"}
            color={"hotpink"}
          >
            <a href="/"> retry here</a>
          </Heading>
        </>
      ) : (
        <VStack
          justifyContent={"space-around"}
          bg={" rgba(255, 255, 255, 0.75)"}
          borderRadius={20}
          w={"60%"}
          h={"70%"}
          p={"5%"}
          
        >
          <Box alignSelf={'right'}><Instructions/></Box>
          <VoicetoText word={word} setword={setword} />
          <Heading textAlign={'center'} alignSelf={"center"} size={["sm", "md", "lg"]}>
            {getdata()}
          </Heading>
          <Heading size={"xs"}>synonyms:</Heading>
          <ul className={styles.list}>{getsyno()}</ul>
          <Heading color={"white"}>{define}</Heading>
          <MoreOnThis word={word} getexample={getexample} data={data} getaudio={getaudio} />
        </VStack>
      )}
    </>
  );
};

export default Word;
