/* The main heading at the top */

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const PageContainer = ({ teamName, title }) => (
  <Box alignSelf="flex-start">
    {teamName && (
      <Heading textTransform="uppercase" as="p" size="subtitle" color="gray.500" mb="8px">
        Team {teamName}
      </Heading>
    )}
    <Heading as="h1" size="h1">
      {title}
    </Heading>
  </Box>
);

export default PageContainer;
