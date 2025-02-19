import { Box, Flex, Heading, Text, VStack, SimpleGrid, Icon } from '@chakra-ui/react';
import { FaHammer, FaCamera, FaComments } from 'react-icons/fa';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import { useAuth } from './contexts/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Photos from './pages/Photos';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

// PUBLIC HOME PAGE
function LandingPage() {
  return (
    <Flex direction="column" minH={'100vh'} bg="lightblue">
      <Box as="section" bg="green.700" color="black" px={8} py={4} boxShadow={'md'}>
        <Heading size="3xl" textAlign="center"> Proficiency </Heading>
      </Box>
      <Box as="section" bg="gray.200" py={12} px={8} textAlign="center">
        <VStack spacing={4}>
          <Heading size="xl"> 🛠️ Showcase Your Craftsmanship 🏗️ </Heading>
          <Text fontSize="lg" color="gray.600">
            Proficiency lets tradesmen highlight their work, share job sites, and connect with peers.
          </Text>
          <Text fontSize="lg" color="gray.600">
            Create a profile to get started adding your projects and connecting with other tradesmen.
          </Text>
        </VStack>
      </Box>
      <Box as="section" bg="gray.200" py={12} px={8}>
        <Heading size="lg" textAlign="center" mb={8}> Features to Work for You 🚀</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          <Box bg="gray.500" p={6} borderRadius="lg" boxShadow="lg" textAlign="center">
            <Icon as={FaHammer} w={10} h={10} color="green.400" mb={4} />
            <Heading size="md">Add Your Projects</Heading>
            <Text color="gray.200">Showcase jobs you've completed, from start to finish, with detailed descriptions.</Text>
          </Box>
          <Box bg="gray.50" p={6} borderRadius="lg" boxShadow="lg" textAlign="center">
            <Icon as={FaCamera} w={10} h={10} color="green.400" mb={4} />
            <Heading size="md">Photo Albums</Heading>
            <Text color="gray.600">Upload photos of your work, organize them into albums, and share with friends.</Text>
          </Box>
          <Box bg="gray.500" p={6} borderRadius="lg" boxShadow="lg" textAlign="center">
            <Icon as={FaComments} w={10} h={10} color="green.400" mb={4} />
            <Heading size="md">Connect & Chat</Heading>
            <Text color="gray.200">Message your peers, discuss projects, and collaborate on new opportunities.</Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Login/Signup Form, IMPORTED */}
      <AuthForm />

      <Box as="footer" bg="green.700" color="white" py={4} px={8} textAlign="center">
        <Text>Creator: Jacob Garland</Text>
      </Box>
    </Flex>
  )
}

// Layout for Protected Pages
function DashboardLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Route: Landing Page */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />

        {/* Protected Routes Inside Header */}
        <Route path="/" 
            element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
        >
        <Route index element={<Home />} />  {/* Default page after login */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/chat" element={<Chat />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
