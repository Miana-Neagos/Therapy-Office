//there are 2 endpoints for the availableDates: one for alinaS and one for andraC, both need to be fetched

export async function fetchAvailableDates(setAvailableDates) {
  try {
    const responseAlina = await fetch("http://localhost:3000/alinaS");
    const responseAndra = await fetch("http://localhost:3000/andraC");
    const dataAlina = await responseAlina.json();
    const dataAndra = await responseAndra.json();
    if (responseAlina.ok && responseAndra.ok) {
      setAvailableDates({ alinaS: dataAlina, andraC: dataAndra });
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function fetchAppointments(setAppointments, accessToken, userId, navigate) {
  console.log('this is FETCH APPOINTMENTS');
  console.log({accessToken});
  console.log({userId});
  try {
    const response = await fetch(`http://localhost:3000/appointments?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setAppointments(data);
    } 

    if(response.status === 401)
      navigate('login-register')
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
