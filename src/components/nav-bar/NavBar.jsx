import "./NavBar.css";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { IoCloseCircle } from "react-icons/io5";
import { RxDropdownMenu } from "react-icons/rx";
import { GiPuzzle } from "react-icons/gi";
import { IconContext } from "react-icons";
import navLinks from "../lib/nav-links";
import { AuthContext } from '../../App';

function NavBar() {
  const [click, setClick] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  // toggles the click state between true and false
  const handleClick = () => setClick(!click);

  // sets the click state to false, closing the mobile menu
  const closeMobileMenu = () => setClick(false);

 function handleAuth(){
    if (auth) {
      setAuth(null);
      localStorage.removeItem("accessToken")
    }
    closeMobileMenu();
  }

  const links = navLinks(auth, handleAuth, closeMobileMenu);

  return (
    <>
      <IconContext.Provider value={{ size: "1.5rem", color: "white"}}>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <GiPuzzle className="navbar-icon" />
              <p>Fetele cu Psiho</p>
            </Link>
            <div className="short-menu" onClick={handleClick}>
              {click ? <IoCloseCircle className="short-menu-icon"/> : <RxDropdownMenu className="short-menu-icon"/>}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {links.map((link, index) => (
                <li className="nav-item" key={index}>
                  <div className="nav-links-div">
                    {!link.isHashLink ? (
                      <NavLink to={link.path} className="nav-links" onClick={link.onClick}>
                        {link.title}
                      </NavLink>
                    ) : (
                      <HashLink smooth to={link.path} className="nav-links" onClick={link.onClick}
                      >
                        {link.title}
                      </HashLink>
                    )}
                  </div>
                  <div id="nav-links-icon">{link.icon}</div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;