import React, { useState } from "react";
import TestOne from "./TestOne";
import { Box, Heading, Image, Center, Stack, Button } from "@chakra-ui/react";

const App = () => {
  const [captain, setCaptain] = useState<"picard" | "kirk">("picard");

  return (
    <Box>
      <Center>
        <Heading as="h1" size="2xl">
          Trek Picker
        </Heading>
      </Center>
      <Center>
        <TestOne planet="Mars" />
      </Center>
      <Center>
        <Image src={`${captain}.jpg`} />
      </Center>
      <Center>
        <Stack direction={"row"} spacing={"2.5"}>
          <Button colorScheme="blue" onClick={() => setCaptain("picard")}>
            Picard
          </Button>
          <Button colorScheme="red" onClick={() => setCaptain("kirk")}>
            Kirk
          </Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default App;
