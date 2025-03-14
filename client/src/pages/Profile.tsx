import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Box, Avatar, Text, VStack, Divider, Spinner } from "@chakra-ui/react";


const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Spinner />;
  }

  return (
    <Box maxW="800px" mx="auto" p={4}>
      {/* Profile Header */}
      <VStack spacing={4} align="center">
        <Avatar size="2xl" name={user.username} src={user.profilePic} />
        <Text fontSize="2xl" fontWeight="bold">{user.username}</Text>
        <Text fontSize="md" color="gray.500">{user.location || "Location not set"}</Text>
        <Text textAlign="center">{user.bio || "No bio available"}</Text>
      </VStack>

      <Divider my={6} />

      {/* Albums Section */}
      <Text fontSize="xl" fontWeight="bold" mb={3}>Albums</Text>
      <Box minH="150px" p={3} borderWidth={1} borderRadius="md">
        <Text>No albums yet.</Text>
      </Box>

      <Divider my={6} />

      {/* Recent Posts */}
      <Text fontSize="xl" fontWeight="bold" mb={3}>Recent Jobs</Text>
      <Box minH="150px" p={3} borderWidth={1} borderRadius="md">
        <Text>No posts yet.</Text>
      </Box>
    </Box>
  );
};

export default Profile;