import { GiHouse, GiClick, GiBodySwapping, GiKey, GiChatBubble } from 'react-icons/gi';
import { FaCalendarAlt } from "react-icons/fa";

function navLinks(auth, toggleLogin, closeMobileMenu) {
  // console.log('this is NAV LINKS');
  // console.log({auth});
  if (auth.accessToken) {
    // console.log('button is LOGOUT');
  } else {
    // console.log('button is LOGIN');
  }

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