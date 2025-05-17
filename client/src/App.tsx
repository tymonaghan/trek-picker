import React from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, TrekPicker } from ".";
import { UserProvider } from "./store/userContext";
import Navbar from "./Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box height="64px" /> {/* Spacer for fixed navbar */}
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/picker" element={<TrekPicker />} />
          {/* Add the guide route placeholder */}
          <Route path="/guide" element={<div>Series & Episode Guide coming soon!</div>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
