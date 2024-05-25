/*------------------------------------- FINAL VERSION USING useParams()    -------------------------------*/
import { useContext, useState, useEffect } from "react";
import "./Booking.css";
import { useParams } from "react-router-dom";
import DateTimeSelector from "../datetime-selector/DateTimeSelector";
import { AuthContext } from "../../App";

//from DocSelection the user navigates to Booking Form and send therapist name as parameter in the URL
export default function ManageBooking() {
  console.log('This is NEW BOOKING');
  const { auth } = useContext(AuthContext);
  const { therapist } = useParams(); // accessing the booking URL param to catch "therapist"
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (therapist) {
      fetch(`http://localhost:3000/${therapist}`)
        .then(response => response.json())
        .then(data => {
          setAvailableSlots(data);
        })
        .catch(error => console.error("Fetch error:", error));
    }
  }, [therapist]);

  function dateTimeSelection(date, time) {
    console.log('This is DATE TIME SELECTION');
    // console.log({date});
    // console.log({time});
    setSelectedDate(date);
    setSelectedTime(time);
  }

  console.log({
    therapist,
    availableSlots,
    selectedDate,
    selectedTime
  });

  function bookingSubmit(event) {
    console.log('This is the SUBMIT from Booking');
    event.preventDefault();

    if (!selectedDate || !selectedTime) {
      // console.error("Both selected date and time must be provided.");
      return;
    }
    // console.log({selectedDate});
    // console.log({selectedTime});
    // console.log({event});

    // checking if user is authenticated --> no booking can be made if user does not have an account or is not logged in
    if (!auth) {
      console.error("Must have user account or be logged in to book appointment.");
      return;
    }

    const selectedDay = availableSlots.find(elem => elem.date === selectedDate);
    // console.log({selectedDay});
    const selectedSlot = selectedDay.slots.find(slot => slot.time === selectedTime);
    // console.log({selectedSlot});
    selectedSlot.available = false;

    fetch(`http://localhost:3000/${therapist}/${selectedDay.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedDay),
    })
      .then(() => {
        setSelectedDate(undefined);
        setSelectedTime(undefined);
        console.log('yey');
      })
      .catch(error => {
        console.error("Fetch failed:", error);
      });
  }

  return (
    <div className="booking-container">
      <h2>Book & Manage Appointments</h2>
      <h3>Find the suitable date & time for your next appointment</h3>
      {therapist ? (<p>Selected therapist :  {therapist === 'alinaS' ? 'Alina Salomie' : 'Andra Costin'}</p>
      ) : (<p>No therapist selected.</p>)}

      {therapist && (
        <form className="booking-form-time" onSubmit={bookingSubmit}>
          <DateTimeSelector
            availableSlots={availableSlots}
            onSelect={dateTimeSelection}
          />
          <div>
            <p className="selection">
              Selected date {selectedDate} & time {selectedTime}
            </p>
            <button 
              type="submit" 
              className="submit-btn"
              // button disabled, no booking can be made if user does not have an account or is not logged in
              disabled={!auth} 
              >{auth ? "Book Appointment" : "Sign in to book appointment"}</button>
          </div>
        </form>
      )}
    </div>
  );
}
