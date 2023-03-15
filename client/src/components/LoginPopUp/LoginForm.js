import { useState } from "react";
import "./LoginForm.css";
function LoginForm({loggUser}) {
  const [email, setEmail] = useState("agnieszka@gmail.com");
  const [password, setPassword] = useState("greatsectet");

  function handleSignUp() {
    console.log(email);
    console.log(password);
  }

  async function handleLogIn() {
    const user = await getUser();
    loggUser(user);
  }

  async function getUser() {
    try {
        const endpoint = new URL('http://localhost:8080/user')
        endpoint.searchParams.set('email', email);
        endpoint.searchParams.set('password', password);
        const response = await fetch(endpoint);
        const user = await response.json();
        return user
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
      <div id="login-form">
        <div id="login-form-header">
          <div id="login-form-header-logo">
            <div id="logo-wrapper">
              <img id="logo" src="/ecological.png" alt="logo"></img>
            </div>
            <div id="app-name">
              Quiz<section id="sec-part">App</section>
            </div>
          </div>
          <div className="login-form-header-text">
            <div>Welcome!</div>
            <div>Please login/signup to your account.</div>
          </div>
        </div>
        <form
          onSubmit={(event) => event.preventDefault()}
          id="login-signup-form"
        >
          <label className="input-wrapper">
            <div className="login-input">
              <div className="input-label">Email Address</div>
              <input
                type="text"
                value="agnieszka@gmail.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </label>
          <label className="input-wrapper">
            <div className="login-input">
              <div className="input-label">Password</div>
              <input
                type="password"
                value="greatsectet"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </label>
          <div id="additional-choices">
            <label className="checkbox-wrapper">
              <input type="checkbox" />
              <div className="checkbox-label">Remember Me</div>
            </label>
            <div className="forgot-password">Forgot Password?</div>
          </div>
          <div id="google-login-wrapper">
            <div className="google-text">Or login with </div>
            <div id="google">Google</div>
          </div>

          <div id="login-submit-btns">
            <button className="login" onClick={handleLogIn}>LOGIN</button>
            <button className="sigup-btn" onClick={handleSignUp}>SIGNUP</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
