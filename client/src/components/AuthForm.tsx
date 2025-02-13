import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";

export default function AuthForm() {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      console.log("Signing up with:", formData);
    } else {
      console.log("Logging in with:", formData);
      login(formData); // Mock login function for now
    }
  };

  return (
    <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <VStack spacing={4}>
        <Text fontSize="xl">{isSignup ? "Create an Account" : "Login"}</Text>

        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button colorScheme="green" width="full" onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Log In"}
        </Button>

        <Button
          variant="link"
          colorScheme="green"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Log in" : "Need an account? Sign up"}
        </Button>
      </VStack>
    </Box>
  );
}