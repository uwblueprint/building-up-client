import React, { useState } from 'react';

import InitialPage from 'components/dashboard/DashboardNoTeam/InitialPage/InitalPage';
import CreateTeamForm from 'components/dashboard/DashboardNoTeam/CreateTeamForm/CreateTeamForm';
import ConfirmTeamCreation from 'components/dashboard/DashboardNoTeam/ConfirmTeamCreation/ConfirmTeamCreation';

const DashboardNoTeam = props => {
  const [currentPage, setPage] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [teamAffiliation, setTeamAffiliation] = useState('');
  const [inputList, setInputList] = useState(['']);

  const incrementPage = e => {
    e.preventDefault();
    if (currentPage < 2) {
      setPage(currentPage + 1);
    }
  };

  const decrementPage = e => {
    e.preventDefault();
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };

  const pages = [
    <InitialPage incrementPage={incrementPage} />,
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

export default DashboardNoTeam;
