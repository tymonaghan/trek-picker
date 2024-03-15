import React from "react";
import { Link } from "react-router-dom";
import {
  VStack, Box, Heading, Center, Button, Tooltip,
  Card, CardBody, CardHeader, Text
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons"


const TrekPicker = () => {
  return (
    <Box>
      <VStack>
        <Heading as="h1" size="2xl">
          Trek Picker
        </Heading>
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
              <Text>Trek Picker will go here!</Text>
            </CardBody>

          </Card>
        </Center>
      </VStack>
    </Box >

  )
}
export default TrekPicker
