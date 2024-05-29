import React, { useContext, useEffect, useState } from "react";
import "./UserAppointments.css";
import { AuthContext, BookingContext } from "../../App";
import PropTypes from "prop-types";
import ModalAction from "../modal/Modal";
import formatDate from "../lib/formatDate";

function UserUpdates({ onChange }) {
  console.log("this is USER UPDATES");
  const { auth } = useContext(AuthContext);
  const { appointments } = useContext(BookingContext);
  const [userAppointments, setUserAppointments] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  console.log({ appointments });
  console.log({ userAppointments });
  console.log(auth.userId);

  useEffect(() => {
    console.log('this is USE EFFECT');
    console.log(appointments);
    if (appointments && auth.userId) {
      const filteredApp = appointments.filter(appt => appt.userId === Number(auth.userId));
      console.log(appointments.appt);
      console.log({filteredApp});
      setUserAppointments(filteredApp);
    }
  }, [auth, appointments]);

  async function deleteBooking(selectedAppt) {
    // const userConfirmedAction = confirm('Are you sure you want to delete the appointment?');

    // if (userConfirmedAction) {
      try {
        const response = await fetch(`http://localhost:3000/appointments/${selectedAppt.id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`
          },
        });
        const deleteResponse = await response.json();
        console.log({deleteResponse});

        if (!response.ok) {
          const errorMessage = await response.text();
          console.log(`Server error: ${response.status} - ${errorMessage}`);
        }

        // setUserAppointments(appointments => appointments.filter(appt => appt.id !== booking.id));
        setUserAppointments(prevUserAppts => prevUserAppts.filter(appt => appt.id !== selectedAppt.id));

        onChange(selectedAppt, "delete");
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert(`Failed to delete appointment: ${error.message}`);
        return;
      }
    // }
  }

  const confirmDel = () => {
    if(selectedAppt) {
      deleteBooking(selectedAppt);
    }
    setViewModal(false);
    setSelectedAppt(null)
  }

  const cancelDel = () => {
    setViewModal(false);
    setSelectedAppt(null)
  }
  const therapistName = (therapist) => therapist === 'alinaS' ? 'Alina Salomie' : 'Andra Costin';

  return (
    <div className="future-appts">
      <h3>Future Appointments:</h3>
      {userAppointments.length === 0 ? (
        <p>You have no upcoming appointments.</p>
      ) : (
        <ul>
          {userAppointments.map(appt => (
            <li key={appt.id}>
              {formatDate(appt.date)} from: {appt.time}, with {therapistName (appt.therapist)}
              <button 
                // className="user-appts-btn"
                onClick={() => {
                setSelectedAppt(appt);
                setViewModal(true);
              }}> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {viewModal && (
      <ModalAction 
        message='Are you sure you want to delete the appointment?' 
        onConfirm={confirmDel} 
        onCancel={cancelDel}
      />
      )}
    </div>
  );
}

UserUpdates.propTypes = {
  onChange: PropTypes.func,
};

export default UserUpdates;
