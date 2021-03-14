import * as React from 'react';
import { Flex, Heading } from '@chakra-ui/layout';

const Navbar = () => (
  <>
    <Flex bgColor="black" h={28}>
      <Heading as="h3" size="md" color="white">
        Navbar
      </Heading>
    </Flex>
    <Flex bgColor="lightgray" h={8}>
      <Heading as="h3" size="md">
        Team Name
      </Heading>
    </Flex>
  </>
);

export default Navbar;
