import React from "react";
import { Box, Center, Heading, Float, MenuRoot, MenuTrigger, MenuContent, MenuItem } from "@chakra-ui/react";
import { Tooltip } from "./components/ui/tooltip";
import { Avatar } from "./components/ui/avatar";
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
          <MenuRoot positioning={{ placement: "bottom-start" }}>
            <MenuTrigger asChild>
              <Float offset="6">
                <Avatar name="T Monny" src="/facepalm.png" />
              </Float>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="randomize">Randomize user</MenuItem>
              <MenuItem value="logout">Log Out</MenuItem>
            </MenuContent>
          </MenuRoot>
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
