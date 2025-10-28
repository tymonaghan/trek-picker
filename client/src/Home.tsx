import React, { useState } from "react";
import {
  VStack,
  Box, Heading, Image, Center, Stack, Button,
  Card, CardBody, CardHeader, CardFooter, Text
} from "@chakra-ui/react";
import UserContext from "./store/userContext";

const Home = () => {
  const user = React.useContext(UserContext); // Use the context
  const [captain, setCaptain] = useState<"picard" | "kirk">("picard");

  return (
    <Box>
      <VStack spacing={6}>
        <Center>
          <Card maxW="600px" w="full">
            <CardHeader>
              <Heading as="h2" size="md">Your Profile</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Welcome, {user.rank} {user.username !== 'unknown' ? user.username : null}
              </Text>
              <Text>
                Trek Picker User since 2024
              </Text>
            </CardBody>
            <CardFooter><Button>Edit Profile</Button></CardFooter>
          </Card>
        </Center>
        <Box>
          <Image 
            src={`/${captain}.jpg`} 
            alt={`Captain ${captain}`}
            maxW="400px"
            maxH="400px"
            objectFit="contain"
            borderRadius="md"
          />
        </Box>
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
      </VStack>
    </Box>
  )
}
export default Home
