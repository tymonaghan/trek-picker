import React from "react";
import { Center, Heading, Avatar, HStack } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EpisodeGuide, Home, TrekPicker } from "."
import { UserProvider } from "./store/userContext";

const App = () => {


  return (
    <BrowserRouter>
      <UserProvider>
        <HStack>

          <Center>
            <Heading as="h1" size="2xl">
              Trek Picker
            </Heading>
          </Center>
          <Avatar.Root size="sm">
            <Avatar.Fallback name="Tyler Monaghan" />
            <Avatar.Image src="/facepalm.png" />
          </Avatar.Root>
        </HStack>
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
