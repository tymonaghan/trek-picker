import React, { useState } from "react";
import {
  VStack,
  Box,
  Heading,
  Image,
  Center,
  Stack,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavCard = ({
  title,
  description,
  to,
  colorScheme = "teal",
}: {
  title: string;
  description: string;
  to: string;
  colorScheme?: string;
}) => (
  <Card variant="outline" _hover={{ boxShadow: "md", borderColor: `${colorScheme}.400` }} transition="all 0.2s">
    <CardHeader pb={1}>
      <Heading as="h3" size="md">
        {title}
      </Heading>
    </CardHeader>
    <CardBody pt={1}>
      <Text color="gray.600">{description}</Text>
    </CardBody>
    <CardFooter>
      <Button as={Link} to={to} colorScheme={colorScheme} size="sm">
        Open
      </Button>
    </CardFooter>
  </Card>
);

const Home = () => {
  const [captain, setCaptain] = useState<"picard" | "kirk">("picard");

  return (
    <Box maxW="900px" mx="auto" px={4} py={8}>
      <VStack spacing={10} align="stretch">
        {/* Hero */}
        <Center flexDirection="column" textAlign="center" gap={3}>
          <Heading as="h1" size="2xl">
            Trek Picker
          </Heading>
          <Text fontSize="lg" color="gray.500" maxW="540px">
            Your personal guide to Star Trek. Find the perfect episode for your
            mood, or browse the complete episode guide.
          </Text>
        </Center>

        {/* Nav cards */}
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
          <NavCard
            title="Trek Picker"
            description="Answer a few quick questions and get a personalized episode recommendation."
            to="/picker"
            colorScheme="blue"
          />
          <NavCard
            title="Episode Guide"
            description="Browse every series, season, and episode in the Star Trek universe."
            to="/guide"
            colorScheme="teal"
          />
        </SimpleGrid>

        {/* Recently viewed — placeholder for future localStorage/DB integration */}
        <Box>
          <Heading as="h2" size="md" mb={4}>
            Recently Viewed
          </Heading>
          <Box
            border="1px dashed"
            borderColor="gray.300"
            borderRadius="md"
            p={8}
            textAlign="center"
            color="gray.400"
          >
            <Text>Your recently viewed episodes and series will appear here.</Text>
          </Box>
        </Box>

        {/* Captain toggle — fun widget */}
        <Center flexDirection="column" gap={4}>
          <Image src={`/${captain}.jpg`} maxW="320px" borderRadius="md" />
          <Stack direction="row" spacing={3}>
            <Button
              colorScheme="blue"
              variant={captain === "picard" ? "solid" : "outline"}
              onClick={() => setCaptain("picard")}
            >
              Picard
            </Button>
            <Button
              colorScheme="red"
              variant={captain === "kirk" ? "solid" : "outline"}
              onClick={() => setCaptain("kirk")}
            >
              Kirk
            </Button>
          </Stack>
        </Center>
      </VStack>
    </Box>
  );
};

export default Home;

