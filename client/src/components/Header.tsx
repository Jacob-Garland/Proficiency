import { Box, Flex, Spacer, Button, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex align="center">
        <Button variant="link" color="white" fontSize="xl" fontWeight="bold" onClick={() => navigate("/home")}>
          Proficiency
        </Button>

        <Spacer />

        {/* Logout Button */}
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          colorScheme="red"
          ml={3}
          onClick={logout}
        />

        {/* Hamburger Dropdown Menu */}
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} colorScheme="teal" />
          <MenuList>
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/jobs")}>Jobs</MenuItem>
            <MenuItem onClick={() => navigate("/photos")}>Photos</MenuItem>
            <MenuItem onClick={() => navigate("/chat")}>Chat</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}