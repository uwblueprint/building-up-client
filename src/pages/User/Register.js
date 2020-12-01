import React, { useState } from 'react';
import { useApolloClient } from "@apollo/client";
import { useDispatch } from "react-redux";
import { register } from '../../data/actions/auth';

function Register(props) {
    
    const client = useApolloClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useDispatch();
  
    const handleClick = async (e) => { 
        e.preventDefault();
        dispatch(register(firstName, lastName, email, password, client ));
    };

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePass = (e) => {
        setPassword(e.target.value);
    }
  
    return (
        <div>
        <h1>Register Page</h1>
        <form onSubmit={handleClick}>
            <div>
                <input
                    name="firstName"
                    placeholder="firstName"
                    value={firstName}
                    onChange={onChangeFirstName}
                />
            </div>
            <div>
                <input
                    name="lastName"
                    placeholder="lastName"
                    value={lastName}
                    onChange={onChangeLastName}
                />
            </div>
            <div>
            <input
                name="email"
                placeholder="email"
                value={email}
                onChange={onChangeEmail}
            />
            </div>
            <div>
            <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChangePass}           
            />

            </div>
            <button role="link">
                Register
            </button>
        </form>
    </div> 

    );
  }
  
export default Register;

