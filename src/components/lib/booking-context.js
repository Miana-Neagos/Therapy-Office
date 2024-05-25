//there are 2 endpoints for the availableDates: one for alinaS and one for andraC, both need to be fetched

export async function fetchAvailableDates(setAvailableDates) {
    try {
      const responseAlina = await fetch("http://localhost:3000/alinaS");
      const responseAndra = await fetch("http://localhost:3000/andraC");
      const dataAlina = await responseAlina.json();
      const dataAndra = await responseAndra.json();
      if (responseAlina.ok && responseAndra.ok) {
        console.log('Fetched available dates:', { alinaS: dataAlina, andraC: dataAndra });
        setAvailableDates({ alinaS: dataAlina, andraC: dataAndra });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  
  export async function fetchAppointments(setAppointments) {
    try {
      const response = await fetch("http://localhost:3000/appointments");
      const data = await response.json();
      if (response.ok) {
        setAppointments(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  