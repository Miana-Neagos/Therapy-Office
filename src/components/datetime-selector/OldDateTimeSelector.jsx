// import { useState, useEffect } from "react";
// import "./DateTimeSelector.css";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { FaRegHandPointLeft } from "react-icons/fa6";
// import PropTypes from "prop-types";

// // receiving "availableSlots/therapist to further use in the UI for creating time slot buttons"
// // "onSelect" is a callback that allows the DateTimeSelector to communicate 
// // the selected date and time back to its parent component(BookingForm)

// function DateTimeSelector({ availableSlots, onSelect }) {
//   console.log('This is DATE TIME SELECTOR');
//   console.log({availableSlots});
//   // console.log({onSelect});
//   const [selectedDate, setSelectedDate] = useState(undefined);
//   const [selectedTime, setSelectedTime] = useState(undefined);

//   const selectedDateString = selectedDate ? selectedDate.toLocaleDateString("en-GB") : null;
//   // console.log({selectedDate});
//   // console.log({selectedDateString});
//   const availableTimeSlots = (availableSlots || []).find(slot => slot.date === selectedDateString)?.slots || [];

//   function dateSelection(date) {
//     // updating the selected date and resetting the selected time -> new date is selected & previously selected time is cleared
//     setSelectedDate(date);
//     setSelectedTime("");
//   }

//   useEffect(() => {
//     onSelect(selectedDateString, selectedTime);
//   }, [selectedDateString, selectedTime, onSelect]);

//   // console.log({
//   //   availableSlots,
//   //   selectedDate,
//   //   selectedDateString,
//   //   availableTimeSlots,
//   //   onSelect
//   // });

  
//   return (
//     <div className="calendar-and-slots-container">
//       <div className="calendar-container">
//       {/* "react-calendar" package is designed to handle date selection and to pass the selected date 
//       to the function specified in the onChange prop -> this is implemented within the react-calendar package itself */}
//         <Calendar onChange={dateSelection} 
//         // "value prop" to synchronize its internal state with the component's state, 
//         // ensuring consistent display and behavior for the selected date.
//         value={selectedDate} 
//         className="select" />
//       </div>
//       <div className="time-slot-container">
//           <div className="time-slot-buttons">
//             {selectedDateString && availableTimeSlots.map((slot, id) => (
//               <button
//                 key={id}
//                 disabled={!slot.available}
//                 onClick={() => setSelectedTime(slot.time)}
//               >
//                 {slot.time}
//               </button>
//             ))}
//           </div>
//           {!selectedDateString && (
//           <div className="instruction">
//             <FaRegHandPointLeft size={55} color="#8bc2c4" />
//             <p>Pick a date from the calendar to view availabilities.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );

// }

// DateTimeSelector.propTypes = {
//   availableSlots: PropTypes.array.isRequired,
//   onSelect: PropTypes.func.isRequired,
// };

// export default DateTimeSelector;



  // function timeSlotChoice(event, time) {
  //   event.preventDefault();
  //   setSelectedTime(time === selectedTime ? "" : time);
  // }


  // return (
  //   <div className="calendar-and-slots-container">
  //     <div className="calendar-container">
  //       <Calendar onChange={dateSelection} value={selectedDate} className="select" />
  //     </div>
  //     <div className="time-slot-container">
  //       {selectedDateString ? (
  //         <div className="time-slot-buttons">
  //           {availableTimeSlots.map((slot, index) => (
  //             <button
  //               key={`${selectedDateString}-${index}`}
  //               value={slot.time}
  //               disabled={!slot.available}
  //               onClick={(event) => timeSlotChoice(event, slot.time)}
  //             >
  //               {slot.time}
  //             </button>
  //           ))}
  //         </div>
  //       ) : (
  //         <div className="instruction">
  //           <FaRegHandPointLeft size={55} color="#8bc2c4" />
  //           <p>Pick a date from the calendar to view availabilities.</p>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
