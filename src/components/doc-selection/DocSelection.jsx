import { useNavigate } from 'react-router-dom';
import alina from "../../assets/pic3.jpg";
import andra from "../../assets/pic3.jpg";
import "./DocSelection.css";

function DocSelection() {
  const navigate = useNavigate();

  // created in case therapist list becomes bigger
  const therapists = [
    {id: 'alinaS', name: 'Alina Salomie', img: alina},
    {id: 'andraC', name: 'Andra Costin', img: andra}
  ]

  function pickDoc(therapistId) {
    console.log('This is DOC SELECTION');
    console.log({ therapistId });
    navigate(`/booking/${therapistId}`);
  }

  return (
    <div className="therapist-selection-container">
      <p className="select-doc-p">Choose your therapist:</p>

      <div className="therapist-selection">
        {therapists.map(({id, name, img}) => (
          // eslint-disable-next-line react/jsx-key
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