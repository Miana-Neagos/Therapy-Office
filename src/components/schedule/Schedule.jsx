// import './Schedule.css'
import './test.css'

function Schedule() {
  return (
    <div className="hours-of-operation">
      <h4>Working Hours</h4>
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