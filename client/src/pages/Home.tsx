import { Box, Button, VStack, Flex, Text, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useBreakpointValue } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Dummy friend list (replace with actual data query later)
  const [friends] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
  ]);

  return (
    <Flex minH="100vh">
      {/* Sidebar (Hidden on Mobile) */}
      {!isMobile && (
        <Box w="250px" bg="gray.300" p={4} boxShadow="lg">
          <Text fontSize="xl" fontWeight="bold" mb={3}>
            Friends
          </Text>
          <VStack align="start" spacing={2}>
            {friends.map((friend) => (
              <Button 
                key={friend.id} 
                variant="ghost" 
                colorScheme="blue"
                onClick={() => navigate(`/profile/${friend.id}`)}
              >
                {friend.name}
              </Button>
            ))}
          </VStack>
        </Box>
      )}

      {/* Feed Container */}
      <Box flex="1" p={6} bg="gray.200">
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold" color={"black"}>
            Home Feed
          </Text>
          <Flex gap={2}>
            <Button colorScheme="blue" onClick={() => console.log("Add Job")}>
              Add Job
            </Button>
            <Button colorScheme="green" onClick={() => console.log("Add Post")}>
              Add Post
            </Button>
          </Flex>
        </Flex>

        <Box bg="white" boxShadow="lg" borderRadius="md" minH="80vh" p={4}>
          {/* Placeholder for User Post Cards */}
          <Text textAlign="center" color="black">
            No posts  to display yet. Start by adding a post, job, or friends!
          </Text>
        </Box>
      </Box>

      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <>
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            position="absolute"
            top={4}
            left={4}
            zIndex={10}
            colorScheme="blue"
            aria-label="Open Sidebar"
          />
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Friends</DrawerHeader>
              <DrawerBody>
                <VStack align="start" spacing={2}>
                  {friends.map((friend) => (
                    <Button 
                      key={friend.id} 
                      variant="ghost" 
                      colorScheme="green"
                      onClick={() => navigate(`/profile/${friend.id}`)}
                    >
                      {friend.name}
                    </Button>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Flex>
  );
}