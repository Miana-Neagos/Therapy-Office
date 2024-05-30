import { useContext, useState, useRef } from 'react';
import './SignIn-SignUp.css';
import { signIn, signUp } from '../lib/register-authenticate';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import {validateForm} from '../lib/data-validation'

function LoginRegister() {
  const [signUpMode, setSignUp] = useState(false);
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate();
  //below errors are connected to the register-authenticate file, where signIn & signUp functions reside
  const [serverErr , setServerErr] = useState(null);
  const [validationErr, setValidationErr] = useState({})
  const [passErr, setPassErr] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null)
 
  // catch a reference to the form element using "useRef" hook
  // Create a reference to the form
  const formRef = useRef();

  function toggleSignInUp() {
    setSignUp(!signUpMode);
    formRef.current.reset();
    setServerErr(null);
    setValidationErr({});
    setPassErr(null);
    setSuccessMsg(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setServerErr(null);
    setValidationErr({});
    setPassErr(null);
    setSuccessMsg(null);

    // catching the user input values + destructuring user input after "if"
    const formElement = formRef.current;
    const { name, email, password, retypePassword } = formElement;

    const user = {
      name: name?.value,
      email: email.value,
      password: password.value,
    };

    if (signUpMode) {
      if (password.value !== retypePassword.value) {
        // console.warn("Passwords don't match!");
        setPassErr("Passwords don't match!");
        return;
      }

      const errors = validateForm(user);
      
      if (Object.keys(errors).length > 0) {
        setValidationErr(errors);
        return;
       } 
    }
    
    if (signUpMode) {
      // SIGN UP function found in register-authenticate component
      signUp(user, setServerErr, setSuccessMsg, navigate, setAuth);
    } else {
      // SIGN IN function found in register-authenticate component -sending setAuth so token is caught and saved @App level (eventually)
      signIn(user,navigate, setServerErr, setAuth);
    }
  }

  return (
    <div className="container">
      <div className={`form-container ${signUpMode ? 'sign-up-mode' : ''}`}>
      {successMsg ? (
          <div className="success-message"><span>{successMsg}</span></div> 
        ) : (
        <form ref={formRef} className="form" onSubmit={handleSubmit}>
          {signUpMode ? (
            <>
              <h2>Create your Account</h2>
              {serverErr && <span className="error-message">{serverErr}</span>}
              <label className="login-register-label "htmlFor="name">Name:</label>
              {validationErr.name && <p className="error-message">{validationErr.name}</p>}
              <input type="text" id="name" name="name"/>

              <label className="login-register-label "htmlFor="email">Email:</label>
              {validationErr.email && <p className="error-message">{validationErr.email}</p>}
              <input type="text" id="email" name="email" />

              <label className="login-register-label "htmlFor="password">Password:</label>
              {validationErr.password && <p className="error-message">{validationErr.password}</p>}
              <input type="password" id="password" name="password"/>

              <label className="login-register-label "htmlFor="retypePassword">Retype Password:</label>
              {passErr ? <p className='error-message'>{passErr}</p> : ""}
              <input type="password" id="retypePassword" name="retypePassword"/>

              <button type="submit" className="submit">Sign Up</button>
            </>
          ) : (
            <>
              <h2>Welcome</h2>
              {serverErr && <span className="error-message">{serverErr}</span>}
              <label className="login-register-label "htmlFor="email">Email:</label>
              <input type="email" id="email" name="email"/>

              <label className="login-register-label "htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
              
              <button type="submit" className="submit">Sign In</button>
              {/* <p className="forgot-pass">Forgot password?</p> */}
            </>
          )}
        </form>
       )}
      {successMsg? '' :
        <div className="img">
          <h3>{signUpMode ? 'Already have an account?' : "Don't have an account?"}</h3>
          <button className="toggle-btn" onClick={toggleSignInUp}>
            {signUpMode ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      }
      </div>
    </div>
  );
}

export default LoginRegister;