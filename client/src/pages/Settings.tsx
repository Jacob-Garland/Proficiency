import { Box, Heading, VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

// Settings Page still needs logic to update user settings and more added to it
export default function Settings() {
  return (
    <Box p={8} maxW="600px" mx="auto">
      <Heading mb={6}>Account Settings</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder="Your username" />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Your email" />
        </FormControl>
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input type="password" placeholder="New password" />
        </FormControl>
        <Button colorScheme="blue">Save Changes</Button>
      </VStack>
    </Box>
  );
}