import React, { useState } from "react";
import { Link } from "react-router-dom";
import Schedule from "../schedule/Schedule";
import MPlayer from "../how-are-you/MPlayer";
import "./Home.css";
import ContactForm from "../contact-form/ContactForm";
import QuickLinks from "../quick-links-home/QuickLinks";
import Discovery from "../discovery-session/Discovery";

//HomePage component serves as the main landing page of the application, providing users with quick access to various features
function HomePage() {
  //state to manage the visibility(UI rendering) of the Discovery component
  const [showBox, setShowBox] = useState(false);

  // below two functions are create for toggling the box for the "20 min discovery session"
  // startDiscovery sets "showBox" to true and renders the component
  const startDiscovery = () => {
    setShowBox(true);
  };
  // toggleMsgBox sets the state to false and hides the component
  const toggleMsgBox = () => {
    setShowBox(false);
  };

  return (
    <>
      <div>
        <div className="start-now-section">
          <h1>Start your journey today</h1>
          <h2>Restore your health and wellbeing</h2>
          <div className="buttons">
            <Link to="/doc-selection">
              <button>Book Consultation</button>
            </Link>
            <button onClick={startDiscovery}>20 Min Discovery</button>
          </div>
        </div>
        <QuickLinks />
        <MPlayer />
        <Schedule />
        <ContactForm />
        {showBox && <Discovery onClose={toggleMsgBox} />}
      </div>
    </>
  );
}

export default HomePage;

