import * as React from 'react';
import { VStack, Heading, Button, Text } from '@chakra-ui/react';
import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';

const PageNotFound = () => (
  <VStack p={24}>
    <Heading textAlign="center">Item not found</Heading>
    <Text mb={8}>Oops! The product you are looking for could not be found.</Text>
    <Button size="sm" as={PreserveQueryParamsLink} textTransform="uppercase" to="/store">
      {'Return Home'}
    </Button>
  </VStack>
);

export default PageNotFound;
