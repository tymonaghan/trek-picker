import React from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, TrekPicker } from ".";
import { UserProvider } from "./store/userContext";
import Navbar from "./Navbar";
import EpisodeGuide from "./EpisodeGuide";

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Box height="64px" /> {/* Spacer for fixed navbar */}
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/picker" element={<TrekPicker />} />
          <Route path="/guide" element={<EpisodeGuide />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
