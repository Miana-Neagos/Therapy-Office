import { GiHouse, GiClick, GiBodySwapping, GiCalendar, GiKey, GiChatBubble } from 'react-icons/gi';
import { FaCalendarAlt } from "react-icons/fa";

function navLinks(auth, handleAuth, closeMobileMenu) {
  return [
    { title: 'Home', path: '/', icon: <GiHouse />, onClick: closeMobileMenu },
    { title: 'Services', path: '/services', icon: <GiClick />, onClick: closeMobileMenu },
    { title: 'About Us', path: '/about-us', icon: <GiBodySwapping />, onClick: closeMobileMenu },
    { title: 'Book Consultation', path: '/doc-selection', icon: <FaCalendarAlt />, onClick: closeMobileMenu },
    { title: 'Contact Us', path: '/#contact', icon: <GiChatBubble />, onClick: closeMobileMenu, isHashLink: true },
    { title: auth ? 'Logout' : 'Login', path: '/login-register', icon: <GiKey />, onClick: handleAuth }
  ];
}

export default navLinks;