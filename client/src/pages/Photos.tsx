import { Box, Heading, Text, Grid, GridItem, VStack, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Photos() {
  const navigate = useNavigate();

  // Placeholder Albums (Replace with database query logic for users later)
  const albums = [
    { id: 1, name: "Drywall Project", cover: "/vite.svg" },
    { id: 2, name: "Carpentry Work", cover: "/vite.svg" },
    { id: 3, name: "Kitchen Remodel", cover: "/vite.svg" },
  ];

  return (
    <Box w="100vw" minH="100vh" py={10} bg="gray.200" px={{ base: 4, md: 10 }}>
      {/* Header Section */}
      <VStack spacing={4} align="center">
        <Heading size="xl" color="blue.500">
          My Photos 📸
        </Heading>
        <Text fontSize="lg" color="black" textAlign="center">
          Organize your work into albums. Click to view photos.
        </Text>
        <Button colorScheme="blue" mt={4}>Upload Photos</Button>
      </VStack>

      {/* Albums Grid */}
      {albums.length === 0 ? (
        <Box mt={8} borderWidth="1px" borderRadius="lg" p={6} textAlign="center">
          <Text fontSize="lg" color="black">
            No albums yet. Start adding your projects!
          </Text>
        </Box>
      ) : (
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mt={6}>
          {albums.map((album) => (
            <GridItem
              key={album.id}
              borderRadius="md"
              overflow="hidden"
              boxShadow="lg"
              cursor="pointer"
              onClick={() => navigate(`/photos/${album.id}`)} // Navigate to album page from database here
            >
              <Image src={album.cover} alt={album.name} objectFit="cover" w="100%" h="150px" />
              <Box p={3} bg="green.400" textAlign="center">
                <Text fontWeight="bold" color="black">{album.name}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
}