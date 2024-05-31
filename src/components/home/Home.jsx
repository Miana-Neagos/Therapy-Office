import React, { useState } from "react";
import { Link } from "react-router-dom";
import Schedule from "../schedule/Schedule";
import MPlayer from "../how-are-you/MPlayer";
import "./Home.css"; // Import HomePage CSS
import ContactForm from "../contact-form/ContactForm";
import QuickLinks from "../quick-links-home/QuickLinks";
import Discovery from "../discovery-session/Discovery";

function HomePage() {
  const [showBox, setShowBox] = useState(false);

  const startDiscovery = () => {
    setShowBox(true);
  };

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

