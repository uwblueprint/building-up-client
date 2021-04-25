import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { UPDATE_TEAM_NAME_ORG } from 'data/gql/team';
import { UPDATE_USER_TEAM_NAME, UPDATE_USER_TEAM_ORGANIZATION } from 'data/actions/type';
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
  const [newTeamName, setNewTeamName] = useState(teamName);
  const [newTeamOrg, setNewTeamOrg] = useState(teamOrg);
  const [editTeam, { data: dataTeamEdit, loading: loadingTeamEdit, error: errorTeamEdit }] = useMutation(
    UPDATE_TEAM_NAME_ORG,
  );

  useEffect(() => {
    if (dataTeamEdit) {
      const organization = dataTeamEdit.updateTeamNameOrg.organization;
      const name = dataTeamEdit.updateTeamNameOrg.name;
      if (organization !== teamOrg) {
        dispatch({ type: UPDATE_USER_TEAM_ORGANIZATION, payload: organization });
        toast({
          position: 'top',
          render: props => <Toast {...props} description="You have updated your team affiliation" isClosable />,
        });
      }
      if (name !== teamName) {
        dispatch({ type: UPDATE_USER_TEAM_NAME, payload: name });
        toast({
          position: 'top',
          render: props => <Toast {...props} description="You have updated your team name" isClosable />,
        });
      }
    }
  }, [dataTeamEdit, errorTeamEdit, dispatch, toast, teamName, teamOrg]);

  const onChangeTeamName = e => {
    setNewTeamName(e.target.value);
  };

  const onChangeTeamOrg = e => {
    setNewTeamOrg(e.target.value);
  };

  const mutationUpdateTeam = e => {
    e.preventDefault();
    editTeam({ variables: { id: teamId, name: newTeamName, organization: newTeamOrg } }).catch(error => {
      console.log(error);
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
      <chakra.form w="100%" onSubmit={mutationUpdateTeam}>
        <VStack spacing="24px" w="100%" h="100%" pl={10} align="flex-start">
          <Heading alignSelf="flex-start" size="h2" as="h2" mb={1}>
            Team Details
          </Heading>
          <FormControl id="teamName" isRequired>
            <Heading textTransform="uppercase" as={FormLabel} size="subtitle" color="gray.500" mb="8px">
              Team Name
            </Heading>
            <Input name="teamName" placeholder={teamName} value={newTeamName} onChange={onChangeTeamName} w="40%" />
          </FormControl>
          <FormControl id="teamOrg">
            <Heading textTransform="uppercase" as={FormLabel} size="subtitle" color="gray.500" mb="8px">
              Team Affiliation
            </Heading>
            <Input name="teamOrg" w="40%" placeholder={teamOrg} value={newTeamOrg} onChange={onChangeTeamOrg} />
          </FormControl>
          <FormControl id="errorMessage" isInvalid={errorTeamEdit}>
            <FormErrorMessage>Something went wrong, please try again later</FormErrorMessage>
          </FormControl>
          <Button type="submit" isLoading={loadingTeamEdit} size="lg">
            Confirm
          </Button>
        </VStack>
      </chakra.form>
    </>
  );
};

export default EditTeamInfo;
