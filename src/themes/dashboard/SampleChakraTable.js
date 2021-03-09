import React from 'react';

import { Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';

const sampleProps = {
  headers: ['Name', 'Email', ''],
  data: [
    { name: '1st Name', email: 'example1@email.com', action: 'Remove' },
    { name: '2nd Name', email: 'example2@email.com', action: 'Remove' },
    { name: '3rd Name', email: 'example3@email.com', action: 'Remove' },
    { name: '4th Name', email: 'example4@email.com', action: 'Remove' },
    { name: '5th Name', email: 'example5@email.com', action: 'Remove' },
    { name: '6th Name', email: 'example6@email.com', action: 'Remove' },
  ],
};

const composeTableHeader = (header, i) => {
  return <Th key={i}>{header}</Th>;
};

const composeTableBody = (row, i) => {
  const { name, email, action } = row;
  return (
    <Tr key={i}>
      <Td>
        <Heading size="h4">{name}</Heading>
      </Td>
      <Td>{email}</Td>
      <Td fontWeight="semibold" color="#C70E0E">
        {action}
      </Td>
    </Tr>
  );
};

const SampleChakraTable = () => {
  const { headers, data } = sampleProps;
  return (
    <Table>
      <Thead>
        <Tr>{headers.map(composeTableHeader)}</Tr>
      </Thead>
      <Tbody>{data.map(composeTableBody)}</Tbody>
    </Table>
  );
};

export default SampleChakraTable;
