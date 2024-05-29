import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserUpdates from "../b-user-appointments/UserAppointments"
import DateTimeSelector from "../datetime-selector/DateTimeSelector";
import { AuthContext, BookingContext } from "../../App";
import { updateDB } from "./updateDB";
import formatDate from "../lib/formatDate";
import "./Booking.css";

function ManageBooking() {
  console.log('this is MANAGE BOOKING');
  const { auth } = useContext(AuthContext);
  const { therapist } = useParams();
  const navigate = useNavigate();
  const { availableDates, setAvailableDates, setAppointments } = useContext(BookingContext);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [docSlots, setDocSlots] = useState([]);
  // console.log({auth});
  // console.log(typeof(auth.userId));
  // console.log({availableDates});
  useEffect(() => {
    if (therapist && availableDates) {
      setDocSlots(availableDates[therapist]);
    }
  }, [therapist, availableDates]);

  function dateTimeSelection(date, time) {
    setSelectedDate(date);
    setSelectedTime(time);
  }

async function addBooking(booking) {
  console.log('this is ADD BOOKING');
  console.log({booking});
  try {
    const response = await fetch(`http://localhost:3000/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify(booking),
    });
    const addApptResponse = await response.json();
    console.log({ addApptResponse });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // calls setAppointments to update the appointments state in BookingContext
    setAppointments(prevAppointments => [...prevAppointments, addApptResponse]);
    
    // calls updateAvailableDates to update the state for overall availabilities db
    updateAvailableDates(addApptResponse, 'add');
  } catch (error) {
    console.error('Error adding appointment:', error);
  }

}
  // function updates the state for overall availabilities db --> receives appointment and action data from both "addBooking" and "deleteBooking"(from UserAppointments)
  function updateAvailableDates(appointment, action) {
    console.log('This is UPDATE AVAILABLE DATES');
    console.log({appointment});
    setAvailableDates(prevDates => {
      console.log('this is SET AVAILABLE DATES');
      console.log({prevDates});
      const updatedDates = { ...prevDates };
      const therapistDates = updatedDates[appointment.therapist];
      const selectedDay = therapistDates.find(elem => elem.date === appointment.date);
      console.log({selectedDay});
      const selectedSlot = selectedDay.slots.find(slot => slot.time === appointment.time);
      console.log({selectedSlot});

      if (action === 'add') {
        console.log('ADDED TO DB');
        selectedSlot.available = false;
      } else if (action === 'delete') {
        console.log('REMOVED FROM DB');
        selectedSlot.available = true;
      }

      console.log({updatedDates});

      //calls the utility function that manages the entire availabilities DB
      updateDB(appointment, updatedDates, auth.accessToken)
      
      return updatedDates;
    });

    // updates the available dates in the database
  }

  function bookingSubmit(event) {
    // console.log('This is the SUBMIT from Booking');
    event.preventDefault();
    if (!selectedDate || !selectedTime) {
      // console.error("Must have user account or be logged in to book appointment.");
      // console.error("Both selected date and time must be provided.");
      return;
    }  
    if (!auth.accessToken) {
      navigate("/login-register");
      return;
    }
    console.log("this is the USER ID from ManageBooking");
    console.log(auth.userId);
    console.log(auth.accessToken);
    const newBooking = {
      userId: Number(auth.userId),
      therapist,
      date: selectedDate,
      time: selectedTime,
      dayId: selectedDate.id
    }

    addBooking(newBooking, updateAvailableDates);
  }

  return (
    <div className="booking-container">
      <h1>Book & Manage Appointments</h1>
      <h2>Browse through the calendar for the suitable date & time for your next appointment</h2>
      {/* <p>Selected therapist :  {therapist ? (therapist === 'alinaS' ? 'Alina Salomie' : 'Andra Costin') : 'No therapist selected.'}</p> */}
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
    </div>
  )
}

export default ManageBooking;







// import { useContext, useState, useEffect } from "react";
// import "./Booking.css";
// import { useParams } from "react-router-dom";
// import DateTimeSelector from "../datetime-selector/DateTimeSelector";
// // import UserBooking from "../buser-appointments/UserBooking";
// import { AuthContext } from "../../App";
// import { BookingContext } from "../../App";

// //from DocSelection the user navigates to Booking Form and send therapist name as parameter in the URL
// export default function ManageBooking() {
//   console.log('This is TEST BOOKING');
//   const { auth } = useContext(AuthContext);
//   const { therapist } = useParams(); // accessing the booking URL param to catch "therapist"
//   console.log(therapist);
//   const [selectedDate, setSelectedDate] = useState(undefined);
//   const [selectedTime, setSelectedTime] = useState(undefined);
//   const { availableDates } = useContext(BookingContext);
//   const [docSlots, setDocSlots] = useState([]);
//   console.log(availableDates[therapist]);

//   useEffect(() => {
//     console.log('USE EFFECT triggered', { therapist, availableDates });
//     if (therapist && availableDates[therapist]) { // Ensure therapist and availableDates[therapist] are defined
//       setDocSlots(availableDates[therapist]);
//     }
//   }, [therapist, availableDates]);

//   console.log({ docSlots });

//   // function is defined to update the parent component's date & time state when a date and time are selected 
//   // ->  this function is passed as the "onSelect" prop to DateTimeSelector component
//   function dateTimeSelection(date, time) {
//     console.log('This is DATE TIME SELECTION');
//     // console.log({date});
//     // console.log({time});
//     setSelectedDate(date);
//     setSelectedTime(time);
//   }

//   console.log({
//     therapist,
//     docSlots,
//     selectedDate,
//     selectedTime
//   });

//   // function below is not usable at the time as UserBooking component is not usable yet due to the issue in sending "docSlots" to DateTimeSelector component - import is deactivated
//   // also, onSubmit of the form will not trigger the same "changeBooking" function passed to bookingSubmit for same above reason
//   function changeBooking(booking, action) {
//     const selectedDay = docSlots.find(elem => elem.date === booking.date);
//     console.log({selectedDay});
//     const selectedSlot = selectedDay.slots.find(slot => slot.time === booking.time);
//     console.log({selectedSlot});

//     if (action === 'add') {
//         selectedSlot.available = false;
//       } else if (action === 'delete') {
//         selectedSlot.available = true;
//       }

//     fetch(`http://localhost:3000/${therapist}/${selectedDay.id}`, {
//     method: "PUT",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify(selectedDay),
//     })
//     .then(() => {
//         setSelectedDate(undefined);
//         setSelectedTime(undefined);
//         console.log('yey');
//       })
//       .catch(error => {
//         console.error("Fetch failed:", error);
//       });
//   }

//   function bookingSubmit(event) {
//     console.log('This is the SUBMIT from Booking');
//     event.preventDefault();

//     // checking if user is authenticated and both date & time slot are selected, otherwise no-go
//     if (!selectedDate || !selectedTime || !auth) {
//       // console.error("Must have user account or be logged in to book appointment.");
//       // console.error("Both selected date and time must be provided.");
//       return;
//     }
//     // console.log({selectedDate});
//     // console.log({selectedTime});
//     // console.log({event});

//     const newBooking = {
//         userId: auth.id,
//         therapist,
//         date: selectedDate,
//         time: selectedTime,
//         dayId: selectedDate.id
//     }

//     changeBooking(newBooking, 'add');
//   }

//   return (
//     <div className="booking-container">
//       <h2>Book & Manage Appointments</h2>
//       <h3>Find the suitable date & time for your next appointment</h3>
//       {therapist ? (<p>Selected therapist :  {therapist === 'alinaS' ? 'Alina Salomie' : 'Andra Costin'}</p>
//       ) : (<p>No therapist selected.</p>)}
      
//       {/* <UserBooking therapist={therapist} onchange={changeBooking}/> */}

//       {/* {therapist && docSlots !== undefined && ( // need docSlots to be defined & contain data before rendering */}
//         <form className="booking-form-time" onSubmit={bookingSubmit}>
//         {/* {docSlots.length > 0 && ( */}
//           <DateTimeSelector
//             availableSlots={docSlots}
//           onSelect={dateTimeSelection}
//           />
//           <div>
//             <p className="selection">
//               Selected date {selectedDate} & time {selectedTime}
//             </p>
//             <button 
//               type="submit" 
//               className="submit-btn"
//               // button disabled, no booking can be made if user does not have an account or is not logged in
//               disabled={!auth} 
//               >{auth ? "Book Appointment" : "Sign in to book appointment"}</button>
//           </div>
//         </form>
//     </div>
//   );
// }