import { useContext, useState } from 'react';
import './SignIn-SignUp.css';
import { signIn, signUp } from '../lib/register-authenticate';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

function LoginRegister() {
  const [signUpMode, setSignUp] = useState(false);
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate();
  // const [selectedTherapist, setSelectedTherapist] = useState('');

  const handleButtonClick = () => {
    setSignUp((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // catching the user input values + destructuring user input after "if"
    const formElement = e.target;
    const { name, email, password, retypePassword } = formElement;

    if (signUpMode && password.value !== retypePassword.value) {
      console.warn(`Passwords don't match!`);
      return;
    }
    
    const user = {
      name: name?.value,
      email: email.value,
      password: password.value,
    };

    if (signUpMode) {
      // SIGN UP function found in register-authenticate component
      signUp(user, navigate);
    } else {
      // SIGN IN function found in register-authenticate component -sending setAuth so token is caught and saved @App level (eventually)
      signIn(user,navigate,setAuth);
    }
  };

  return (
    <div className="container">
      <div className={`form-container ${signUpMode ? 'sign-up-mode' : ''}`}>
        <form className="form" onSubmit={handleSubmit}>
          {signUpMode ? (
            <>
              <h2>Create your Account</h2>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
              <label htmlFor="retypePassword">Retype Password:</label>
              <input type="password" id="retypePassword" name="retypePassword" />
              <button type="submit" className="submit">Sign Up</button>
            </>
          ) : (
            <>
              <h2>Welcome</h2>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
              <button type="submit" className="submit">Sign In</button>
              {/* <p className="forgot-pass">Forgot password?</p> */}
            </>
          )}
        </form>

        <div className="img">
          <h3>{signUpMode ? 'Already have an account?' : "Don't have an account?"}</h3>
          <button className="toggle-btn" onClick={handleButtonClick}>
            {signUpMode ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;