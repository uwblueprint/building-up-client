import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { VERIFY_ACCOUNT } from 'data/gql/user';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { UPDATE_USER_VERIFICATION } from 'data/actions/type';

function EmailVerify(props) {
  const dispatch = useDispatch();
  const { hash } = useParams();
  const {
    user: { userId: id },
  } = useSelector(state => state.auth);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [
    verifyAccount,
    { loading: verifyAccountLoading, data: verifyAccountData, error: verifyAccountError },
  ] = useMutation(VERIFY_ACCOUNT);

  useEffect(() => {
    if (id && hash) {
      verifyAccount({ variables: { id, hash } });
    }
  }, [hash, id, verifyAccount]);

  useEffect(() => {
    if (verifyAccountData) {
      const {
        verifyAccount: { isVerified },
      } = verifyAccountData;
      dispatch({ type: UPDATE_USER_VERIFICATION, payload: isVerified });
      if (isVerified) {
        setShouldRedirect(true);
      }
    }
  }, [dispatch, verifyAccountData]);
  return shouldRedirect ? (
    <Redirect to="/home" />
  ) : verifyAccountLoading ? (
    <Center h="100%">
      <Spinner size="xl" />
    </Center>
  ) : (
    <VStack spacing={4} align="left">
      <Box>
        <Heading size="h1" as="h1">
          Invalid verification link
        </Heading>
      </Box>
      <Text>
        Oops, it looks like your verification link isn't correct. Try double checking you copied the link correctly.
      </Text>
      {verifyAccountError && <Text>Error: {verifyAccountError.graphQLErrors.map(err => err.message)}</Text>}
    </VStack>
  );
}

export default EmailVerify;
