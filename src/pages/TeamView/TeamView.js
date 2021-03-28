import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import { GET_TEAM_INFO, GET_USERS_FOR_TEAM, SEND_INVITE_EMAILS } from 'data/gql/team';
import { LEAVE_TEAM } from 'data/gql/user';
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

  const [inviteUsersToTeam] = useMutation(SEND_INVITE_EMAILS);
  const {
    user: { teamId },
  } = useSelector(state => state.auth);

  const handleSubmit = e => {
    e.preventDefault();
    const list = [...inputList];
    inviteUsersToTeam({
      variables: { emails: list, teamId: teamId },
    })
      .then(data => {
        console.log(data);
        // Create a toast or alert to indicate emails have been sent
      })
      .catch(e => {
        console.log(e);
      });
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

const TeamMembers = ({ members, handleRemove, loadingRemove }) => {
  const {
    user: { userId },
  } = useSelector(state => state.auth);

  const data = useMemo(
    () => [
      members.map(user => ({
        id: user.id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
      })),
    ],
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
              fontWeight="semibold"
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: data[0],
    },
    useSortBy,
  );

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

  const { loading: loadingMembers, error: errorMembers, data: members, refetch } = useQuery(GET_USERS_FOR_TEAM, {
    variables: { teamId: teamId },
  });

  const [leaveTeam, { loading: loadingRemove, data: leaveTeamData }] = useMutation(LEAVE_TEAM);

  const handleRemove = id => {
    leaveTeam({ variables: { id } });
  };

  useEffect(() => {
    console.log(leaveTeamData);
    if (leaveTeamData) {
      refetch();
    }
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
      {loadingMembers ? (
        'Loading...'
      ) : errorMembers ? (
        `Error! ${errorMembers.message}`
      ) : (
        <TeamMembers members={members.getUsersForTeam} handleRemove={handleRemove} loadingRemove={loadingRemove} />
      )}
      ;
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
