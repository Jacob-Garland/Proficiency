import { Box, Flex, VStack, Text, Input, Button } from "@chakra-ui/react";

export default function Chat() {
  return (
    <Flex h="100vh" bg="gray.800" color="white">
      {/* Friends List */}
      <VStack w="25%" p={4} bg="gray.700" spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold">Friends</Text>
        <Button variant="ghost" colorScheme="blue">Friend 1</Button>
        <Button variant="ghost" colorScheme="blue">Friend 2</Button>
      </VStack>
      
      {/* Chat Window */}
      <Flex flex={1} direction="column" p={4}>
        <Box flex={1} overflowY="auto" p={4} bg="gray.900" borderRadius="md">
          <Text bg="blue.500" p={2} borderRadius="lg" maxW="60%">Hello!</Text>
        </Box>
        <Flex mt={4}>
          <Input placeholder="Type a message..." bg="white" color="black" flex={1} mr={2} />
          <Button colorScheme="blue">Send</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}