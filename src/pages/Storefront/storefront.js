import React, { Fragment } from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_TEAM_INFO = gql`
query getTeam($id: Int!) {
  getTeam(id: $id) {
    name
    organization
    id
  }
}
`

const StoreFront = (props) => {
  const id = Number(props.match.params.id)
  const { loading, error, data } = useQuery(GET_TEAM_INFO, {
    variables: { id }
  })
  console.log("This is the team data: ", data)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <Fragment>
      <h1>This is the store page</h1>
      <h2>The Team Using this has ID {id}</h2>
      <h2>This is their data {JSON.stringify(data.getTeam)}</h2>
    </Fragment>
  )
}

export default StoreFront
