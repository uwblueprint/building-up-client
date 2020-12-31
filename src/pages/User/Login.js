import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

function Login(props) {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async e => {
    e.preventDefault();
    client
      .mutate({
        variables: { email: email, password: password },
        mutation: LOGIN_MUTATION
      })
      .then(res => {
        sessionStorage.setItem('userID', res.data.login.id);
        console.log(sessionStorage.getItem('userID'));
        props.history.push('/');
      })
      .catch(err => console.log('Error on login API call: %s', err));
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
