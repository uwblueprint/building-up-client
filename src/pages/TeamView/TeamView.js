import React, { useMemo, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useTable, useSortBy } from 'react-table';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Input,
  FormControl,
  Flex,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
} from '@chakra-ui/react';

const GET_TEAM_INFO = gql`
  query getTeam($id: String!) {
    getTeam(id: $id) {
      name
      organization
      id
      amountRaised
      itemsSold
    }
  }
`;

const TeamView = () => {
  const {
    user: { teamId },
  } = useSelector(state => state.auth);

  return teamId ? <TeamOverview teamId={teamId} /> : <Redirect to="/" />;
};

const InviteTeamMembers = () => {
  const [inputList, setInputList] = useState(['']);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, '']);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //TODO: The below displays the inputted emails as an alert
    //      Should change to actually handle the submit function
    const list = [...inputList];
    let output = '';
    for (let i = 0; i < list.length; i++) {
      output = output.concat(list[i]);
    }
    alert(output);
  };

  return (
    <Box w="50%">
      <form onSubmit={e => handleSubmit(e)}>
        <VStack align="flex-start">
          {inputList.map((x, i) => {
            return (
              <Flex key={i} mb="8px" w="100%">
                <FormControl w="80%">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={x}
                    onChange={e => handleInputChange(e, i)}
                  />
                </FormControl>
                {inputList.length !== 1 ? (
                  <Button variant="ghost" onClick={() => handleRemoveClick(i)} maxW="15%">
                    x
                  </Button>
                ) : null}
              </Flex>
            );
          })}
          <Button variant="link" mb="40px" fontSize="16px" onClick={handleAddClick}>
            + Add Another
          </Button>
          <Button size="lg" type="submit">
            Send Invites
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const TeamMembers = () => {
  //Fetch users for the table, currently empty data
  const data = useMemo(() => [], []);

  // i.e.
  /* 
  data might have this structure (fetched from our backend with useQuery)
  const data = useMemo(
    () => [
      {
        name: '1st Name',
        email: 'example1@email.com',
        userId: 'xxxx',
      },
    ],
    [],
  );
  */

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
        id: 'action',
        // accessor: 'action',
        disableSortBy: true,
        Cell: () => (
          <Text fontWeight="semibold" color="#C70E0E">
            Remove
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
    <Box h="500px" mb={16} bg="background.primary">
      {/* This outer box is temporary ^^ */}
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
    </Box>
  );
};

const TeamOverview = ({ teamId }) => {
  const { loading, error, data } = useQuery(GET_TEAM_INFO, {
    variables: { id: teamId },
  });

  return loading ? (
    'Loading...'
  ) : error ? (
    `Error! ${error.message}`
  ) : (
    <Box w="100%">
      <Heading textTransform="uppercase" as="p" size="subtitle" color="gray.500" mb="8px">
        Team {data.getTeam.name}
      </Heading>
      <Heading as="h1" size="h1" mb="24px">
        Team Members
      </Heading>
      <TeamMembers />
      <Heading as="h3" size="h3" mb="8px">
        Invite Team Members
      </Heading>
      <Text size="normal" mb="24px">
        Enter the emails of the people you want to add
      </Text>
      <InviteTeamMembers />
    </Box>
  );
};

export default TeamView;
