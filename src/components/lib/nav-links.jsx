import { GiHouse, GiClick, GiBodySwapping, GiKey, GiChatBubble } from 'react-icons/gi';
import { FaCalendarAlt } from "react-icons/fa";

/**
 * Generates an array of navigation link objects for use in the navigation bar.
 * 
 * @param {Object} auth - Authentication object containing access token.
 * @param {Function} toggleLogin - Function to toggle login/logout state.
 * @param {Function} closeMobileMenu - Function to close the mobile menu.
 * @returns {Array} Array of navigation link objects.
 */

function navLinks(auth, toggleLogin, closeMobileMenu) {

  return [
    { title: 'Home', path: '/', icon: <GiHouse />, onClick: closeMobileMenu },
    { title: 'Services', path: '/services', icon: <GiClick />, onClick: closeMobileMenu },
    { title: 'About Us', path: '/about-us', icon: <GiBodySwapping />, onClick: closeMobileMenu },
    { title: 'Book Consultation', path: '/doc-selection', icon: <FaCalendarAlt />, onClick: closeMobileMenu },
    { title: 'Contact Us', path: '/#contact', icon: <GiChatBubble />, onClick: closeMobileMenu, isHashLink: true },
    { title: auth.accessToken? 'Logout' : 'Login', path: '/login-register', icon: <GiKey />, onClick: toggleLogin }
  ];
}

export default navLinks;