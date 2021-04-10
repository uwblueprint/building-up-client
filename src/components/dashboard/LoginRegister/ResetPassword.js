import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Box, Flex, Center, Button, Text, Input, Heading } from '@chakra-ui/react';
import { SEND_PASSWORD_RESET } from '../../../data/gql/user';

const ResetPassword = props => {
  const { setLoginRegister } = props;
  const [email, setEmail] = useState('');
  const [submitted, toggleSubmitted] = useState(false);
  const [SendPasswordRequest] = useLazyQuery(SEND_PASSWORD_RESET, {
    variables: {
      email,
    },
    onCompleted: d => {
      console.log(d.sendPasswordEmail);
      toggleSubmitted(true);
    },
  });

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  // const onSubmitForm = e => {
  //   try {
  //     SendPasswordRequest({
  //       variables: { email },
  //     }).then(data => {
  //       console.log(data);
  //       toggleSubmitted(true);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Center minW="35%" borderRadius="lg" borderWidth="1px" bg="white">
      {submitted === false ? (
        <Flex alignItems="flex-start" flexDirection="column" w="87%">
          <Button
            bg="white"
            onClick={() => setLoginRegister('LOGIN')}
            focus={{ boxShadow: 'white' }}
            marginTop="21px"
            marginBottom="30px"
            paddingLeft="0"
            paddingRight="0"
            onChange={onChangeEmail}
          >
            {'< Return to Login'}
          </Button>
          <Box marginBottom="24px">
            <Heading size="h1" as="h1" textTransform="capitalize">
              Change Password
            </Heading>
          </Box>
          <Text marginBottom="8px">Enter Your Email Here</Text>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChangeEmail}
            isRequired
            marginBottom="26px"
          />
          <Button onClick={SendPasswordRequest} marginBottom="79px">
            Email me a recovery link
          </Button>
        </Flex>
      ) : (
        <Flex alignItems="flex-start" flexDirection="column" w="87%" marginTop="40px">
          <Box marginBottom="24px">
            <Heading size="h1" as="h1" textTransform="capitalize">
              Change Password
            </Heading>
          </Box>
          <Text marginBottom="79px">
            An email has been sent. Please follow the link in your email to reset your password!
          </Text>
        </Flex>
      )}
    </Center>
  );
};

export default ResetPassword;
