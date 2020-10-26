import React, { useState } from 'react';
import { useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";


const REGISTER_MUTATION = gql`
    mutation createNewUser($firstName: String!, $lastName: String!, $email: String!,  $password: String!) {
        register(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
            firstName
        }
    }
`;

function Register(props) {
    
    const client = useApolloClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  
    const handleClick = async (e) => { 
        e.preventDefault();
      client
        .mutate({
          variables: { firstName: firstName, lastName: lastName, email: email, password: password },
          mutation: REGISTER_MUTATION
        })
        .then(res => {
          console.log(res);
          props.history.push("/login");    
        })
        .catch(err => console.log("Error on login API call: %s", err));
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

