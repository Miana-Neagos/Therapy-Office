// function to fetch generally available dates & time slots for therapists
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

//fetches appointments for the authenticated user based on their user ID and updates the state with the fetched data, while handling authorization and navigation on session expiry.
export async function fetchAppointments(setAppointments, accessToken, userId, navigate) {
  try {
    const response = await fetch(
      `http://localhost:3000/appointments?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setAppointments(data);
    } else if (response.status === 401) {
      alert("Session has expired. \nYou are redirected to login page..");
      navigate("/login-register");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
