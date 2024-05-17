import "./Home.css"; // Import HomePage CSS
import { Link } from "react-router-dom";
// import NavBar from './NavBar'; 
import Schedule from "../schedule/Schedule";
import MPlayer from "../how-are-you/MPlayer";
import { IconContext } from "react-icons";
import { FaRegCalendarAlt, FaQuestionCircle, FaInfoCircle, FaBook,} from "react-icons/fa";
import ContactForm from "../contact-form/ContactForm";

function HomePage() {
  return (
    <>
    <div>
        {/* <NavBar /> */}
        <Link to="/doc-selection">
          <button className="bookingBtn">Book Consultation</button>
        </Link>
        <Link to="/login">
          <button className="loginRegisterBtn">Login/Register</button>
        </Link>
        {/* <div>
        <iframe src="https://giphy.com/embed/zyjCXPXNo39i0CB467" 
          width="280" height="380" className="giphy-embed"></iframe>
        </div> */}
        <div className="start-now-section">
          <h1>Start your journey today</h1>
          <h2>Restore your health and wellbeing</h2>
          <div className="buttons">
            <Link to="/doc-selection"><button>Book Consultation</button></Link>
            <Link to="/booking"><button> 15 min Discovery</button></Link>
          </div>
        </div>
        <div className="quick-links">
          <IconContext.Provider value={{ size: "2em" }}>
            <div>
              <FaBook />
              <Link to="/services"><button>Services</button></Link>
            </div>
            <div>
              <FaQuestionCircle />
              <Link to="/faq"><button>FAQ</button></Link>
            </div>
            <div>
              <FaInfoCircle />
              <Link to="/about-us"><button>About Us</button></Link>
            </div>
            <div>
              <FaRegCalendarAlt />
              <Link to="/doc-selection"><button>Appointment</button></Link>
            </div>
          </IconContext.Provider>
        </div>
        <MPlayer />
        <Schedule />
        <ContactForm /> 
    </div>
    </>
  );
}

export default HomePage;
