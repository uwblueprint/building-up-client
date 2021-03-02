import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Box, Text, Button, Center, Input, FormControl } from '@chakra-ui/react';

const NoTeamRegistration = props => {
  const [currentPage, setPage] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [teamAffiliation, setTeamAffiliation] = useState('');
  const [inputList, setInputList] = useState([{ email: '' }]);

  const incrementPage = async e => {
    e.preventDefault();
    if (currentPage < 2) {
      setPage(currentPage + 1);
    }
  };

  const decrementPage = async e => {
    e.preventDefault();
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };

  let pages = [
    <InitialNoTeamPage incrementPage={incrementPage} />,
    <CreateTeamForm
      incrementPage={incrementPage}
      decrementPage={decrementPage}
      teamName={teamName}
      teamAffiliation={teamAffiliation}
      setTeamName={setTeamName}
      setTeamAffiliation={setTeamAffiliation}
      inputList={inputList}
      setInputList={setInputList}
    />,
    <ConfirmTeamCreation
      decrementPage={decrementPage}
      teamName={teamName}
      teamAffiliation={teamAffiliation}
      userId={props.userId}
      inputList={inputList}
    />,
  ];

  return pages[currentPage];
};

const InitialNoTeamPage = props => {
  return (
    <Box fontFamily="Jost" w="full" h="full">
      <Text fontSize="4xl" fontWeight="bold" marginLeft="5%" marginBottom={8}>
        Welcome
      </Text>
      <Center w="full" flexDirection="column" justifyContent="center">
        <Center bg="#FAFAFA" flexDirection="column" justifyContent="center" w="90%" h="227px" borderRadius="4px">
          <Text fontSize="xl" marginBottom={6} fontWeight="semibold">
            It looks like you don't have a team yet!
          </Text>
          <Button
            bg="#F5D5D5"
            fontSize="md"
            onClick={props.incrementPage}
            fontWeight="semibold"
            _focus={{ boxShadow: '#FAFAFA' }}
            _active={{ boxShadow: '#FAFAFA' }}
          >
            Create a Team
          </Button>
        </Center>
        <Text opacity="0.5" marginBottom={8} marginTop={8}>
          OR
        </Text>
        <Center bg="#FAFAFA" flexDirection="column" justifyContent="center" w="90%" h="227px" borderRadius="4px">
          <Text fontSize="xl" fontWeight="semibold" marginBottom={4}>
            Have you been invited to a team?
          </Text>
          <Text fontSize="md">Check your email for an invite link</Text>
        </Center>
      </Center>
    </Box>
  );
};

