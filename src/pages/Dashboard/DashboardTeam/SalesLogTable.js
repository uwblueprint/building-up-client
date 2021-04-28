import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Skeleton, Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';

const SalesLogTable = ({ loading, data }) => {
  const sales = useMemo(
    () =>
      data?.getLatestOrders?.map(order => ({
        order: order.orderNumber,
        qty: order.numberOfItems,
        price: `$${order.price.toFixed(2)}`,
        donation: `$${order.donationAmount.toFixed(2)}`,
        date: new Date(parseInt(order.createdAt, 10)).toDateString().substring(4),
      })) ?? [],
    [data],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Order Number',
        accessor: 'order',
      },
      {
        Header: 'Qty',
        accessor: 'qty',
      },
      {
        Header: 'Amount Raised',
        accessor: 'price',
      },
      {
        Header: 'Additional Donation',
        accessor: 'donation',
      },
      {
        Header: 'Date',
        accessor: 'date',
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: sales },
    useSortBy,
  );

  return (
    <Skeleton isLoaded={!loading} mb="24px">
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

export default SalesLogTable;
