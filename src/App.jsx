import './App.css'
import Booking from "./components/booking/NEWBooking"
import DocSelection from './components/doc-selection/DocSelection';
import MusicPlayer from './components/hayt/MPlayer';
import Home from './components/home/Home';
import Login from './components/login-register/SignIn-SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/nav-bar/NavBar';
import AboutUs from './components/about-us/AboutUs';
import Services from './components/services/Services'
// import {doc1SlotGenerator} from "./available-dates/available-dates"
// import {doc2SlotGenerator} from "./available-dates/available-dates"

function App() {
// const alinaS = new doc1SlotGenerator;
// console.log(JSON.stringify(alinaS.timeSlotsData)); // Generate the JSON data
// const andraP = new doc2SlotGenerator;
// console.log(JSON.stringify(andraP.timeSlotsData)); // Generate the JSON data

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="music-player" element={<MusicPlayer />}></Route>
            <Route path="/doc-selection" element={<DocSelection />} />
            {/* <Route path="/doc-selection" element={<DoctorSelection />} /> */}
            <Route path="/booking" element={<Booking/>}></Route>
            <Route path="/about-us" element={<AboutUs/>}></Route>
            <Route path="/services" element={<Services/>}></Route>

        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
