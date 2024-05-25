import { useState, useEffect } from "react";
import "./DateTimeSelector.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaRegHandPointLeft } from "react-icons/fa6";
import PropTypes from "prop-types";

// receiving "docSlots/therapist to further use in the UI for creating time slot buttons"
// "onSelect" allows the DateTimeSelector to communicate the selected date and time back to its parent component(ManageBooking)

function DateTimeSelector({ docSlots, onSelect }) {
  console.log('This is DATE TIME SELECTOR');
  console.log({docSlots});
  // console.log({onSelect});
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);

  const selectedDateString = selectedDate ? selectedDate.toLocaleDateString("en-GB") : null;
  // console.log({selectedDate});
  // console.log({selectedDateString});
  const availableTimeSlots = (docSlots || []).find(slot => slot.date === selectedDateString)?.slots || [];

  function dateSelection(date) {
    // updating the selected date and resetting the selected time -> new date is selected & previously selected time is cleared
    setSelectedDate(date);
    setSelectedTime("");
  }

  useEffect(() => {
    onSelect(selectedDateString, selectedTime);
  }, [selectedDateString, selectedTime, onSelect]);

  // console.log({
  //   docSlots,
  //   selectedDate,
  //   selectedDateString,
  //   availableTimeSlots,
  //   onSelect
  // });

  
  return (
    <div className="calendar-and-slots-container">
      <div className="calendar-container">
        <Calendar onChange={dateSelection} 
        value={selectedDate} 
        className="select" />
      </div>
      <div className="time-slot-container">
          <div className="time-slot-buttons">
            {selectedDateString && availableTimeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
              >
                {slot.time}
              </button>
            ))}
          </div>
          {!selectedDateString && (
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
  docSlots: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DateTimeSelector;