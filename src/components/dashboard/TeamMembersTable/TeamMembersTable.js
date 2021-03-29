import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Skeleton, Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';

const TeamMembersTable = ({ members, loadingMembers, handleRemove, loadingRemove }) => {
  const {
    user: { userId },
  } = useSelector(state => state.auth);

  const data = useMemo(
    () =>
      members?.getUsersForTeam?.map(user => ({
        id: user.id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
      })) ?? [],
    [members],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: props => <Heading size="h4">{props.value}</Heading>,
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        accessor: 'id',
        disableSortBy: true,
        Cell: props =>
          props.value !== userId ? (
            <Button
              variant="link"
              disabled={loadingRemove}
              color="#C70E0E"
              onClick={() => {
                handleRemove(props.value);
              }}
            >
              Remove
            </Button>
          ) : null,
      },
    ],
    [handleRemove, loadingRemove, userId],
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
    <Skeleton isLoaded={!loadingMembers} mb="24px">
      <Box minH="300px" overflow="auto" bg="background.primary">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    _hover={column.canSort ? { bg: '#eaeaea' } : {}}
                    position="sticky"
                    top="0"
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
      </Box>
    </Skeleton>
  );
};

export default TeamMembersTable;
