import React, { useState } from 'react';

import { Box, Button, Grid, Heading, Input } from '@chakra-ui/react';

/* Temporary code for easily seeing Chakra stuff, will be removed later */
const ChakraExpoDashboard = () => {
  const [value, setValue] = useState('');

  return (
    <Box p="36px">
      <Grid autoFlow="row" gap="16px" maxW="50%" border="1px solid black" p="8px">
        <Heading as="h1" size="h1">
          Heading 1
        </Heading>
        <Heading as="h2" size="h2">
          Heading 2
        </Heading>
        <Heading as="h3" size="h3">
          Heading 3
        </Heading>
        <Heading as="h4" size="h4">
          Heading 4
        </Heading>
        <Heading as="h2" size="subtitle">
          Subtitle
        </Heading>
        <div>Here is some body text</div>
        <Input type="text" name="text" placeholder="Input..." value={value} onChange={e => setValue(e.target.value)} />
        <Button type="button" role="button">
          Button
        </Button>
      </Grid>
    </Box>
  );
};

export default ChakraExpoDashboard;
