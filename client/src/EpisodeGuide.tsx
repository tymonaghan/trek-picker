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
  Button,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon, EditIcon } from "@chakra-ui/icons";

interface Episode {
  id: number;
  title: string;
  episodeNumber: number;
  airDate?: string;
  description?: string;
}

interface Season {
  id: number;
  seasonNumber: number;
  episodes?: Episode[];
}

interface Series {
  id: number;
  name: string;
  abbreviation: string;
  description: string;
  releaseYear: number;
  seasons: Season[];
}

const SELECTED_SERIES_KEY = 'selectedSeriesId';

const EpisodeGuide = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSeasons, setExpandedSeasons] = useState<Set<number>>(new Set());

  // Load selected series from localStorage on mount
  useEffect(() => {
    const savedSeriesId = localStorage.getItem(SELECTED_SERIES_KEY);
    if (savedSeriesId) {
      fetchSeriesDetail(parseInt(savedSeriesId));
    } else {
      fetchAllSeries();
    }
  }, []);

  const fetchAllSeries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/series');
      if (!response.ok) {
        throw new Error(`Failed to fetch series: ${response.statusText}`);
      }
      const data = await response.json();
      setSeries(data);
      setSelectedSeries(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching series:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeriesDetail = async (seriesId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/series/${seriesId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch series: ${response.statusText}`);
      }
      const data = await response.json();
      setSelectedSeries(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching series:', err);
      // If fetch fails, clear saved selection and show series list
      localStorage.removeItem(SELECTED_SERIES_KEY);
      fetchAllSeries();
    } finally {
      setLoading(false);
    }
  };

  const handleSeriesSelect = (seriesId: number) => {
    localStorage.setItem(SELECTED_SERIES_KEY, seriesId.toString());
    fetchSeriesDetail(seriesId);
  };

  const handleEditSeries = () => {
    localStorage.removeItem(SELECTED_SERIES_KEY);
    setSelectedSeries(null);
    fetchAllSeries();
  };

  const toggleSeason = (seasonId: number) => {
    setExpandedSeasons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(seasonId)) {
        newSet.delete(seasonId);
      } else {
        newSet.add(seasonId);
      }
      return newSet;
    });
  };

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

  // Show episode tree view if a series is selected
  if (selectedSeries) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          {/* Header with selected series info */}
          <HStack justify="space-between" align="center" p={4} bg="blue.50" borderRadius="md">
            <HStack spacing={3}>
              <Heading as="h1" size="xl">
                {selectedSeries.name}
              </Heading>
              {selectedSeries.abbreviation && (
                <Badge colorScheme="blue" fontSize="md">
                  {selectedSeries.abbreviation}
                </Badge>
              )}
              {selectedSeries.releaseYear && (
                <Badge colorScheme="purple" fontSize="md">
                  {selectedSeries.releaseYear}
                </Badge>
              )}
            </HStack>
            <Button
              leftIcon={<EditIcon />}
              colorScheme="blue"
              variant="outline"
              size="sm"
              onClick={handleEditSeries}
            >
              Change Series
            </Button>
          </HStack>

          {/* Episode tree */}
          {selectedSeries.seasons.length === 0 ? (
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>No seasons found</AlertTitle>
                <AlertDescription>
                  This series doesn't have any seasons in the database yet.
                </AlertDescription>
              </Box>
            </Alert>
          ) : (
            <VStack spacing={2} align="stretch">
              {selectedSeries.seasons.map((season) => (
                <Box key={season.id}>
                  <Card variant="outline">
                    <CardBody p={3}>
                      <HStack
                        spacing={2}
                        cursor="pointer"
                        onClick={() => toggleSeason(season.id)}
                        _hover={{ bg: "gray.50" }}
                        p={2}
                        borderRadius="md"
                        transition="all 0.2s"
                      >
                        <IconButton
                          aria-label={expandedSeasons.has(season.id) ? "Collapse season" : "Expand season"}
                          icon={expandedSeasons.has(season.id) ? <ChevronDownIcon /> : <ChevronRightIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSeason(season.id);
                          }}
                        />
                        <Heading as="h3" size="md">
                          Season {season.seasonNumber}
                        </Heading>
                        <Badge colorScheme="gray">
                          {season.episodes?.length || 0} episodes
                        </Badge>
                      </HStack>

                      <Collapse in={expandedSeasons.has(season.id)} animateOpacity>
                        <VStack align="stretch" spacing={2} mt={3} ml={10}>
                          {season.episodes && season.episodes.length > 0 ? (
                            season.episodes.map((episode) => (
                              <Box
                                key={episode.id}
                                p={3}
                                bg="white"
                                borderWidth="1px"
                                borderRadius="md"
                                _hover={{ bg: "gray.50", shadow: "sm" }}
                                transition="all 0.2s"
                              >
                                <HStack justify="space-between" mb={1}>
                                  <HStack spacing={2}>
                                    <Badge colorScheme="blue">
                                      Episode {episode.episodeNumber}
                                    </Badge>
                                    <Text fontWeight="semibold">
                                      {episode.title}
                                    </Text>
                                  </HStack>
                                  {episode.airDate && (
                                    <Text fontSize="sm" color="gray.500">
                                      {new Date(episode.airDate).toLocaleDateString()}
                                    </Text>
                                  )}
                                </HStack>
                                {episode.description && (
                                  <Text fontSize="sm" color="gray.600" mt={2}>
                                    {episode.description}
                                  </Text>
                                )}
                              </Box>
                            ))
                          ) : (
                            <Text color="gray.500" fontSize="sm" ml={2}>
                              No episodes available for this season
                            </Text>
                          )}
                        </VStack>
                      </Collapse>
                    </CardBody>
                  </Card>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Container>
    );
  }

  // Show series selection view
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Star Trek Episode Guide
          </Heading>
          <Text fontSize="md" color="gray.600">
            Select a series to browse episodes
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
              <Card
                key={show.id}
                variant="outline"
                _hover={{ shadow: "md", cursor: "pointer" }}
                transition="all 0.2s"
                onClick={() => handleSeriesSelect(show.id)}
              >
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between" align="start">
                      <Box>
                        <Heading as="h2" size="md" mb={1}>
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
