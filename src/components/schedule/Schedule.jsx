import './Schedule.css'

/**
 * The Schedule component displays the working hours for each day of the week.
 * It uses a table to layout the days and their corresponding hours.
 */
function Schedule() {
  return (
    <div className="hours-of-operation">
      <h3>Working Hours</h3>
      <table>
        <tbody>
          <tr><td className='weekday'>Monday</td><td>9:00 am - 5:00 pm</td></tr>
          <tr><td className='weekday'>Tuesday</td><td>9:00 am - 5:00 pm</td></tr>
          <tr><td className='weekday'>Wednesday</td><td>9:00 am - 5:00 pm</td></tr>
          <tr><td className='weekday'>Thursday</td><td>9:00 am - 5:00 pm</td></tr>
          <tr><td className='weekday'>Friday</td><td>9:00 am - 5:00 pm</td></tr>
          <tr><td className='weekday'>Saturday</td><td>Closed</td></tr>
          <tr><td className='weekday'>Sunday</td><td>Closed</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;