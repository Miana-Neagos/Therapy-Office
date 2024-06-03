/**
* Updates the database with the new availability data for a specific therapist on a specific date.
* 
*   appointment - The appointment details containing the therapist and date.
* updatedDates - The updated availability data for all therapists.
*  token - The authentication token for the API request.
*/

export async function updateDB(appointment, updatedDates, token) {
  const {therapist , date} = appointment;
  const therapistDate = updatedDates[therapist];
  const selectedDay = therapistDate.find(elem => elem.date === date);

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
