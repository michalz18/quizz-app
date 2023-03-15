import React, { useState } from 'react';
import PureModal from 'react-pure-modal';
import LoginForm from './LoginForm';

function LoginPopUp({open, close}) {
    return (
        <PureModal style={{with: '100vh'}}
        shouldCloseOnEsc = {true}
        isOpen={open}
        onClose={close}
    >
        <LoginForm></LoginForm>
    </PureModal>
    );
}

export default LoginPopUp;