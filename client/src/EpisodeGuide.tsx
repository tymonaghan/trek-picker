import React from "react";
import { Link } from "react-router-dom";
import {
  VStack, Box, Heading, Center, Button,
  Card, CardBody, CardHeader, Text
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
          <Card>
            <CardHeader>
              <Heading as="h2" size="sm">Trek Picker</Heading>
            </CardHeader>
            <CardBody>
              <Text>Episode Guide incoming</Text>
            </CardBody>

          </Card>
        </Center>
      </VStack>
    </Box >

  )
}
export default EpisodeGuide
