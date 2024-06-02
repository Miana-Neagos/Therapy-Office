import React, { useContext, useEffect, useState } from "react";
import "./UserAppointments.css";
import { AuthContext, BookingContext } from "../../App";
import PropTypes from "prop-types";
import ModalAction from "../modal/Modal";
import { formatDate, formatApptsString } from "../lib/format-dates";

// main component that manages user appointments, existing user appointments - displays them and offers the delete option
function UserUpdates({ onChange }) {
  const { auth } = useContext(AuthContext);
  const { appointments } = useContext(BookingContext);
  const [userAppointments, setUserAppointments] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [error, setError] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  // filter appointments (only those higher than present day are displayed) and set user appointments state
  useEffect(() => {
    if (appointments) {
      const today = new Date();
      const filteredApp = appointments.filter((appt) => {
        // used a helper function to match format to filter correctly
        const bookedDate = formatApptsString(appt.date);
        return bookedDate >= today;
      });
      // sets the state for the user appointments that will also be displayed in the UI
      setUserAppointments(filteredApp);
    }
  }, [appointments]);

  // function responsible for deleting bookings and triggering a state update for "setUserAppointments" + modal component
  async function deleteBooking(selectedAppt) {
    try {
      const response = await fetch(
        `http://localhost:3000/appointments/${selectedAppt.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // set the state for the user appointments that will also be displayed in the UI
      setUserAppointments((prevUserAppts) =>
        prevUserAppts.filter((appt) => appt.id !== selectedAppt.id)
      );

      // triggers for modal interaction
      setModalMsg("Appointment deleted successfully.");
      setError(false);
      setViewModal(true);

      // call the "onChange" callback to notify parent component "Manage-Bookings"
      onChange(selectedAppt, "delete");
    } catch (error) {
      // triggers for modal interaction
      setModalMsg("`Failed to delete appointment: ${error.message}`");
      setError(true);
      setViewModal(true);
      return;
    }
  }
  // function that manages the confirmation of a deletion of selected appointment
  const confirmDel = () => {
    if (selectedAppt) {
      deleteBooking(selectedAppt);
    }
  };
  // function that manages the cancelation of a delete action, for a selected appointment
  const cancelDel = () => {
    setViewModal(false);
    setSelectedAppt(null);
    setModalMsg("");
    setError(false);
  };

  //helper function to display full therapist name in the UI
  const therapistName = (therapist) =>
    therapist === "alinaS" ? "Alina Salomie" : "Andra Costin";

  return (
    <div className="future-appts">
      <h3>Future Appointments:</h3>
      {userAppointments.length === 0 ? (
        <p>You have no upcoming appointments.</p>
      ) : (
        <ul>
          {userAppointments.map((appt) => (
            <li key={appt.id}>
              {formatDate(appt.date)} from: {appt.time}, with{" "}
              {therapistName(appt.therapist)}
              <button
                onClick={() => {
                  setSelectedAppt(appt);
                  setModalMsg(
                    "Are you sure you want to delete the appointment?"
                  );
                  setError(false);
                  setViewModal(true);
                }}
              >
                {" "}
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {viewModal && (
        <ModalAction
          message={modalMsg}
          onConfirm={error ? cancelDel : confirmDel}
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
