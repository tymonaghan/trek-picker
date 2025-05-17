import React from "react";
import { Flex, Spacer, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding={4} bg="gray.700" color="white" mb={8} position="fixed" top={0} left={0} width="100%" zIndex={1000} boxShadow="md">
    <HStack spacing={6} align="center">
      <ChakraLink as={Link} to="/" fontWeight="bold" fontSize={{ base: "md", md: "lg" }} _hover={{ textDecoration: "none", color: "teal.200" }}>
        Home
      </ChakraLink>
      <ChakraLink as={Link} to="/picker" fontSize={{ base: "sm", md: "md" }} _hover={{ color: "teal.200" }}>
        Picker
      </ChakraLink>
      <ChakraLink as={Link} to="/guide" fontSize={{ base: "sm", md: "md" }} _hover={{ color: "teal.200" }}>
        Episodes
      </ChakraLink>
    </HStack>
    <Spacer />
  </Flex>
);

export default Navbar;
