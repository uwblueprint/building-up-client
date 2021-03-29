import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

import { Box, Button, Heading, Input, FormControl, Flex, VStack, Text } from '@chakra-ui/react';

import { GET_USERS_FOR_TEAM, SEND_INVITE_EMAILS } from 'data/gql/team';
import { LEAVE_TEAM } from 'data/gql/user';

import PageHeading from 'components/dashboard/PageHeading/PageHeading';
import TeamMembersTable from 'components/dashboard/TeamMembersTable/TeamMembersTable';

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
          <Button variant="link" mb="24px" fontSize="16px" onClick={handleAddClick}>
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

const TeamOverview = ({ team }) => {
  const { loading: loadingMembers, error: errorMembers, data: members, updateQuery } = useQuery(GET_USERS_FOR_TEAM, {
    variables: { teamId: team.teamId },
  });

  const [leaveTeam, { loading: loadingRemove, data: leaveTeamData }] = useMutation(LEAVE_TEAM);

  const handleRemove = id => {
    leaveTeam({ variables: { id } });
  };

  useEffect(() => {
    if (leaveTeamData) {
      updateQuery(previous => {
        const ret = {};
        ret.getUsersForTeam = previous.getUsersForTeam.filter(user => {
          return user.id !== leaveTeamData.leaveTeam.id;
        });
        return ret;
      });
    }
  });

  return (
    <>
      <PageHeading teamName={team.teamName} title="Team Members" />
      <Box w="100%">
        {errorMembers ? (
          `Error! ${errorMembers.message}`
        ) : (
          <TeamMembersTable
            members={members}
            loadingMembers={loadingMembers}
            handleRemove={handleRemove}
            loadingRemove={loadingRemove}
          />
        )}
      </Box>
      <Box w="100%">
        <Heading as="h3" size="h3" mb="8px">
          Invite Team Members
        </Heading>
        <Text size="normal" mb="24px">
          Enter the emails of the people you want to add
        </Text>
        <InviteTeamMembers />
      </Box>
    </>
  );
};

export default TeamOverview;
