import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Flex,
  Center,
  Button,
  Text,
  Input,
  Heading,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  chakra,
} from '@chakra-ui/react';
import logo from 'assets/images/logo-black.png';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { RESET_PASSWORD_MUTATION } from '../../data/gql/user';
import { DASHBOARD_ROOT_PATH } from 'components/dashboard/DashboardRouter/DashboardRouter';

const InputPassword = props => {
  const { token } = useParams();
  const { resetPassword, loading, error } = props;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = e => {
    setPasswordConfirm(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (password === passwordConfirm) {
      setPasswordsDoNotMatch(false);
      resetPassword({
        variables: {
          jwtToken: token,
          password: password,
        },
      });
    } else {
      setPasswordsDoNotMatch(true);
    }
  };

  return (
    <Flex alignItems="flex-start" flexDirection="column" w="87%">
      <chakra.form onSubmit={onSubmitForm} w="100%">
        <VStack spacing={6} align="flex-start" py="50px">
          <Heading size="h1" as="h1">
            Change Password
          </Heading>
          <FormControl id="new-password">
            <FormLabel mb="8px">New Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="8+ characters"
              value={password}
              onChange={onChangePassword}
              isRequired
              minLength={8}
            />
          </FormControl>
          <FormControl id="confirm-new-password" isInvalid={passwordsDoNotMatch || error}>
            <FormLabel mb="8px">Re-enter Your Password</FormLabel>
            <Input
              type="password"
              name="passwordconfirm"
              placeholder="8+ characters"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              minLength={8}
              isRequired
            />
            <FormErrorMessage>
              {passwordsDoNotMatch
                ? 'The passwords you entered do not match'
                : 'Something went wrong,please try again later'}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" isLoading={loading} alignSelf="center">
            Change Password
          </Button>
        </VStack>
      </chakra.form>
    </Flex>
  );
};

const ConfirmPage = () => {
  return (
    <Flex alignItems="flex-start" flexDirection="column" w="87%" mt="40px">
      <Box mb="24px">
        <Heading size="h1" as="h1">
          Change Password
        </Heading>
      </Box>
      <Text mb="40px">You've successfully updated your password!</Text>
      <Button as={RouterLink} mb="50px" to={`${DASHBOARD_ROOT_PATH}/login`}>
        Return to Login
      </Button>
    </Flex>
  );
};

const ResetPassword = () => {
  const [resetPassword, { loading, data, error }] = useMutation(RESET_PASSWORD_MUTATION);

  return (
    <Flex minHeight="100vh" h="100%" w="100vw" justify="center" bg="background.login">
      <Box minW="35%" mb="50px">
        <Flex justify="center" mt="36px" mb="36px">
          <Image src={logo} w="350px" />
        </Flex>
        <Center minW="35%" borderRadius="lg" borderWidth="1px" bg="white">
          {data ? <ConfirmPage /> : <InputPassword resetPassword={resetPassword} loading={loading} error={error} />}
        </Center>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
