import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

export default function AuthForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const [loginMutation] = useMutation(LOGIN);
  const [signupMutation] = useMutation(SIGNUP);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = isSignup
        ? await signupMutation({ variables: { email, password } })
        : await loginMutation({ variables: { email, password } });

      if (data) {
        const token = isSignup ? data.signup.token : data.login.token;
        login(token, { id: "", name: "", email });
      }
    } catch (error) {
      console.error("Error:", error);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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