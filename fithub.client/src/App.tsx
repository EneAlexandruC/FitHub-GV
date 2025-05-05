import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./common/nav/Nav";
import Home from "./features/home/Home";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import UserProfile from "./features/user-profile/UserProfile";
import WorkoutBuilder from "./features/community/Community";
import Membership from "./features/membership/Membership";
import About from "./features/about/About";
import WorkoutsList from "./features/workouts/WorkoutsList";
import WorkoutDetail from "./features/workouts/WorkoutDetail";
import SearchResults from "./features/workouts/SearchResults";
import Faq from "./features/faq/faq";
import Footer from "./common/footer/Footer";
import AIChatWidget from "./features/AIChatWidget";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Main container with flex layout */}
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
          {/* Content area that grows */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/workout-builder" element={<ProtectedRoute><WorkoutBuilder /></ProtectedRoute>} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/about" element={<About />} />
              <Route path="/workouts" element={<WorkoutsList />} />
              <Route path="/workouts/:id" element={<WorkoutDetail />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/faq" element={<Faq />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
        {/* AIChatWidget remains outside the main flex container */}
        <AIChatWidget />
      </AuthProvider>
    </Router>
  );
}

export default App;
