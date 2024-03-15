import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, TrekPicker } from "."

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/picker" element={<TrekPicker />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
