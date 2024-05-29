// export async function addBooking(newBooking, auth, setAppointment, updateAvailableDates) {
//   console.log("this is ADD Booking");
//   console.log({ newBooking });

//   try {
//     const response = await fetch(`http://localhost:3000/appointments`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${auth.accessToken}`,
//       },
//       body: JSON.stringify(newBooking),
//     });
//     console.log({response});

//     const addApptResponse = await response.json();
//     console.log({ addApptResponse });
//     if (!response.ok) {
//         console.log('`HTTP error! status: ${response.status}`');
//     }

//     //updates the appointments state and eventually the "appointments"db from BookingContext
//     setAppointment()

//   } catch (error) {
//     console.error("Error adding appointment:", error);
//   }
// }

export async function updateDB(appointment, updatedDates, token) {
  console.log('this is UPDATE DB');
  console.log(appointment);
  const {therapist , date, time } = appointment;
  const therapistDate = updatedDates[therapist];
  const selectedDay = therapistDate.find(elem => elem.date === date);
  // const selectedSlot = selectedDay.find(slot => slot.time === time)

    try {
      const url = `http://localhost:3000/${therapist}/${selectedDay.id}`;
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedDay),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating available dates:', error);
    }
  }
