import React, { useState } from "react";
import {
  VStack,
  Box, Heading, Image, Center, Stack, Button, Tooltip,
  Card, CardBody, CardHeader, CardFooter, Text
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom";



const Home = () => {
  const [captain, setCaptain] = useState<"picard" | "kirk">("picard");
  const rank = 'Cadet'
  const [username, setUsername] = useState("unknown");

  return (
    <Box>
      <VStack>
        <Heading as="h1" size="2xl">
          Trek Picker
        </Heading>
        <Link to="/picker">
          <Button rightIcon={<Tooltip label="Use a slot-machine style interface to find a Star Trek episode that matches your mood">
            <InfoIcon />
          </Tooltip>
          }>
            Trek Picker
          </Button>
        </Link>
        <Button>Series & Episode Guide</Button>
        <Center>
          <Card>
            <CardHeader>
              <Heading as="h2" size="sm">Your Profile</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Welcome, {rank} {username !== 'unknown' ? username : null}
              </Text>
              <Text>
                Trek Picker User since 2024
              </Text>
            </CardBody>
            <CardFooter><Button>Edit Profile</Button></CardFooter>
          </Card>
        </Center>
        <Image src={`${captain}.jpg`} />
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
