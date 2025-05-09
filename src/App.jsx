import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap; 
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NaviBar  from "./Components/NaviBar"
import Contact from "./Pages/Contact";
import Img_2_Text from "./Pages/Img_2_Text";
import Qr_scanner from "./Pages/Image/Qr_scanner";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Signup />} />



          <Route element={<NaviBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/img_2_text" element={<Img_2_Text/>} />
            <Route path="/qr_scanner" element={<Qr_scanner/>} />
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
