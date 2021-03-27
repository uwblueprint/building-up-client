import * as React from 'react';
import { VStack, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <VStack p={24}>
    <Heading mb={4} textAlign="center">
      Oops! The product you’re looking for could not be found.
    </Heading>
    <Button as={Link} textTransform="uppercase" to="/store">
      {'Return to Home'}
    </Button>
  </VStack>
);

export default PageNotFound;
