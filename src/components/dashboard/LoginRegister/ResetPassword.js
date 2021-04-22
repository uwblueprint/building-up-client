import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Flex,
  Center,
  Button,
  Text,
  Input,
  Heading,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  chakra,
} from '@chakra-ui/react';
import { SEND_PASSWORD_RESET } from 'data/gql/user';

const ResetPassword = props => {
  const { setLoginRegister } = props;
  const [email, setEmail] = useState('');

  const [sendPasswordRequest, { loading, data, error }] = useLazyQuery(SEND_PASSWORD_RESET);

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    sendPasswordRequest({ variables: { email } });
  };

  return (
    <Center minW="35%" borderRadius="lg" borderWidth="1px" bg="white">
      <Flex alignItems="flex-start" flexDirection="column" w="87%">
        <Link onClick={() => setLoginRegister('LOGIN')} mt="21px" mb="30px" px={0}>
          {'< Return to Login'}
        </Link>
        {!data ? (
          <chakra.form w="100%" onSubmit={onSubmit}>
            <VStack spacing={6} align="flex-start">
              <Heading size="h1" as="h1">
                Change Password
              </Heading>
              <FormControl id="email-password-reset" isInvalid={error}>
                <FormLabel mb="8px">Enter Your Email Here</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={onChangeEmail}
                  isRequired
                />
                <FormErrorMessage>Something went wrong, please try again later</FormErrorMessage>
              </FormControl>
              <Button type="submit" mb="79px" isLoading={loading} alignSelf="center">
                Email me a recovery link
              </Button>
            </VStack>
          </chakra.form>
        ) : (
          <>
            <Box mb="24px">
              <Heading size="h1" as="h1">
                Change Password
              </Heading>
            </Box>
            <Text mb="79px">An email has been sent. Please follow the link in your email to reset your password!</Text>
          </>
        )}
      </Flex>
    </Center>
  );
};

export default ResetPassword;
