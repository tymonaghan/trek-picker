import React, { useState } from "react";
import {
  VStack,
  Box, Heading, Image, Center, Stack, Button, Tooltip,
  Card, CardBody, CardHeader, CardFooter, Text
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom";
import UserContext from "./store/userContext";

const Home = () => {
  const user = React.useContext(UserContext); // Use the context
  const [captain, setCaptain] = useState<"picard" | "kirk">("picard");

  return (
    <Box>
      <VStack>
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
