import React from "react";
import { Link } from "react-router-dom";
import {
  VStack, Box, Heading, Center, Button,
  Card, Text
} from "@chakra-ui/react";

const EpisodeGuide = () => {
  return (
    <Box>
      <VStack>
        <Link to="/">
          <Button>
            Home
          </Button>
        </Link>
        <Button disabled>
          Trek Picker
        </Button>
        <Button disabled>Series & Episode Guide</Button>
        <Center>
          <Card.Root>
            <Card.Header>
              <Heading as="h2" size="sm">Trek Picker</Heading>
            </Card.Header>
            <Card.Body>
              <Text>Episode Guide incoming</Text>
            </Card.Body>

          </Card.Root>
        </Center>
      </VStack>
    </Box >

  )
}
export default EpisodeGuide
