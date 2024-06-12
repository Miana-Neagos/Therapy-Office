// import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaQuestionCircle, FaInfoCircle, FaBook, FaYoutube } from "react-icons/fa";
import "./QuickLinks.css"; 

/**
 * The QuickLinks component provides a set of quick navigation links
 * to various sections of the website and an external YouTube playlist.
 */
function QuickLinks() {
  const playlistUrl = 'https://www.youtube.com/watch?v=R4B9BPBiIHo&list=PLT2eOpjZ2tjeUbeo7uM27a1Ysbk4FAs9J'

  return (
    <div className="quick-links">
      <IconContext.Provider value={{ size: "2em" , color:'#4a726c'}}>
        <div>
          <Link to="/services">
            <button> <FaBook /> Services</button>
          </Link>
        </div>
        <div>
          <Link to="/faq">
            <button> <FaQuestionCircle /> FAQ</button>
          </Link>
        </div>
        <div>
          <Link to="/about-us">
            <button> <FaInfoCircle /> About Us</button>
          </Link>
        </div>
        <div>
          <a href={playlistUrl} target="_blank">
            <button><FaYoutube /> How Therapy Works</button>
          </a>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default QuickLinks;