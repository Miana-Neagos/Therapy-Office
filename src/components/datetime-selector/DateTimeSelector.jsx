import { useState, useEffect } from "react";
import "./DateTimeSelector.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaRegHandPointLeft } from "react-icons/fa6";
import PropTypes from "prop-types";

function DateTimeSelector({ availableSlots, onSelect }) {
  // console.log({availableSlots});
  // console.log({onSelect});
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);

  const selectedDateString = selectedDate ? selectedDate.toLocaleDateString("en-GB") : null;
  // console.log({selectedDate});
  // console.log({selectedDateString});
  const availableTimeSlots = availableSlots.find((slot) => slot.date === selectedDateString)?.slots || [];

  function dateSelection(date) {
    setSelectedDate(date);
    setSelectedTime("");
  }

  useEffect(() => {
    onSelect(selectedDateString, selectedTime);
  }, [selectedDateString, selectedTime, onSelect]);

  return (
    <div className="calendar-and-slots-container">
      <div className="calendar-container">
        <Calendar onChange={dateSelection} value={selectedDate} className="select" />
      </div>
      <div className="time-slot-container">
      {selectedDateString ? (
          <div className="time-slot-buttons">
            {availableTimeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
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
  availableSlots: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DateTimeSelector;