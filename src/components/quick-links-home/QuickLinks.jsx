// import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaRegCalendarAlt, FaQuestionCircle, FaInfoCircle, FaBook } from "react-icons/fa";
import "./QuickLinks.css"; // Import QuickLinks CSS

function QuickLinks() {
  return (
    <div className="quick-links">
      <IconContext.Provider value={{ size: "3em" }}>
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
          <FaRegCalendarAlt />
          <Link to="/doc-selection">
            <button>Appointment</button>
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default QuickLinks;