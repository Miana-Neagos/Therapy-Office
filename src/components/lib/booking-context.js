//there are 2 endpoints for the availableDates: one for alinaS and one for andraC, both need to be fetched

export async function fetchAvailableDates(setAvailableDates) {
  try {
    const responseAlina = await fetch("http://localhost:3000/alinaS");
    const responseAndra = await fetch("http://localhost:3000/andraC");
    const dataAlina = await responseAlina.json();
    const dataAndra = await responseAndra.json();
    if (responseAlina.ok && responseAndra.ok) {
      // console.log('AlinaS Response Status:', responseAlina.status);
      // console.log('AndraC Response Status:', responseAndra.status);
      // console.log('Fetched available dates:', { alinaS: dataAlina, andraC: dataAndra });
      setAvailableDates({ alinaS: dataAlina, andraC: dataAndra });
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function fetchAppointments(setAppointments, accessToken, userId) {
  console.log('this is FETCH APPOINTMENTS');
  console.log({accessToken});
  console.log({userId});
  try {
    const response = await fetch(`http://localhost:3000/appointments?userId=${userId}`, {
    // const response = await fetch(`http://localhost:3000/appointments?token=${accessToken}&userId=${userId}`, {
    // const response = await fetch(`http://localhost:3000/appointments`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setAppointments(data);
    } 
    // else {
    //   console.error("Failed to fetch appointments:", data.message);
    // }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// export async function fetchAppointments(setAppointments) {
//   console.log('this is BOOKING CONTEXT');
//   try {
//     const response = await fetch("http://localhost:3000/appointments");
//     const data = await response.json();
//     if (response.ok) {
//       setAppointments(data);
//       console.log(data);
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }


// export async function fetchAppointments(setAppointments, accessToken, userId) {
//   console.log('this is FETCH APPOINTMENTS');
//   console.log({accessToken});
//   console.log({userId});
//   try {
//     const response = await fetch(`http://localhost:3000/600/appointments?userId=${userId}`, {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });
//     const data = await response.json();
//     if (response.ok) {
//       console.log(data);
//       setAppointments(data);
//     } 
//     else {
//       console.error("Failed to fetch appointments:", data.message);
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }
 


  