import React, { useContext, useEffect, useState } from "react";
import "./UserAppointments.css";
import { AuthContext, BookingContext } from "../../App";
import PropTypes from "prop-types";
import ModalAction from "../modal/Modal";
import { formatDate, formatApptsString } from "../lib/format-dates";

function UserUpdates({ onChange }) {
  console.log("this is USER UPDATES");
  const { auth } = useContext(AuthContext);
  const { appointments } = useContext(BookingContext);
  const [userAppointments, setUserAppointments] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [error, setError] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  console.log(appointments);
  console.log({ userAppointments });
  console.log(auth.userId);

  useEffect(() => {
    console.log('this is USE EFFECT');
    console.log(appointments);
    if (appointments) {
      const today = new Date();
      console.log({today});
      const filteredApp = appointments.filter(appt => {
        const bookedDate = formatApptsString(appt.date);
        return bookedDate >= today;
      });
      setUserAppointments(filteredApp);
    }
  }, [appointments]);

  // useEffect(() => {
  //   console.log('2ND USE EFFECT');
  //   if (appointments && auth.userId) {
  //     const today = new Date();
  //     console.log({today});
  //     const filtered = appointments.filter(elem => { 
  //       console.log(elem.date);
  //       const [day, month, year] = elem.date.split('/');

  //       elem.userId === Number(auth.userId)
  //     } )
  //   }
  // })

  async function deleteBooking(selectedAppt) {
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
        setModalMsg('Appointment deleted successfully.')
        setError(false);
        setViewModal(true);

        onChange(selectedAppt, "delete");
      } catch (error) {
        setModalMsg('`Failed to delete appointment: ${error.message}`');
        setError(true);
        setViewModal(true);
        // console.error("Error deleting appointment:", error);
        // alert(`Failed to delete appointment: ${error.message}`);
        return;
      }
    // }
  }

  const confirmDel = () => {
    if(selectedAppt) {
      deleteBooking(selectedAppt);
    }
    // setViewModal(false);
    // setSelectedAppt(null)
  }

  const cancelDel = () => {
    setViewModal(false);
    setSelectedAppt(null)
    setModalMsg('');
    setError(false);
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
              <button onClick={() => {
                  setSelectedAppt(appt);
                  setModalMsg('Are you sure you want to delete the appointment?');
                  setError(false);
                  setViewModal(true);
              }}> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {viewModal && (
      <ModalAction 
        message={modalMsg} 
        onConfirm={error? cancelDel : confirmDel} 
        onCancel={cancelDel}
        error={error}
      />
      )}
    </div>
  );
}

UserUpdates.propTypes = {
  onChange: PropTypes.func,
};

export default UserUpdates;
