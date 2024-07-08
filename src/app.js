import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Guilds from "./components/guilds";
import Members from "./components/members";
import Navbar from "./components/navbar";

const App = () => (
  <Router>
    <div className="bg-[#ECEAE0] h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guilds" element={<Guilds />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  </Router>
);

export default App;
