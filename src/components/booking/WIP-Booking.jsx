import { useContext, useState, useEffect } from "react";
import "./Booking.css";
import { useParams } from "react-router-dom";
import DateTimeSelector from "../datetime-selector/DateTimeSelector";
// import UserBooking from "../buser-appointments/UserBooking";
import { AuthContext } from "../../App";
import { BookingContext } from "../../App";

//from DocSelection the user navigates to Booking Form and send therapist name as parameter in the URL
export default function ManageBooking() {
  console.log('This is TEST BOOKING');
  const { auth } = useContext(AuthContext);
  const { therapist } = useParams(); // accessing the booking URL param to catch "therapist"
  console.log(therapist);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const { availableDates } = useContext(BookingContext);
  const [docSlots, setDocSlots] = useState([]);
  console.log({ availableDates });

  useEffect(() => {
    console.log('USE EFFECT triggered', { therapist, availableDates });
    if (therapist && availableDates && availableDates[therapist]) {
      console.log('Setting docSlots:', availableDates[therapist]);
      const latestDocSlots = therapist && availableDates ? availableDates[therapist] : [];
      console.log({latestDocSlots});
      setDocSlots(latestDocSlots); }

  }, [therapist, availableDates]);

  console.log({ docSlots });

  // function is defined to update the parent component's date & time state when a date and time are selected 
  // ->  this function is passed as the "onSelect" prop to DateTimeSelector component
  function dateTimeSelection(date, time) {
    console.log('This is DATE TIME SELECTION');
    // console.log({date});
    // console.log({time});
    setSelectedDate(date);
    setSelectedTime(time);
  }

//   console.log({
//     therapist,
//     availableSlots,
//     selectedDate,
//     selectedTime
//   });

  // function below is not usable at the time as UserBooking component is not usable yet due to the issue in sending "docSlots" to DateTimeSelector component - import is deactivated
  // also, onSubmit of the form will not trigger the same "changeBooking" function passed to bookingSubmit for same above reason
  function changeBooking(booking, action) {
    const selectedDay = docSlots.find(elem => elem.date === booking.date);
    console.log({selectedDay});
    const selectedSlot = selectedDay.slots.find(slot => slot.time === booking.time);
    console.log({selectedSlot});

    if (action === 'add') {
        selectedSlot.available = false;
      } else if (action === 'delete') {
        selectedSlot.available = true;
      }

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

  function bookingSubmit(event) {
    console.log('This is the SUBMIT from Booking');
    event.preventDefault();

    // checking if user is authenticated and noth date & time slot are selected, otherwise no-go
    if (!selectedDate || !selectedTime || auth) {
      // console.error("Must have user account or be logged in to book appointment.");
      // console.error("Both selected date and time must be provided.");
      return;
    }
    // console.log({selectedDate});
    // console.log({selectedTime});
    // console.log({event});

    const newBooking = {
        userId: auth.id,
        therapist,
        date: selectedDate,
        time: selectedTime,
        dayId: selectedDate.id
    }

    changeBooking(newBooking, 'add');
  }

  return (
    <div className="booking-container">
      <h2>Book & Manage Appointments</h2>
      <h3>Find the suitable date & time for your next appointment</h3>
      {therapist ? (<p>Selected therapist :  {therapist === 'alinaS' ? 'Alina Salomie' : 'Andra Costin'}</p>
      ) : (<p>No therapist selected.</p>)}
      
      {/* <UserBooking therapist={therapist} onchange={changeBooking}/> */}

      {therapist && docSlots !== undefined && ( // need docSlots to be defined & contain data before rendering
        <form className="booking-form-time" onSubmit={bookingSubmit}>
          <DateTimeSelector
            availableSlots={docSlots}
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