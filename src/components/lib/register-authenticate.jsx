/**
 * Handles user authentication by sending a login request to the server.
 * * below params are sent from SignIn-SignUp.jsx component file

 * @param {Object} user - The user credentials to log in with.
 * @param {Function} navigate - The function to navigate to different routes.
 * @param {Function} setServerErr - Function to set server error messages.
 * @param {Function} setAuth - Function to set authentication state.
 */

export async function signIn(user, navigate, setServerErr, setAuth) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.user.id);
      setAuth({ accessToken: data.accessToken, userId: data.user.id });
      navigate('/');
    } else if(response.status === 400) {
      setServerErr(
        "An error occurred during sign-in. Please check your credentials and try again."
      );
      return;
    }
  } catch (error) {
    setServerErr("An unexpected error occurred. Please try again later.");
  }
}

/**
 * Handles user registration by sending a signup request to the server.
 * below params are sent from SignIn-SignUp.jsx component file
 * @param {Object} user - the user details to sign up with.
 * @param {Function} setServerErr - function to set server error messages.
 * @param {Function} setSuccessMsg - function to set success messages.
 * @param {Function} navigate -the function to navigate to different routes.
 * @param {Function} setAuth - function to set authentication state.
 */
export async function signUp(user, setServerErr, setSuccessMsg, navigate, setAuth) {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (response.ok) {
      //redirects user to home page --> login & register share a path, redirecting to login is not do-able
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.user.id);
      setAuth({ accessToken: data.accessToken, userId: data.user.id });
      setSuccessMsg(`Welcome! You've successfully registered.`);
      setTimeout(() => {
         navigate("/");
      }, 2500);
    } else {
      // handle non-ok responses ( 400, 401)
      setServerErr(
        "Error occurred during sign-up. Please check credentials and retry."
      );
    }
  } catch (error) {
    setServerErr("An unexpected error occurred. Please try again later.");
  }
}
