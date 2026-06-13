import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Resultpage from "./Pages/Resultpage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/result" element={<Resultpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
