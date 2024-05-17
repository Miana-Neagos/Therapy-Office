import { useState, useEffect } from "react";
import "./DateTimeSelector.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaRegHandPointLeft } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function DateTimeSelector({ availableSlots, onSelect }) {
  console.log({availableSlots});
  console.log({onSelect});
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState("");

  const selectedDateString = selectedDate ? selectedDate.toLocaleDateString("en-GB") : null;
  const availableTimeSlots = availableSlots.find((slot) => slot.date === selectedDateString)?.slots || [];

  function handleDateChange(date) {
    setSelectedDate(date);
    setSelectedTime("");
  }

  function handleTimeChange(event, time) {
    event.preventDefault();
    setSelectedTime(time === selectedTime ? "" : time);
  }

  useEffect(() => {
    onSelect(selectedDateString, selectedTime);
  }, [selectedDateString, selectedTime, onSelect]);

  return (
    <div className="calendar-and-slots-container">
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} className="select" />
      </div>
      <div className="time-slot-container">
        {selectedDateString ? (
          <div className="time-slot-buttons">
            {availableTimeSlots.map((slot, index) => (
              <button
                key={`${selectedDateString}-${index}`}
                value={slot.time}
                disabled={!slot.available}
                onClick={(event) => handleTimeChange(event, slot.time)}
              >
                {slot.time}
              </button>
            ))}
          </div>
        ) : (
          <div className="instruction">
            <FaRegHandPointLeft size={55} color="#8bc2c4" />
            <p>Pick a date from the calendar to view availabilities.</p>
          </div>
        )}
      </div>
    </div>
  );
}

DateTimeSelector.propTypes = {
  // selectedTherapist: PropTypes.string.isRequired,
  availableSlots: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};