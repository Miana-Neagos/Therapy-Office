// import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaQuestionCircle, FaInfoCircle, FaBook, FaYoutube } from "react-icons/fa";
import "./QuickLinks.css"; 

function QuickLinks() {
  const playlistUrl = 'https://www.youtube.com/watch?v=R4B9BPBiIHo&list=PLT2eOpjZ2tjeUbeo7uM27a1Ysbk4FAs9J'

  return (
    <div className="quick-links">
      <IconContext.Provider value={{ size: "3em" , color:'#603f22'}}>
        <div>
          <FaBook />
          <Link to="/services">
            <button>Services</button>
          </Link>
        </div>
        <div>
          <FaQuestionCircle />
          <Link to="/faq">
            <button>FAQ</button>
          </Link>
        </div>
        <div>
          <FaInfoCircle />
          <Link to="/about-us">
            <button>About Us</button>
          </Link>
        </div>
        <div>
          <FaYoutube />
          <a href={playlistUrl} target="_blank">
            <button>How Therapy Works</button>
          </a>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default QuickLinks;