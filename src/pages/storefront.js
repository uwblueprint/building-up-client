import React, { Component } from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_TEAM_INFO = gql`
query getTeam($id: Int!) { # Currently an Int!, will need to be changed after Raveen changes Schemas to Strings
  getTeam(id: $id) {
    name
  }
}
`

const StoreFront = (props) => {
    const teamID = props.match.params.id
    console.log("This is the team id", teamID)
    const { loading, error, data } = useQuery(GET_TEAM_INFO, { variables: { id: teamID } })
    console.log("This is the data", data)

        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        console.log("This is the id ", teamID)
            return (
            <React.Fragment>
                <h1>This is the store page</h1>
                <h2>The Team Using this has ID {this.props.match.params.id}</h2>
            </React.Fragment>
        )
}

export default StoreFront