const CreateTeamForm = props => {
  const OnChangeTeamName = async e => {
    props.setTeamName(e.target.value);
  };

  const OnChangeTeamAffiliation = async e => {
    props.setTeamAffiliation(e.target.value);
  };

  return (
    <Box fontFamily="Jost" w="full" h="100%">
      <Button
        fontSize="md"
        bg="white"
        fontWeight="bold"
        marginLeft="5%"
        marginBottom={2}
        onClick={props.decrementPage}
        _focus={{ boxShadow: '#FFFFFF' }}
        _active={{ bg: '#FFFFFF', boxShadow: '#FFFFFF' }}
        _hover={{ bg: '#FFFFFF' }}
      >
        <Text color="black"> &lt; Back </Text>
      </Button>
      <Text fontSize="4xl" fontWeight="bold" marginLeft="5%">
        Create A Team
      </Text>
      <Box w="full" h="84%" marginLeft="5%">
        <form onSubmit={props.incrementPage} style={{ height: '100%' }}>
          <Box h="full" justifyContent="center" display="flex" flexDirection="row">
            <Box
              bg="#FAFAFA"
              fontWeight="600"
              flexDirection="column"
              alignItems="flex-start"
              marginRight={4}
              w="90%"
              h="full"
              borderRadius="4px"
            >
              <Box marginRight={10} marginLeft={10}>
                <Text fontSize="2xl" marginTop={8} marginBottom={6}>
                  Team Details
                </Text>
                <FormControl id="teamCreation" isRequired>
                  <Input
                    bg="white"
                    variant="outline"
                    marginBottom={6}
                    placeholder="Team Name"
                    value={props.teamName}
                    onChange={OnChangeTeamName}
                    isRequired
                  />
                </FormControl>
                <Input
                  bg="white"
                  variant="outline"
                  placeholder="Team Affiliation (Optional)"
                  value={props.teamAffiliation}
                  onChange={OnChangeTeamAffiliation}
                />
              </Box>
            </Box>
            <Box
              bg="#FAFAFA"
              fontWeight="600"
              flexDirection="column"
              alignItems="flex-start"
              marginRight={20}
              w="90%"
              h="full"
              borderRadius="4px"
            >
              <Box marginRight={10} marginLeft={10} h="full">
                <Text fontSize="2xl" marginTop={8} marginBottom={1}>
                  Invite Team Members (optional)
                </Text>
                <Text fontSize="xl" fontWeight="normal" marginTop={1} marginBottom={6}>
                  Enter the emails of the people you want to add
                </Text>
                <InviteTeamMembers inputList={props.inputList} setInputList={props.setInputList} />
              </Box>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="flex-end" marginRight={20} marginTop={4}>
            <Button _focus={{ boxShadow: '#FAFAFA' }} _active={{ boxShadow: '#FAFAFA' }} type="submit">
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

const ConfirmTeamCreation = props => {
  const CREATE_TEAM = gql`
    mutation createTeam($name: String!, $organization: String!) {
      createTeam(name: $name, organization: $organization, amountRaised: 0, itemsSold: 0) {
        id
      }
    }
  `;

  const ADD_USER_TO_TEAM = gql`
    mutation updateUser($id: ID!, $teamId: String) {
      updateUser(id: $id, teamId: $teamId) {
        id
      }
    }
  `;

  const [createTeam] = useMutation(CREATE_TEAM);
  const [addUser] = useMutation(ADD_USER_TO_TEAM);

  const executeQuery = () => {
    createTeam({
      variables: { name: props.teamName, organization: props.teamAffiliation },
    })
      .then(data => {
        let teamId = data.data.createTeam.id;
        addUser({
          variables: { id: props.userId, teamId: teamId },
        }).then(window.location.reload());
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Box fontFamily="Jost" w="full" h="100%">
      <Button
        fontSize="md"
        bg="white"
        fontWeight="bold"
        marginLeft="5%"
        marginBottom={2}
        onClick={props.decrementPage}
        _focus={{ boxShadow: '#FFFFFF' }}
        _active={{ bg: '#FFFFFF', boxShadow: '#FFFFFF' }}
        _hover={{ bg: '#FFFFFF' }}
      >
        <Text color="black"> &lt; Back </Text>
      </Button>
      <Text fontSize="4xl" fontWeight="bold" marginLeft="5%">
        Create a Team
      </Text>
      <Box w="full" h="84%" marginLeft="5%">
        <Box h="full" justifyContent="center" display="flex" flexDirection="row">
          <Box
            bg="#FAFAFA"
            fontWeight="600"
            flexDirection="column"
            alignItems="flex-start"
            marginRight={4}
            w="90%"
            h="100%"
            borderRadius="4px"
          >
            <Box marginRight={10} marginLeft={10} h="100%">
              <Text fontSize="2xl" marginTop={8} marginBottom={8}>
                Team Details
              </Text>
              <Text fontSize="xl" fontWeight="semibold" marginBottom={1} letterSpacing="wider" opacity="0.5">
                TEAM NAME
              </Text>
              <Text fontSize="3xl" marginBottom={8}>
                {props.teamName}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" marginBottom={1} letterSpacing="wider" opacity="0.5">
                TEAM AFFILIATIONS
              </Text>
              <Text fontSize="3xl" marginBottom={8}>
                {props.teamAffiliation === '' ? 'N/A' : props.teamAffiliation}
              </Text>
            </Box>
          </Box>
          <Box
            bg="#FAFAFA"
            fontWeight="600"
            flexDirection="column"
            alignItems="flex-start"
            marginRight={20}
            w="90%"
            h="100%"
            borderRadius="4px"
          >
            <Box marginRight={10} marginLeft={10} h="100%">
              <Text fontSize="2xl" fontWeight="semibold" marginTop={8} marginBottom={8}>
                Invite Team Members (optional)
              </Text>
              {props.inputList.map((x, i) => {
                return (
                  <Text key={x.email} fontSize="xl" fontWeight="normal" marginBottom={6}>
                    {x.email}
                  </Text>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-end" marginRight={20} marginTop={4}>
          <Button _focus={{ boxShadow: '#FAFAFA' }} _active={{ boxShadow: '#FAFAFA' }} onClick={executeQuery}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const InviteTeamMembers = props => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...props.inputList];
    list[index][name] = value;
    props.setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...props.inputList];
    list.splice(index, 1);
    props.setInputList(list);
  };

  const handleAddClick = () => {
    props.setInputList([...props.inputList, { email: '' }]);
  };

  return (
    <Box w="100%">
      {props.inputList.map((x, i) => {
        return (
          <Box d="flex" mb="8px" key="{x}">
            <FormControl w="100%">
              <Input
                bg="white"
                type="email"
                name="email"
                placeholder="Email"
                value={x.email}
                onChange={e => handleInputChange(e, i)}
              />
            </FormControl>
            {props.inputList.length !== 1 ? (
              <Button variant="ghost" onClick={() => handleRemoveClick(i)} maxW="15%">
                {' '}
                x{' '}
              </Button>
            ) : null}
          </Box>
        );
      })}
      <Button variant="link" mb="40px" fontSize="16px" onClick={handleAddClick} display="block">
        + Add Another
      </Button>
    </Box>
  );
};

export default NoTeamRegistration;
