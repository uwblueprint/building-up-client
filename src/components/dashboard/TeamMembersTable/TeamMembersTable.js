import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const LeaveTeamModal = ({ isOpen, onClose, onLeave, teamName, userName, userIdToRemove, userId, isLoading }) => {
  const cancelRef = React.useRef();
  const isUser = userId === userIdToRemove;
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
    >
      <AlertDialogOverlay />
      <AlertDialogContent px={4} py={8}>
        <AlertDialogHeader>
          {`${
            isUser ? `Are you sure you want to leave Team ${teamName}` : `Are you sure you want to remove ${userName}`
          }`}
        </AlertDialogHeader>
        <AlertDialogBody>
          {`${
            isUser ? 'You' : userName
          } will no longer be able to see information associated with this team’s fundraising.`}
        </AlertDialogBody>
        <AlertDialogFooter align="flex-start" justifyContent="flex-start">
          <Button
            ref={cancelRef}
            isLoading={isLoading}
            onClick={onClose}
            variant="outline"
            color="black"
            borderColor="black"
            size="lg"
          >
            Go Back
          </Button>
          <Button onClick={onLeave} ml={3} variant="black" isLoading={isLoading} size="lg">
            {`${isUser ? 'Leave Team' : 'Confirm'}`}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const TeamMembersTable = ({ members, teamName, loadingMembers, handleRemove, loadingRemove, removeData }) => {
  const {
    user: { userId },
  } = useSelector(state => state.auth);

  const { isOpen: isLeaveDialogueOpen, onOpen: onLeaveDialogueOpen, onClose: onLeaveDialogueClose } = useDisclosure();
  const [userIdToRemove, setUserIdToRemove] = useState('');
  const [userNameToRemove, setUserNameToRemove] = useState('');

  // Open modal after setting state
  useEffect(() => {
    if (userIdToRemove && userNameToRemove) {
      onLeaveDialogueOpen();
    } else {
      onLeaveDialogueClose();
    }
  }, [userIdToRemove, userNameToRemove, onLeaveDialogueOpen, onLeaveDialogueClose]);

  // Clear state on closing modal
  useEffect(() => {
    if (!isLeaveDialogueOpen) {
      setUserIdToRemove('');
      setUserNameToRemove('');
    }
  }, [isLeaveDialogueOpen]);

  useEffect(() => {
    if (removeData) {
      onLeaveDialogueClose();
    }
  }, [removeData, onLeaveDialogueClose]);

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
        Cell: props => {
          return (
            <Button
              variant="link"
              disabled={loadingRemove}
              color="#C70E0E"
              onClick={() => {
                setUserIdToRemove(props.value);
                setUserNameToRemove(props.row.values.name);
              }}
            >
              {`${props.value === userId ? 'Leave Team' : 'Remove'}`}
            </Button>
          );
        },
      },
    ],
    [loadingRemove, userId],
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
        <LeaveTeamModal
          isOpen={isLeaveDialogueOpen}
          isLoading={loadingRemove}
          onClose={onLeaveDialogueClose}
          onLeave={() => handleRemove(userIdToRemove)}
          teamName={teamName}
          userName={userNameToRemove}
          userId={userId}
          userIdToRemove={userIdToRemove}
        />
      </Box>
    </Skeleton>
  );
};

export default TeamMembersTable;
