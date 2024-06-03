import { useState, useEffect } from "react";
import "./DateTimeSelector.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaArrowAltCircleDown } from "react-icons/fa";
import PropTypes from "prop-types";
/** 
 * DateTimeSelector component renders the React Calendar in the UI,  allows users to select a date and time from available slots 
 * and communicates with "ManageBooking"
 * "onSelect" allows the DateTimeSelector to communicate the selected date and time back to its parent component(ManageBooking)
*/
function DateTimeSelector({ availableSlots, onSelect, auth }) {
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);

  const selectedDateString = selectedDate? selectedDate.toLocaleDateString("en-GB"): null;

  // finding the available time slots for the selected date
  const availableTimeSlots =
    (availableSlots || []).find((slot) => slot.date === selectedDateString)
      ?.slots || [];

  function dateSelection(date) {
    // updating the selected date and resetting the selected time -> new date is selected & previously selected time is cleared
    setSelectedDate(date);
    setSelectedTime(undefined);
  }

  useEffect(() => {
    onSelect(selectedDateString, selectedTime);
  }, [selectedDateString, selectedTime, onSelect]);

  function manageTimeClick(event, time) {
    event.preventDefault();
    setSelectedTime(time);
  }

  // component returns a JSX element which includes a React Calendar for date selection and buttons for time selection
  return (
    <div className="calendar-and-slots-container">
      {!selectedDateString && (
        <div className="instruction">
          <p>Pick a date to view all available time slots for that day.</p>
          {!auth.accessToken ? (
            <p>Note: You will need an account to book an appointment.</p>
          ) : (
            ""
          )}
          <div>
            <FaArrowAltCircleDown
              className="booking-icon"
              size={50}
              color="#8bc2c4"
            />
          </div>
        </div>
      )}

      <div className="calendar-container">
        <Calendar
          onChange={dateSelection}
          value={selectedDate}
          className="select"
        />
      </div>
      <div className="time-slot-container">
        <div className="time-slot-buttons">
          {selectedDateString &&
            availableTimeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!slot.available}
                onClick={(event) => manageTimeClick(event, slot.time)}
              >
                {slot.time}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

DateTimeSelector.propTypes = {
  availableSlots: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default DateTimeSelector;
