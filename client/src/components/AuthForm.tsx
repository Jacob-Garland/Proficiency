import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { Box, Button, Input, VStack, Text, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER, SIGNUP_USER } from "../graphql/mutations/userMutations";

export default function AuthForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const [loginMutation] = useMutation(LOGIN_USER);
  const [signupMutation] = useMutation(SIGNUP_USER);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Optimized handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting login for:", formState.email);

      if (isSignup) {
        const { data } = await signupMutation({ 
          variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password,
          }
        });
        if (data?.signup) {
          login(formState.email, formState.password);
        }
      } else {
        const { data } = await loginMutation({ 
          variables: {
            email: formState.email,
            password: formState.password,
          }
        });
        if (data?.login) {
          login(formState.email, formState.password);
        }
      }

      navigate('/home');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Flex as="section" flex={1} justify="center" align="center" py={12} px={8}>
      <Box bg="gray.300" p={8} borderRadius="lg" boxShadow="lg" w="full" maxW="md">
      <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Text fontSize="xl">{isSignup ? "Create an Account" : "Login"}</Text>

        {isSignup ? 
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              placeholder="Username"
              value={formState.username}
              onChange={handleChange}
              required
            />
          </FormControl>
        : null}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            required
        />
        </FormControl>

        <Button colorScheme="green" width="full" type="submit">
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
    </form>
    </Box>
  </Flex>
  );
}