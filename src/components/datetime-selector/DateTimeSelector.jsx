import { useState, useEffect } from "react";
import "./DateTimeSelector.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaArrowAltCircleDown } from "react-icons/fa";
import PropTypes from "prop-types";

// receiving "availableSlots/therapist to further use in the UI for creating time slot buttons"
// "onSelect" allows the DateTimeSelector to communicate the selected date and time back to its parent component(ManageBooking)

function DateTimeSelector({ availableSlots, onSelect, auth }) {
  console.log('This is DATE TIME SELECTOR');
  console.log({availableSlots});
  // console.log(auth);
  // console.log({availableSlots});
  // console.log({onSelect});
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  // const [slots, setSlots] = useState([]);

  // useEffect(() => {
  //   if (availableSlots) {
  //     setSlots(availableSlots);
  //   }
  // }, [availableSlots]);

  // console.log({slots});

  const selectedDateString = selectedDate ? selectedDate.toLocaleDateString("en-GB") : null;
  // console.log({selectedDate});
  // console.log({selectedDateString});
  const availableTimeSlots = (availableSlots || []).find(slot => slot.date === selectedDateString)?.slots || [];

  function dateSelection(date) {
    // updating the selected date and resetting the selected time -> new date is selected & previously selected time is cleared
    setSelectedDate(date);
    setSelectedTime("");
  }

  useEffect(() => {
    onSelect(selectedDateString, selectedTime);
  }, [selectedDateString, selectedTime, onSelect]);

  function manageTimeClick(event, time){
    console.log({event});
    event.preventDefault();
    setSelectedTime(time);
  }

  // console.log({
  //   availableSlots,
  //   selectedDate,
  //   selectedDateString,
  //   availableTimeSlots,
  //   onSelect
  // });

  
  return (
    <div className="calendar-and-slots-container">
      {!selectedDateString && (
          <div className="instruction">
            {/* <div> */}
              <p>Pick a date to view all available time slots for that day.</p>
              {!auth.accessToken ? 
              <p>Note: You will need an account to book an appointment.</p> : ''
              }
            {/* </div> */}
            <div>
              <FaArrowAltCircleDown className="booking-icon" size={50} color="#8bc2c4" />
            </div>
          </div>
        )}

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
                onClick={() => manageTimeClick(event, slot.time)}
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
  auth: PropTypes.object.isRequired
};

export default DateTimeSelector;