import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { UPDATE_TEAM_NAME, UPDATE_TEAM_ORGANIZATION } from 'data/gql/team';
import {
  UPDATE_TEAM_NAME as UPDATE_TEAM_STATE_NAME,
  UPDATE_TEAM_ORGANIZATION as UPDATE_TEAM_STATE_ORGANIZATION,
} from 'data/actions/type';
import Toast from 'components/dashboard/Toast/Toast';

import {
  Box,
  VStack,
  Input,
  Heading,
  useToast,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  chakra,
} from '@chakra-ui/react';

const EditTeamInfo = ({ setOnEditPage, teamId, teamName, teamOrg }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamOrg, setNewTeamOrg] = useState('');
  const [editTeamName, { data: dataNameChange, loading: loadingNameChange }] = useMutation(UPDATE_TEAM_NAME);
  const [editTeamOrg, { data: dataOrgChange, loading: loadingOrgChange }] = useMutation(UPDATE_TEAM_ORGANIZATION);

  useEffect(() => {
    if (dataNameChange) {
      const name = dataNameChange?.updateTeamName?.name;
      dispatch({ type: UPDATE_TEAM_STATE_NAME, payload: name });
      toast({
        position: 'top',
        render: props => <Toast {...props} description="You have updated your team name" isClosable />,
      });
    }
  }, [dataNameChange, dispatch, toast]);

  useEffect(() => {
    if (dataOrgChange) {
      const organization = dataOrgChange?.updateTeamName?.organization;
      dispatch({ type: UPDATE_TEAM_STATE_ORGANIZATION, payload: organization });
      toast({
        position: 'top',
        render: props => <Toast {...props} description="You have updated your team affiliation" isClosable />,
      });
    }
  }, [dataOrgChange, dispatch, toast]);

  const onChangeTeamName = e => {
    setNewTeamName(e.target.value);
  };

  const onChangeTeamOrg = e => {
    setNewTeamOrg(e.target.value);
  };

  const mutationUpdateTeam = e => {
    e.preventDefault();
    try {
      if (newTeamName) {
        editTeamName({ variables: { id: teamId, name: newTeamName } });
      }
      if (newTeamOrg) {
        editTeamOrg({ variables: { id: teamId, organization: newTeamOrg } });
      }
    } catch (error) {
      console.log(error);
    }
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
      <chakra.form w="100%" onSubmit={mutationUpdateTeam}>
        <VStack spacing="24px" w="100%" h="100%" pl={10} align="flex-start">
          <Heading alignSelf="flex-start" size="h2" as="h2" mb={1}>
            Team Details
          </Heading>
          <Box>
            <FormControl id="teamName">
              <FormLabel textTransform="uppercase" as="h4" size="subtitle" color="gray.500" mb="8px">
                Team Name
              </FormLabel>
              <Input name="teamName" placeholder={teamName} value={newTeamName} onChange={onChangeTeamName} w="40%" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="teamOrg">
              <FormLabel textTransform="uppercase" as="h4" size="subtitle" color="gray.500" mb="8px">
                Team Affiliation
              </FormLabel>
              <Input
                name="teamOrg"
                w="40%"
                placeholder={teamOrg}
                value={newTeamOrg}
                onChange={onChangeTeamOrg}
                mb={8}
              />
            </FormControl>
          </Box>
          <FormErrorMessage>Something went wrong, please try again later</FormErrorMessage>
          <Button type="submit" isLoading={loadingOrgChange || loadingNameChange} size="lg">
            Confirm
          </Button>
        </VStack>
      </chakra.form>
    </>
  );
};

export default EditTeamInfo;
