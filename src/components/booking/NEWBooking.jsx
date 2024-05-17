import { useState, useEffect } from "react";
import "./NEWBooking.css";
import DocSelection from "../doc-selection/DocSelection";
import { useLocation } from "react-router-dom";
import DateTimeSelector from "../datetime-selector/DateTimeSelector";

 function BookingForm() {
  const location = useLocation();
  const { therapist } = location.state || {};
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(therapist || ""); 

  useEffect(() => {
    if (selectedTherapist) {
      fetch(`http://localhost:3000/${selectedTherapist}`)
        .then(response => response.json())
        .then(data => {
          setAvailableSlots(data);
        })
        .catch(error => console.error("Fetch error:", error));
    }
  }, [selectedTherapist]);

  function handleDateAndTimeSelect(date, time) {
    setSelectedDate(date);
    setSelectedTime(time);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const selectedDay = availableSlots.find(slot => slot.date === selectedDate);
    const selectedSlot = selectedDay.slots.find(slot => slot.time === selectedTime);
    selectedSlot.available = false;

    fetch(`http://localhost:3000/${selectedTherapist}/${selectedDay.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedDay),
    })
      .then(() => {
        setSelectedDate(undefined);
        setSelectedTime("");
      })
      .catch(error => {
        console.error("Fetch failed:", error);
      });
  }

  return (
    <div className="booking-container">
      <h2>Book & Manage Appointments</h2>
      <h3>Find the suitable date & time for your next appointment</h3>
      {selectedTherapist ? (<p>Selected Therapist: {selectedTherapist === 'alinaS' ? 'Alina Salomie' : 'Andra Costin'}</p>
      ) : (<p>No therapist selected.</p>)}

      <form className="booking-form-time" onSubmit={handleSubmit}>
        {!selectedTherapist ? (
          <DocSelection onSelectTherapist={setSelectedTherapist} />
        ) : (
          <>
            <DateTimeSelector
            //   selectedTherapist={selectedTherapist}
              availableSlots={availableSlots}
              onSelect={handleDateAndTimeSelect}
            />
            <div>
              <p className="selection">
                Selected date {selectedDate} & time {selectedTime}
              </p>
              <button type="submit" className="submit-btn" disabled={!selectedTherapist || !selectedTime}>
                Book Appointment
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
