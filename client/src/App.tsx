import Header from './components/Header';
import { useAuth } from './contexts/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Photos from './pages/Photos';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

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
        {user && (
          <Route path="/" 
            element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
          >
          <Route index element={<Home />} />  {/* Default page after login */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/chat" element={<Chat />} />
          </Route>
        )}

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
