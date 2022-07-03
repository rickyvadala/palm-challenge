import React from 'react';
import {RegisterForm} from "../../feature/register/RegisterForm";
import './Register.scss'

const Register: React.FC = () => {
    return (
        <>
            <h1>Register</h1>
            <RegisterForm/>
        </>
    );
};


export default Register;