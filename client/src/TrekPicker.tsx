import React from "react";
import {
  VStack, Box, Heading, Center,
  Card, CardBody, Text
} from "@chakra-ui/react";

const TrekPicker = () => {
  return (
    <Box>
      <VStack spacing={6}>
        <Heading as="h1" size="xl">
          Trek Picker
        </Heading>
        <Center>
          <Card maxW="600px" w="full">
            <CardBody>
              <Text>Trek Picker will go here!</Text>
            </CardBody>
          </Card>
        </Center>
      </VStack>
    </Box>
  )
}
export default TrekPicker
