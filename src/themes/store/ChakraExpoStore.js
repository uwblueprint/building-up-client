import React, { useState } from 'react';

import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react';

/* Temporary code for easily seeing Chakra stuff, will be removed later */
const ChakraExpoStore = () => {
  const [value, setValue] = useState('');

  return (
    <Box p="36px">
      <Stack direction="column" spacing="16px" maxW="50%" border="1px solid black" p="8px">
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
        <Heading size="boldCaption">Subtitle</Heading>
        <Heading size="lightCaption">Subtitle</Heading>
        <div>Here is some body text</div>
      </Stack>
    </Box>
  );
};

export default ChakraExpoStore;
