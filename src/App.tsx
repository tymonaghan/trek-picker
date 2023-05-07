import React from "react";
import TestOne from "./TestOne";
import {
  Box,
  Heading,
  Text,
  Image,
  Center,
  Stack,
  Button,
} from "@chakra-ui/react";

const App = () => {
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
        <Image src="picard.jpg" />
      </Center>
      <Center>
        <Stack direction={"row"} spacing={"2.5"}>
          <Button colorScheme="blue">Red Pill</Button>
          <Button colorScheme="red">Blue Pill</Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default App;
