import "./App.css";
import { IconContext } from "react-icons";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ManageBooking from "./components/booking/Manage-Bookings";
import DocSelection from "./components/doc-selection/DocSelection";
import Home from "./components/home/Home";
import LoginRegister from "./components/login-register/SignIn-SignUp";
import AboutUs from "./components/about-us/AboutUs";
import Services from "./components/services/Services";
import NavBar from "./components/nav-bar/NavBar";
import Faq from "./components/faq/Faq";
import { fetchAppointments, fetchAvailableDates,} from "./components/lib/booking-context";

export const AuthContext = React.createContext();
export const BookingContext = React.createContext();

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const userId = Number(localStorage.getItem("userId"));
  const [auth, setAuth] = useState({ accessToken, userId });
  const [availableDates, setAvailableDates] = useState();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableDates(setAvailableDates);
    if (accessToken && userId) {
      fetchAppointments(setAppointments,accessToken, userId, navigate)
    } 
  }, [accessToken, userId]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setAuth({ accessToken: storedToken, userId: Number(storedUserId) });
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <IconContext.Provider value={{}}>
        <BookingContext.Provider value={{ availableDates, setAvailableDates, appointments, setAppointments }}>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login-register" element={<LoginRegister />}
                ></Route>
                <Route path="/doc-selection" element={<DocSelection />} />
                <Route path="/booking/:therapist" element={<ManageBooking />}></Route>
                <Route path="/about-us" element={<AboutUs />}></Route>
                <Route path="/services" element={<Services />}></Route>
                <Route path="/faq" element={<Faq />}></Route>
              </Routes>
          </BookingContext.Provider>
        </IconContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;



