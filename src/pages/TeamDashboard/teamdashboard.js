import React, { Fragment } from 'react'
import { useQuery, gql } from '@apollo/client'

// TODO: separate fields that require polling from this query. Right now, polling is applied to all fields
const GET_TEAM_INFO = gql`
query getTeam($id: Int!) {
  getTeam(id: $id) {
    name
    organization
    toquesSold
    capsSold
    id
  }
}
`

const TeamDashboard = (props) => {
  const id = Number(props.match.params.id)
  const { loading, error, data } = useQuery(GET_TEAM_INFO, {
    variables: { id },
    pollInterval: 500
  });
  console.log("This is the team data: ", data);
  if (loading) return 'Loading...'
  if (error) return `Error!2 ${error.message}`
  return (
    <Fragment>
      <h1>This is the Team Dashboard page</h1>
      <h2>The Team Using this has ID {id}</h2>
      <h2>This is their data: {JSON.stringify(data.getTeam)}</h2>
    </Fragment>
    
  )
}

export default TeamDashboard
