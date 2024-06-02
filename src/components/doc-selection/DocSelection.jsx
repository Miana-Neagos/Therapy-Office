import { useNavigate } from 'react-router-dom';
import alina from "../../assets/pic3.jpg";
import andra from "../../assets/pic3.jpg";
import "./DocSelection.css";

//DocSelection offers some UI candy for the user together with selecting a therapist that is further send as a parameter to "Manage-Booking" component
function DocSelection() {
  const navigate = useNavigate();

  // created in case therapist list becomes bigger
  const therapists = [
    {id: 'alinaS', name: 'Alina Salomie', img: alina},
    {id: 'andraC', name: 'Andra Costin', img: andra}
  ]

  //handle therapist selection and navigate to the booking page for the selected therapist
  function pickDoc(therapistId) {
    //navigate to the booking page with the selected therapist's ID
    navigate(`/booking/${therapistId}`);
  }

  return (
    <div className="therapist-selection-container">
      <p className="select-doc-p">Choose your therapist:</p>

      <div className="therapist-selection">
        {therapists.map(({id, name, img}) => (
          <button key={id} className='therapist-option' onClick={() => pickDoc(id)}>
            <img id={id} src={img} alt={name}/>
          <span> {name} </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DocSelection;