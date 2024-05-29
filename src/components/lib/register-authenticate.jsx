export async function signIn(user, navigate, setServerErr, setAuth) {
  console.log("This is SIGN IN");
  // console.log({ user });
  // console.log({ navigate });
  // console.log({ setAuth });

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log({response});
    // console.log({ data });
    // console.log(data.user.id);

    // handle ok server responses
    if (response.ok) {
      console.log("Sign IN successful:", data);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.user.id);
      setAuth({ accessToken: data.accessToken, userId: data.user.id });
      navigate("/");
    }

    // handle non-ok server responses
    if (response.status === 400) {
      setServerErr(
        "An error occurred during sign-in. Please check your credentials and try again."
      );
      return;
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    setServerErr("An unexpected error occurred. Please try again later.");
  }
}

export async function signUp(user, setServerErr, setSuccessMsg, navigate, setAuth) {
  console.log("This is SIGN UP");
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log({ response });

    if (response.ok) {
      // console.log("Sign UP successful:", data);
      // alert('Sign up successful. Welcome!')
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
      console.log(data.message);
      setServerErr(
        "Error occurred during sign-up. Please check credentials and retry."
      );
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    setServerErr("An unexpected error occurred. Please try again later.");
  }
}
