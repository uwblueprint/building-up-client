import React, { useState } from 'react';

import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react';
import DataTable from '../../components/common/dashboard/Table';
/* Temporary code for easily seeing Chakra stuff, will be removed later */
const ChakraExpoDashboard = () => {
  const [value, setValue] = useState('');

  return (
    <Box p="36px">
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
          <Heading as="h4" size="h4">
            Heading 4
          </Heading>
          <Heading as="h2" size="subtitle">
            Subtitle
          </Heading>
          <div>Here is some body text</div>
          <Input
            type="text"
            name="text"
            placeholder="Input..."
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button type="button" role="button">
            Button
          </Button>
        </Stack>
      </Box>
      <Box p="36px">
        <DataTable
          headers={['Name', 'Email', '']}
          data={[
            { name: 'FirstName LastName', email: 'example@email.com', action: 'Remove' },
            { name: 'FirstName LastName', email: 'example@email.com', action: 'Remove' },
            { name: 'FirstName LastName', email: 'example@email.com', action: 'Remove' },
            { name: 'FirstName LastName', email: 'example@email.com', action: 'Remove' },
            { name: 'FirstName LastName', email: 'example@email.com', action: 'Remove' },
            { name: 'FirstName LastName', email: 'example@email.com', action: 'Remove' },
          ]}
        />
      </Box>
    </Box>
  );
};

export default ChakraExpoDashboard;
