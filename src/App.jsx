import "./App.css";
import { IconContext } from "react-icons";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageBooking from "./components/booking/NEWBooking";
import DocSelection from "./components/doc-selection/DocSelection";
import Home from "./components/home/Home";
import LoginRegister from "./components/login-register/SignIn-SignUp";
import AboutUs from "./components/about-us/AboutUs";
import Services from "./components/services/Services";
import NavBar from "./components/nav-bar/NavBar";
// import MusicPlayer from './components/how-are-you/MPlayer';
// import {doc1SlotGenerator} from "./available-dates/available-dates"
// import {doc2SlotGenerator} from "./available-dates/available-dates"
export const AuthContext = React.createContext();

function App() {
  // const alinaS = new doc1SlotGenerator;
  // console.log(JSON.stringify(alinaS.timeSlotsData)); // Generate the JSON data
  // const andraP = new doc2SlotGenerator;
  // console.log(JSON.stringify(andraP.timeSlotsData)); // Generate the JSON data
  const accessToken = localStorage.getItem("accessToken");
  const [auth, setAuth] = useState(accessToken);

  return (
    <>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <IconContext.Provider value={{}}>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login-register" element={<LoginRegister />}></Route>
                {/* <Route path="music-player" element={<MusicPlayer />}></Route> */}
                <Route path="/doc-selection" element={<DocSelection />} />
                {/* <Route path="/doc-selection" element={<DoctorSelection />} /> */}
                
                {/* --------VERSION below is path USING useLocation() version -------- */}
                {/* <Route path="/booking/:therapist" element={<Booking />}></Route> */}

                {/*------- VERSION below is path USING useParams() version --------- */}
                <Route path="/booking/:therapist" element={<ManageBooking />}></Route>
                <Route path="/about-us" element={<AboutUs />}></Route>
                <Route path="/services" element={<Services />}></Route>
              </Routes>
            </BrowserRouter>
          </IconContext.Provider>
        </AuthContext.Provider>
    </>
  );
}

export default App;