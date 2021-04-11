import React, { useEffect, useState } from 'react';
import { Redirect, useParams, NavLink } from 'react-router-dom';
import { VERIFY_ACCOUNT } from 'data/gql/user';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Heading, Spinner, Text, VStack, Flex, Image, Button } from '@chakra-ui/react';
import { UPDATE_USER_VERIFICATION } from 'data/actions/type';
import logo from 'assets/images/logo-black.png';

function EmailVerify(props) {
  const dispatch = useDispatch();
  const { hash } = useParams();
  const {
    user: { userId: id },
  } = useSelector(state => state.auth);
  const [isValidLink, setValidLink] = useState(false);

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
        setValidLink(true);
      }
    }
  }, [dispatch, verifyAccountData]);

  return verifyAccountLoading ? (
    <Center h="100%">
      <Spinner size="xl" />
    </Center>
  ) : (
    <Box w="100%" justify="center" align="center">
      <Flex justify="center">
        <Image src={logo} w="350px" />
      </Flex>
      <Box>
        <Heading size="h1" as="h1" mt="75px">
          {isValidLink ? 'Email Verified' : "Oops! The link you've followed is invalid."}
        </Heading>
      </Box>
      <Text fontSize="2xl" mt="32px">
        {isValidLink
          ? 'Your email has been verified successfully.'
          : 'Please check your email for the correct verification link.'}
      </Text>
      <Button
        sice="lg"
        textColor="white"
        bg="black"
        _hover={{ bg: 'gray.800' }}
        _active={{ bg: 'gray.700' }}
        my="46px"
        as={NavLink}
        to="/home"
      >
        Return to Home
      </Button>
    </Box>
  );
}

export default EmailVerify;
