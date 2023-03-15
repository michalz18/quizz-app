import { useState } from "react";
import "./LoginForm.css";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    console.log(email);
    console.log(password);
  }

  function handleLogIn() {
    console.log(email);
    console.log(password);
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
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </label>
          <label className="input-wrapper">
            <div className="login-input">
              <div className="input-label">Password</div>
              <input
                type="password"
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
