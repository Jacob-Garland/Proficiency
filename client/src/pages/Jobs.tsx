import { Box, Heading, VStack, Text, Button } from "@chakra-ui/react";

export default function Jobs() {
  return (
    <Box p={8} maxW="800px" mx="auto">
      <Heading mb={6}>My Jobs</Heading>
      <VStack spacing={4} align="stretch">
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Text fontSize="lg" fontWeight="bold">Job Title Example</Text>
          <Text>Job description goes here...</Text>
          <Button colorScheme="blue" mt={2}>View Details</Button>
        </Box>
      </VStack>
    </Box>
  );
}