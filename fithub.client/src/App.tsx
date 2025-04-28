import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./common/nav/Nav";
import Home from "./features/home/Home";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import UserProfile from "./features/user-profile/UserProfile";
import Membership from "./features/membership/Membership";
import Community from "./features/community/Community";
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
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/workouts" element={<WorkoutsList />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        <Footer />
        <AIChatWidget />
      </AuthProvider>
    </Router>
  );
}

export default App;
