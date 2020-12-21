import React from 'react';
import { useApolloClient } from "@apollo/client";
import { logout } from '../../data/actions/auth';
import { useDispatch } from "react-redux";

function Logout(props) {
    const client = useApolloClient();
    const dispatch = useDispatch();

    const handleClick = async (e) => {
      e.preventDefault();
      dispatch(logout(client));
    };

    return (
        <div>
            <button onClick={handleClick}>Logout</button>
        </div> 

    );
  }

export default Logout; 
