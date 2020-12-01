import React, { useState } from 'react';
import { useApolloClient } from "@apollo/client";
import { login } from '../../data/actions/auth';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

function Login(props) {
    const client = useApolloClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn } = useSelector(state => state.auth);
    console.log("hello");
    console.log(isLoggedIn);
    const dispatch = useDispatch();

    const handleClick = async (e) => {
      e.preventDefault();
      dispatch(login(email,password, client));
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePass = (e) => {
        setPassword(e.target.value);
    }

    //Hardcoded for now
    if (isLoggedIn){
        return(
            <Redirect to="/1/home"/>
        )
    }

    return (
        <div>
        <h1>Login Page</h1>
        <form onSubmit={handleClick}>
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
                Login
            </button>
        </form>
    </div> 

    );
  }
  
export default Login;

