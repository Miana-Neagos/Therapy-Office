// import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaQuestionCircle, FaInfoCircle, FaBook, FaYoutube } from "react-icons/fa";
import "./QuickLinks.css"; // Import QuickLinks CSS
import { fetchPlaylist } from "../lib/playlists";
import { useEffect, useState } from "react";

function QuickLinks() {
  // console.log('this is QUICK LINKS');
  const [playlist , setPlaylist] = useState('');
  // console.log({playlist});

  useEffect(() => {
    fetchPlaylist(setPlaylist);
  }, []);

  return (
    <div className="quick-links">
      <IconContext.Provider value={{ size: "3em" }}>
        {playlist && (
          <div>
            <FaYoutube />
            <a href={playlist} target="_blank" rel="noopener noreferrer">
              <button>How Therapy Works</button>
            </a>
          </div>
        )}
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
      </IconContext.Provider>
    </div>
  );
}

export default QuickLinks;