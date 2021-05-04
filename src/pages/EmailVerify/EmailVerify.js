import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { VERIFY_ACCOUNT } from 'data/gql/user';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Heading, Spinner, Text, Flex, Image, Button } from '@chakra-ui/react';
import { UPDATE_USER_VERIFICATION } from 'data/actions/type';
import { DASHBOARD_ROOT_PATH } from 'components/dashboard/DashboardRouter/DashboardRouter';
import logo from 'assets/images/logo-black.png';

function EmailVerify() {
  const dispatch = useDispatch();
  const { hash } = useParams();
  const {
    user: { userId: id },
  } = useSelector(state => state.auth);

  const [verifyAccount, { loading: verifyAccountLoading, data: verifyAccountData }] = useMutation(VERIFY_ACCOUNT);

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
    }
  }, [dispatch, verifyAccountData]);

  return verifyAccountLoading || !verifyAccountData ? (
    <Center w="100%" h="100%">
      <Spinner size="xl" />
    </Center>
  ) : (
    <Box w="100%" justify="center" align="center">
      <Flex justify="center">
        <Image src={logo} w="350px" />
      </Flex>
      <Box>
        <Heading size="h1" as="h1" mt="75px">
          {verifyAccountData.verifyAccount.isVerified ? 'Email Verified' : "Oops! The link you've followed is invalid."}
        </Heading>
      </Box>
      <Text fontSize="2xl" mt="32px">
        {verifyAccountData.verifyAccount.isVerified
          ? 'Your email has been verified successfully.'
          : 'Please check your email for the correct verification link.'}
      </Text>
      <Button size="lg" variant="black" my="46px" as={RouterLink} to={`${DASHBOARD_ROOT_PATH}/home`}>
        Return to Home
      </Button>
    </Box>
  );
}

export default EmailVerify;
