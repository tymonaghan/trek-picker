import React from "react";
import { Box, Center, Heading, Avatar, HStack, Float } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EpisodeGuide, Home, TrekPicker } from "."
import { UserProvider } from "./store/userContext";

const App = () => {


  return (
    <BrowserRouter>
      <UserProvider>
        <Box position="relative">
          <Center>
            <Heading as="h1" size="4xl">
              Trek Picker
            </Heading>
          </Center>
          <Float offset="6">
            <Avatar.Root size="sm">
              <Avatar.Fallback name="Tyler Monaghan" />
              <Avatar.Image src="/facepalm.png" />
            </Avatar.Root>
          </Float>
        </Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/picker" element={<TrekPicker />} />
          <Route path="/episode-guide" element={<EpisodeGuide />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>

  );
};

export default App;
