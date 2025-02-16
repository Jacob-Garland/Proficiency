import { Outlet } from "react-router-dom";
import { Flex, Heading, Spacer, Button, IconButton } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../contexts/useAuth";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <>
      {/* Protected Header */}
      <Flex as="header" bg="teal.500" p={4} color="white" align="center">
        <Heading size="lg" cursor="pointer" onClick={() => window.location.href = "/dashboard"}>
          Proficiency
        </Heading>
        <Spacer />
        <Button colorScheme="teal" variant="ghost" onClick={() => window.location.href = "/profile"}>
          Profile
        </Button>
        <Button colorScheme="teal" variant="ghost" onClick={() => window.location.href = "/jobs"}>
          Jobs
        </Button>
        <Button colorScheme="teal" variant="ghost" onClick={() => window.location.href = "/photos"}>
          Photos
        </Button>
        <Button colorScheme="teal" variant="ghost" onClick={() => window.location.href = "/chat"}>
          Chat
        </Button>
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          colorScheme="red"
          ml={3}
          onClick={logout}
        />
      </Flex>

      {/* Protected Pages */}
      <Outlet />
    </>
  );
}