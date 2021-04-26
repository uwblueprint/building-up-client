import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Flex, Text, Image, Button, Heading, useToast } from '@chakra-ui/react';

import { SEND_VERIFICATION_EMAIL } from 'data/gql/user';
import Toast from 'components/dashboard/Toast/Toast';
import mailbox from 'assets/images/mailbox.png';

const EmailVerificationRequired = props => {
  const {
    user: { userId, email },
  } = useSelector(state => state.auth);

  const toast = useToast();
  const [sendVerificationEmail, { loading, data, error }] = useMutation(SEND_VERIFICATION_EMAIL);

  const handleResendEmail = e => {
    sendVerificationEmail({
      variables: { id: userId },
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error sending email confirmation email, please try again.',
        status: 'error',
        isClosable: true,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (data) {
      toast({
        position: 'top',
        render: props => (
          <Toast {...props} description="Verification email sent again, please check your email." isClosable />
        ),
      });
    }
  }, [data, toast]);

  return (
    <Flex direction="column" w="100%" align="center" textAlign="center">
      <Heading size="h1" as="h1" mt="42px">
        Verify your email
      </Heading>
      <Text fontSize="xl" w="50%" line-height="35px" mt="16px">
        You will need to verify your email to access your dashboard.
      </Text>
      <Image src={mailbox} h="250px" w="250px" mt="35px" />
      <Text fontSize="xl" w="50%" line-height="35px" mt="33px">
        An email has been sent to {email} with a link to verify your account. If you have not received the email after a
        few minutes, please check your spam folder.
      </Text>
      <Button size="lg" variant="black" my="43px" isLoading={loading} onClick={handleResendEmail}>
        Resend Email
      </Button>
    </Flex>
  );
};

export default EmailVerificationRequired;
