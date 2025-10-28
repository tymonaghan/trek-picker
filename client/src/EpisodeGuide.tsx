import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Card,
  CardBody,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface Season {
  id: number;
  seasonNumber: number;
}

interface Series {
  id: number;
  name: string;
  abbreviation: string;
  description: string;
  releaseYear: number;
  seasons: Season[];
}

const EpisodeGuide = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/series');
        if (!response.ok) {
          throw new Error(`Failed to fetch series: ${response.statusText}`);
        }
        const data = await response.json();
        setSeries(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching series:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>Loading Star Trek series...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Error loading series</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={2}>
            Star Trek Episode Guide
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Browse all Star Trek series and their episodes
          </Text>
        </Box>

        {series.length === 0 ? (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>No series found</AlertTitle>
              <AlertDescription>
                The database appears to be empty. Run the seed script to populate it with Star Trek data.
              </AlertDescription>
            </Box>
          </Alert>
        ) : (
          <VStack spacing={4} align="stretch">
            {series.map((show) => (
              <Card key={show.id} variant="outline" _hover={{ shadow: "md" }} transition="all 0.2s">
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between" align="start">
                      <Box>
                        <Heading as="h2" size="lg" mb={1}>
                          {show.name}
                        </Heading>
                        {show.abbreviation && (
                          <Badge colorScheme="blue" fontSize="sm" mb={2}>
                            {show.abbreviation}
                          </Badge>
                        )}
                      </Box>
                      {show.releaseYear && (
                        <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                          {show.releaseYear}
                        </Badge>
                      )}
                    </HStack>

                    {show.description && (
                      <Text color="gray.700" fontSize="md">
                        {show.description}
                      </Text>
                    )}

                    <HStack spacing={2}>
                      <Text fontWeight="semibold" color="gray.600">
                        Seasons:
                      </Text>
                      <Text color="gray.600">
                        {show.seasons.length} {show.seasons.length === 1 ? 'season' : 'seasons'}
                      </Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default EpisodeGuide;
