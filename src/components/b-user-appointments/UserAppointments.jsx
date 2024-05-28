import React, { useContext, useEffect, useState } from "react";
import "./UserAppointments.css";
import { AuthContext, BookingContext } from "../../App";
import PropTypes from "prop-types";

//
function UserUpdates({ onChange }) {
  console.log("this is USER UPDATES");
  const { auth } = useContext(AuthContext);
  const { appointments } = useContext(BookingContext);
  const [userAppointments, setUserAppointments] = useState([]);
  console.log({ appointments });
  console.log({ userAppointments });
  console.log(auth.userId);

  useEffect(() => {
    console.log('this is USE EFFECT');
    console.log(appointments);
    if (auth.userId) {
      const filteredApp = appointments.filter(appt => appt.userId === Number(auth.userId));
      console.log(appointments.appt);
      console.log({filteredApp});
      setUserAppointments(filteredApp);
    }
  }, [auth, appointments]);

  async function deleteBooking(booking) {
    const userConfirmedAction = confirm('Are you sure you want to delete the appointment?');

    if (userConfirmedAction) {
      try {
        const response = await fetch(`http://localhost:3000/appointments/${booking.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.log(`Server error: ${response.status} - ${errorMessage}`);
        }

        setUserAppointments(prev => prev.filter(appt => appt.id !== booking.id)
        );
        onChange(booking, "delete");
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert(`Failed to delete appointment: ${error.message}`);
        return;
      }
    }
  }

  return (
    <div>
      <h3>Your Future Appointments</h3>
      {userAppointments && userAppointments.length === 0 ? (
        <p>You have no future appointments.</p>
      ) : (
        <ul>
          {userAppointments.map(appt => (
            <li key={appt.id}>
              {appt.date} at {appt.time} with{" "}
              {appt.therapist}
              <button onClick={() => deleteBooking(appt)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

UserUpdates.propTypes = {
  onChange: PropTypes.func,
};

export default UserUpdates;
