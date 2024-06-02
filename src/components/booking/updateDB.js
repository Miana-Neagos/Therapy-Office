// this function updates the availability of appointment slots in the database, for specific/targeted therapist and date

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
