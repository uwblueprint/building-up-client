import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Box, Button, Heading, Input, FormControl } from '@chakra-ui/react';

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

  return teamId ? (
    <TeamOverview teamId={teamId} />
  ) : (
    <div>
      <h1>Welcome</h1>
      {'User is not part of a team (todo: implement this view)'}
    </div>
  );
};

const InviteTeamMembers = () => {
  const [inputList, setInputList] = useState([{ email: '' }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { email: '' }]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //TODO: The below displays the inputted emails as an alert
    //      Should change to actually handle the submit function
    const list = [...inputList];
    let output = '';
    for (let i = 0; i < list.length; i++) {
      output = output.concat(list[i].email);
    }
    alert(output);
  };

  return (
    <Box w="50%">
      <form onSubmit={e => handleSubmit(e)}>
        {inputList.map((x, i) => {
          return (
            <Box key={i} d="flex" mb="8px">
              <FormControl w="80%">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={x.email}
                  onChange={e => handleInputChange(e, i)}
                />
              </FormControl>
              {inputList.length !== 1 ? (
                <Button variant="ghost" onClick={() => handleRemoveClick(i)} maxW="15%">
                  x
                </Button>
              ) : null}
            </Box>
          );
        })}
        <Button variant="link" mb="40px" fontSize="16px" onClick={handleAddClick} display="block">
          + Add Another
        </Button>
        <Button type="submit" display="block">
          Send Invites
        </Button>
      </form>
    </Box>
  );
};

const TeamMembers = () => {
  //TODO: Implement the team members table using the shared table component
  return <Box w="100%" h="500px" mb="64px" background="gray.400"></Box>;
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
      <Heading as="p" size="normal" fontWeight="normal" mb="24px">
        Enter the emails of the people you want to add
      </Heading>
      <InviteTeamMembers />
    </Box>
  );
};

export default TeamView;
