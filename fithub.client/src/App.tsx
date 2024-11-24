import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import Home from "./features/home/Home";
import Nav from "./common/nav/Nav";
import Footer from "./common/footer/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
