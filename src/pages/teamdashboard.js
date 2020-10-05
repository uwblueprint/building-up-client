import React, { Component } from 'react'

class TeamDashboard extends Component {
    constructor(props) {
        super()
        console.log("These are the props", props)
    }

    render () {
        return (
            <h1>This is the team home page</h1>
        )
    }
}

export default TeamDashboard