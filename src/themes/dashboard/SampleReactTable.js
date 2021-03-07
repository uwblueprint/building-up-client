import React, { useMemo } from 'react';
import { Heading, Text, Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';

const SampleReactTable = () => {
  const data = useMemo(
    () => [
      {
        name: '1st Name',
        email: 'example1@email.com',
        action: 'Remove',
      },
      {
        name: '2nd Name',
        email: 'example2@email.com',
        action: 'Remove',
      },
      {
        name: '3rd Name',
        email: 'example3@email.com',
        action: 'Remove',
      },
      {
        name: '4th Name',
        email: 'example4@email.com',
        action: 'Remove',
      },
      {
        name: '5th Name',
        email: 'example5@email.com',
        action: 'Remove',
      },
      {
        name: '6th Name',
        email: 'example6@email.com',
        action: 'Remove',
      },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: 'name',
        Cell: props => <Heading size="h4">{props.value}</Heading>,
      },
      {
        Header: 'EMAIL',
        accessor: 'email',
      },
      {
        id: 'action',
        accessor: 'action',
        disableSortBy: true,
        Cell: props => (
          <Text fontWeight="semibold" color="#C70E0E">
            {props.value}
          </Text>
        ),
      },
    ],
    [],
  );

  const renderSortIcon = column => {
    const { isSorted, isSortedDesc } = column;
    return isSorted ? (
      isSortedDesc ? (
        <TriangleDownIcon aria-label="sorted descending" />
      ) : (
        <TriangleUpIcon aria-label="sorted ascending" />
      )
    ) : null;
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                _hover={column.canSort ? { bg: '#eaeaea' } : {}}
              >
                {column.render('Header')}
                <chakra.span pl="4">{renderSortIcon(column)}</chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default SampleReactTable;
