import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { VStack } from "@chakra-ui/react";
import VoicetoText from "./comps/VoicetoText";
import Welcome from "./comps/Welcome";
import Word from "./comps/Word";
const queryClient = new QueryClient();

export default function App() {
  const fetchword = async (word: String) => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }

    return res.json();
  };
  const fetchsyno = async (word: String) => {
    let url = `https://words.bighugelabs.com/api/2/b104974966695dadee1a67024b23dfde/${word}/json`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status}: ${await res.text()}`);
    }
    return res.json();
  };
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <VStack bg={"black"} h={"100vh"} w={"100%"}>
          <Welcome />
          <Word fetchword={fetchword} fetchsyno={fetchsyno} />
        </VStack>
      </>
    </QueryClientProvider>
  );
}
