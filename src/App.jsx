import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NaviBar  from "./Components/NaviBar"
import Contact from "./Pages/Contact";

function App() {
  // const [count, setCount] = useState(0)

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
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
