import React from 'react';
import { Text, Button, Center, Heading, VStack } from '@chakra-ui/react';

import PageHeading from 'components/dashboard/PageHeading/PageHeading';

const InitialPage = props => {
  const { incrementPage } = props;
  return (
    <VStack w="100%" h="100%" spacing={8}>
      <PageHeading title="Welcome" />
      <Center flexDirection="column" bg="background.primary" w="100%" h="227px" borderRadius="4px">
        <Heading as="h4" size="h4" marginBottom={6}>
          It looks like you don't have a team yet!
        </Heading>
        <Button size="lg" onClick={incrementPage} _focus={{ boxShadow: 'white' }}>
          Create a Team
        </Button>
      </Center>
      <Text opacity="0.5">OR</Text>
      <Center flexDirection="column" bg="background.primary" w="100%" h="227px" borderRadius="4px">
        <Heading as="h4" size="h4" marginBottom={6}>
          Have you been invited to a team?
        </Heading>
        <Text>Check your email for an invite link.</Text>
      </Center>
    </VStack>
  );
};

export default InitialPage;
