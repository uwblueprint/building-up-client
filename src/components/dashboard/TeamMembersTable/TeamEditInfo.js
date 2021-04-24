import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { teamInfo } from 'data/actions/auth';
import { UPDATE_TEAM_INFO } from '../../../data/gql/team';
import Toast from 'components/dashboard/Toast/Toast';

import { Box, Text, VStack, Input, Heading, useToast, Button } from '@chakra-ui/react';

const EditTeamInfo = ({ setOnEditPage, teamId, teamName, teamAffiliation }) => {
  const client = useApolloClient();
  const [newTeamName, setNewTeamName] = useState(teamName);
  const [newTeamAffiliation, setNewTeamAffiliation] = useState(teamAffiliation);
  const [editTeam, { loading: loadingTeamChange, error: teamChangeError }] = useMutation(UPDATE_TEAM_INFO);
  useEffect(() => {});
  const dispatch = useDispatch();
  const toast = useToast();

  const onChangeTeamName = e => {
    if (e.target.value === '') {
      setNewTeamName(teamName);
    } else {
      setNewTeamName(e.target.value);
    }
  };

  const onChangeTeamAffiliation = e => {
    setNewTeamAffiliation(e.target.value);
    if (e.target.value === '') {
      setNewTeamAffiliation(teamAffiliation);
    } else {
      setNewTeamAffiliation(e.target.value);
    }
  };

  const mutationUpdateTeam = () => {
    editTeam({ variables: { id: teamId, name: newTeamName, organization: newTeamAffiliation } })
      .then(() => {
        dispatch(teamInfo(teamId, client));
        toast({
          position: 'top',
          render: props => <Toast {...props} description="You have updated your team information" isClosable />,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <Box>
        <Button
          color="black"
          onClick={() => {
            setOnEditPage(false);
          }}
          variant="link"
          mb={2}
        >
          {'< Back'}
        </Button>
        <Heading as="h1" size="h1" mb={16}>
          Edit Team Details
        </Heading>
      </Box>
      <VStack spacing="24px" w="100%" h="100%" pl={10} align="flex-start">
        <Heading alignSelf="flex-start" size="h2" as="h2" mb={1}>
          Team Details
        </Heading>
        <Heading textTransform="uppercase" as="p" size="subtitle" color="gray.500" mb="8px">
          Team Name
        </Heading>
        <Input name="teamName" placeholder={teamName} value={newTeamName} onChange={onChangeTeamName} w="40%" />

        <Heading textTransform="uppercase" as="p" size="subtitle" color="gray.500" mb="8px">
          Team Affiliation
        </Heading>
        <Input
          name="teamAffiliation"
          w="40%"
          placeholder={teamAffiliation}
          value={newTeamAffiliation}
          onChange={onChangeTeamAffiliation}
          mb={8}
        />
        {teamChangeError && <Text alignSelf="flex-start">Oops! There was an error, please try again later.</Text>}
        <Button
          isActive={loadingTeamChange}
          onClick={mutationUpdateTeam}
          role="link"
          width="131px"
          height="43px"
          type="submit"
        >
          Confirm
        </Button>
      </VStack>
    </>
  );
};

export default EditTeamInfo;
