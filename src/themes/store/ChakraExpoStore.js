import React, { useState } from 'react';
import { Box, Button, Heading, Input, Icon, Stack } from '@chakra-ui/react';
import { FaChevronCircleRight } from 'react-icons/fa';

/* Temporary code for easily seeing Chakra stuff, will be removed later */
const ChakraExpoStore = () => {
  const [value, setValue] = useState('');

  return (
    <Box p="36px">
      <Stack direction="column" spacing="16px" border="1px solid black" p="8px">
        <Stack>
          <Heading as="h1" size="h1">
            Heading 1
          </Heading>
        </Stack>
        <Heading as="h2" size="h2">
          Heading 2
        </Heading>
        <Heading as="h3" size="h3">
          Heading 3
        </Heading>
        <Heading size="subtitle">Subtitle</Heading>
        <Heading size="boldCaption">Bold Caption</Heading>
        <Heading size="lightCaption">Light Caption</Heading>
        <div>Here is some body text</div>
        <Button size="lg">
          <Heading size="subtitle">Large Button</Heading>
        </Button>
        <Button size="md">
          <Heading size="subtitle">Medium Button</Heading>
        </Button>
        <Button size="sm" rightIcon={<Icon as={FaChevronCircleRight} />}>
          <Heading size="subtitle">Small Button</Heading>
        </Button>
        <Button size="sm" variant="inverted" rightIcon={<Icon as={FaChevronCircleRight} />}>
          <Heading size="subtitle">Small Inverted Button</Heading>
        </Button>
        <Input placeholder="Coupon Code" />
      </Stack>
    </Box>
  );
};

export default ChakraExpoStore;
