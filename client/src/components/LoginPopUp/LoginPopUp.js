import React from "react";
import PureModal from "react-pure-modal";
import LoginForm from "./LoginForm";

function LoginPopUp({ open, close, loggUser }) {
  return (
    <PureModal
      style={{ with: "100vh" }}
      shouldCloseOnEsc={true}
      isOpen={open}
      onClose={close}
    >
      <LoginForm loggUser={loggUser} closeModal={close}></LoginForm>
    </PureModal>
  );
}

export default LoginPopUp;
