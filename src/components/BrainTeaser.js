import React, { useState } from 'react';
import { useApolloClient, useMutation, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { Heading, HStack, VStack, Text, Button } from '@chakra-ui/react';

import { currentUser } from '../data/actions/auth';

/* 
We update the user's name, then make a `getActiveUser` query through the line `dispatch(currentUser(client))`

But, there is no query being sent, and thus the user's name is not updated.

Why???
*/

const UPDATE_USER_NAME = gql`
  mutation updateUser($id: ID!, $firstName: String) {
    updateUser(id: $id, firstName: $firstName) {
      id
    }
  }
`;

const BrainTeaser = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { user } = useSelector(state => state.auth);
  const [newName, setNewName] = useState('');

  const [updateUserName] = useMutation(UPDATE_USER_NAME);

  const updateUser = () => {
    // First, update your user name to a random string
    const randStr = Math.random().toString(36).substring(7);
    setNewName(randStr);

    updateUserName({
      variables: { id: user.userId, firstName: randStr },
    })
      .then(data => {
        console.log('Update user name response:', data);
        // This should send another API call to get the current user.
        // Specifically, it should send the query `getActiveUser`
        // You can click into the function `currentUser`, you will eventually end up at `auth.service` and see the code which sends the GQL query being sent.
        //
        // So the question is, why is there no query being sent?
        // The user's first name is not refetched (and thus not updated in the UI) until you refresh the page.
        dispatch(currentUser(client));
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <VStack height="100%" align="flex-start" justify="center" spacing={2}>
      <HStack>
        <Heading size="h5">User' First Name:</Heading>
        <Text>{`${user.firstName}`}</Text>
      </HStack>
      <HStack>
        <Heading size="h5">User ID:</Heading>
        <Text>{`${user.userId}`}</Text>
      </HStack>
      {newName && <Text>{`New first name should be: ${newName}... but it isn't, until you refresh the page!`}</Text>}
      <Button sz="lg" onClick={updateUser}>
        Update First Name Randomly
      </Button>
    </VStack>
  );
};

export default BrainTeaser;
