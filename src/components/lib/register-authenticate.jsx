export async function signIn(user, navigate, setAuth) {
  console.log("This is SIGN IN");
  console.log({user});
  console.log({navigate});
  console.log({setAuth});
  
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log({data});
    console.log(data.user.id);

    if (response.ok) {
      console.log("Sign In successful:", data);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.user.id)
      setAuth({ accessToken: data.accessToken, userId: data.user.id });
      navigate("/");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
}

export async function signUp(user, navigate) {
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
    console.log("Sign Up successful:", data);
    navigate("/login-register");
  } catch (error) {
    console.error("Error during sign-up:", error);
  }
}