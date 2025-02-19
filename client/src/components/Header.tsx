import { Box, Flex, Spacer, Button, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box bg="green.700" p={4} color="white">
      <Flex align="center" alignContent={"center"}>
        {/* Logo */}
        <Button variant="link" color="white" fontSize="3xl" fontWeight="bold" onClick={() => { navigate("/home"); }}>
          Proficiency
        </Button>

        <Spacer />

        {/* Logout Button */}
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          colorScheme="red"
          ml={3}
          size={"lg"}
          onClick={logout}
        />

        {/* Hamburger Dropdown Menu */}
        <Menu>
        <MenuButton 
          as={IconButton} 
          icon={<HamburgerIcon />} 
          colorScheme="blue" 
          size="lg" 
          ml={6} />
        <MenuList bg="gray.300">
            <MenuItem 
              onClick={() => { navigate("/home"); }}
              fontWeight="bold"
              color={location.pathname === "/home" ? "white" : "black"}
              bg={location.pathname === "/home" ? "blue.500" : "transparent"}
              _hover={{ bg: "blue.300", color: "white" }}
            > Home </MenuItem>
            <MenuItem 
              onClick={() => { navigate("/profile"); }}
              fontWeight="bold"
              color={location.pathname === "/profile" ? "white" : "black"}
              bg={location.pathname === "/profile" ? "blue.500" : "transparent"}
              _hover={{ bg: "blue.300", color: "white" }}
            > Profile </MenuItem>
            <MenuItem 
              onClick={() => { navigate("/jobs"); }}
              fontWeight="bold"
              color={location.pathname === "/jobs" ? "white" : "black"}
              bg={location.pathname === "/jobs" ? "blue.500" : "transparent"}
              _hover={{ bg: "blue.300", color: "white" }}
            > Jobs </MenuItem>
            <MenuItem 
              onClick={() => { navigate("/photos"); }}
              fontWeight="bold"
              color={location.pathname === "/photos" ? "white" : "black"}
              bg={location.pathname === "/photos" ? "blue.500" : "transparent"}
              _hover={{ bg: "blue.300", color: "white" }}
            > Photos </MenuItem>
            <MenuItem 
              onClick={() => { navigate("/chat"); }}
              fontWeight="bold"
              color={location.pathname === "/chat" ? "white" : "black"}
              bg={location.pathname === "/chat" ? "blue.500" : "transparent"}
              _hover={{ bg: "blue.300", color: "white" }}
            > Chat </MenuItem>
        </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}