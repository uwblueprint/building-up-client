import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from "react-redux";
import { login } from '../../data/actions/auth';

function Login() {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleClick = async e => {
    e.preventDefault();
    dispatch(login(email, password, client));
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePass = e => {
    setPassword(e.target.value);
  };

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
        <button role="link">Login</button>
      </form>
    </div>
  );
}

export default Login;
