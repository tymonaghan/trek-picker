import React from "react";
import { Center, Heading } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, TrekPicker } from "."

const App = () => {


  return (
    <BrowserRouter>
      <Center>
        <Heading as="h1" size="2xl">
          Trek Picker
        </Heading>
      </Center>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/picker" element={<TrekPicker />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
