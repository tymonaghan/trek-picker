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
      <Box height="64px" /> {/* Spacer for fixed navbar, now handled in App */}
      <VStack>
        <Center>
          <Card>
            <CardHeader>
              <Heading as="h2" size="sm">Your Profile</Heading>
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
        <Image src={`/${captain}.jpg`} />
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
