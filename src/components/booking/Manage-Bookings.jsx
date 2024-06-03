import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserUpdates from "../b-user-appointments/UserAppointments"
import DateTimeSelector from "../datetime-selector/DateTimeSelector";
import { AuthContext, BookingContext } from "../../App";
import { updateDB } from "./updateDB";
import {formatDate} from "../lib/format-dates";
import "./Booking.css";
import ModalAction from "../modal/Modal";

/**
 * "Manage-Booking" component facilitates the booking and management of appointments by allowing users to interact with separate components also, like "USerAppointment" and "DateTimeSelector" 
 * *functionality: select available slots, submit new bookings, and view or delete existing appointments
*/ 
function ManageBooking() {
  const { auth } = useContext(AuthContext);
  const { therapist } = useParams();
  const navigate = useNavigate();
  const { availableDates, setAvailableDates, setAppointments } = useContext(BookingContext);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [docSlots, setDocSlots] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  // update the "docSlots" (that is send as props to "DateTimeSelector") each time therapist and "availableDates" change
  useEffect(() => {
    if (therapist && availableDates) {
      setDocSlots(availableDates[therapist]);
    }
  }, [therapist, availableDates]);

  // function that manages the date & selection in the UI
  function dateTimeSelection(date, time) {
    setSelectedDate(date);
    setSelectedTime(time);
  }

  // function that manages booking submit
  async function bookingSubmit(event) {
    event.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time slot.')
      return;
    }  
    if (!auth.accessToken) {
      navigate("/login-register");
      return;
    }
    const newBooking = {
      userId: Number(auth.userId),
      therapist,
      date: selectedDate,
      time: selectedTime,
      dayId: selectedDate.id
    }

    try {
      const response = await fetch(`http://localhost:3000/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify(newBooking),
      });
      const addApptResponse = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // update the appointments state in BookingContext (post successful fetch action above)
      setAppointments(prevAppointments => [...prevAppointments, addApptResponse]);
      
      // update the state for overall availabilities db (see below function)
      updateAvailableDates(addApptResponse, 'add');

      // triggers for modal interaction
      setModalMsg('Appointment added successfully.')
      setError(false);
      setViewModal(true);

    } catch (error) {
      // triggers for modal interaction
      setModalMsg('Booking failed. Please refresh and try again.')
      setError(true);
      setViewModal(true);
    }
  }

  /**
  * Function updates the state for overall availabilities db ("availableDates")  based on actions such as adding or deleting an appointment
  *receives params from both "deleteBooking" from component "UserAppointments"  as well ass "bookingSubmit" function from existing component
  */
  function updateAvailableDates(appointment, action) {
    setAvailableDates(prevDates => {
      //creates a copy of the previous dates state
      const updatedDates = { ...prevDates };
      // retrieves the array of available dates for the specific therapist, finds the specific date and time slot that matches the appointment date
      const therapistDates = updatedDates[appointment.therapist];
      const selectedDay = therapistDates.find(elem => elem.date === appointment.date);
      const selectedSlot = selectedDay.slots.find(slot => slot.time === appointment.time);
      
      // updates the availability status of the selected slot based on the action
      if (action === 'add') {
        selectedSlot.available = false;
      } else if (action === 'delete') {
        selectedSlot.available = true;
      }

      // calls the utility function "updateDB"  updates the database with the new availability data
      // it passes the appointment object, the updated dates, and the access token for authentication.
      updateDB(appointment, updatedDates, auth.accessToken)
      
      //return the "updatedDates" to update the state
      return updatedDates;
    });
  }

  return (
    <div className="booking-container">
      <h1>Book & Manage Appointments</h1>
      <h2>Browse through the calendar for the suitable date & time for your next appointment</h2>
      {auth.accessToken && auth.userId ? 
        <UserUpdates onChange={updateAvailableDates} auth={auth} setAppointments={setAppointments}/>
      : ''}  
      <form className="booking-form-time" onSubmit={bookingSubmit}>
        <DateTimeSelector
          availableSlots={docSlots}
          onSelect={dateTimeSelection}
          auth={auth}
        />
        <div>
        {selectedDate && (
            <p className="selection">
              Selected date: {formatDate(selectedDate)} --- Selected time: {selectedTime}
            </p>
          )}
          <button 
            type="submit" 
            className="submit-btn"
          >
            {auth.accessToken ? "Book Appointment" : "Sign in to book appointment"}
          </button>
        </div>
      </form>
      {viewModal && <ModalAction 
        onCancel={() => setViewModal(false)}
        message={modalMsg}
        error={error}
      />}
    </div>
  )
}

export default ManageBooking;

