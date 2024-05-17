import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alina from "../../assets/pic3.jpg";
import andra from "../../assets/pic3.jpg";
import "./DocSelection.css";

function DocSelection() {
  const navigate = useNavigate();
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  function pickDoc(therapist) {
    setSelectedTherapist(therapist);
    navigate("/booking", { state: { therapist } });
  }

  return (
    <div className="therapist-selection-container">
      <p className={`select-doc-p ${!selectedTherapist ? '' : 'hidden'}`}>Choose your therapist:</p>

      <div className="therapist-selection">
        <button className="therapist-option" onClick={() => pickDoc('alinaS')}>
          <img id='alinaS' src={alina} alt="Salomie Alina" />
          <span> Alina Salomie </span>
        </button>
        
        <button className="therapist-option" onClick={() => pickDoc('andraC')}>
          <img id='andraC' src={andra} alt="Costin Andra" />
          <span> Andra Petre </span>
        </button>
      </div>
    </div>
  );
}

export default DocSelection;