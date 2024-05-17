import { useState } from 'react';
import './SignIn-SignUp.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleButtonClick = () => {
    setIsSignUp(prevState => !prevState);
  };

  return (
    <div className="container">
      <div className={`form-container ${isSignUp ? 'sign-up-mode' : ''}`}>
        <form className="form">
          {isSignUp ? (
            <>
              <h2>Create your Account</h2>
              <label htmlFor="name">Name:
                <input type="text" id="name" />
              </label>
              <label htmlFor="password">Password:
                <input type="password" id="password" />
              </label>
              <label htmlFor="retype-password">Retype Password:
                <input type="password" id="retype-password" />
              </label>
              <button type="button" className="submit">Sign Up</button>
            </>
          ) : (
            <>
              <h2>Welcome</h2>
              <label htmlFor="email">Email:
                <input type="email" id="email" />
              </label>
              <label htmlFor="password">Password:
                <input type="password" id="password" />
              </label>
              <button type="button" className="submit">Sign In</button>
              <p className="forgot-pass">Forgot password?</p>
            </>
          )}
        </form>

      <div className="img">
        <h3>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</h3>
        <button className="toggle-btn" onClick={handleButtonClick}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
      </div>
    </div>
  );
}

export default Login;


