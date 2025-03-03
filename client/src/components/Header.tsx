import { Box, Flex, Button, Divider, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box bg="green.700" p={4} color="white" boxShadow="lg">
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Flex flex="1" justify="center">
          <Button variant="link" color="white" fontSize="3xl" fontWeight="bold" onClick={() => { navigate("/home"); }}>
            Proficiency
          </Button>
        </Flex>

        {/* Hamburger Dropdown Menu */}
        <Menu>
        <MenuButton 
          as={IconButton} 
          icon={<HamburgerIcon />} 
          colorScheme="blue" 
          size="lg" 
          ml={6} />
        <MenuList bg="gray.300">
          {["home", "profile", "jobs", "photos", "chat", "settings"].map((route) => (
            <MenuItem 
              key={route}
              onClick={() => navigate(`/${route}`)}
              fontWeight="bold"
              color={location.pathname === `/${route}` ? "white" : "black"}
              bg={location.pathname === `/${route}` ? "blue.500" : "transparent"}
              _hover={{ bg: "blue.300", color: "white" }}
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            onClick={logout}
            fontWeight="bold"
            color="red.600"
            bg="transparent"
            _hover={{ bg: "red.400", color: "white" }}
            icon={<FiLogOut />}
          > Logout </MenuItem>
        </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}