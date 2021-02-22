import React from 'react';

import { Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';

const composeTableHeader = header => {
  return <Th>{header}</Th>;
};

const composeTableBody = row => {
  const { name, email, action } = row;
  return (
    <Tr>
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

const DataTable = props => {
  const { headers, data } = props;
  return (
    <Table>
      <Thead>
        <Tr>{headers.map(composeTableHeader)}</Tr>
      </Thead>
      <Tbody>{data.map(composeTableBody)}</Tbody>
    </Table>
  );
};

export default DataTable;
