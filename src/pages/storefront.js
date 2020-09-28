import React, { Component } from 'react'

class StoreFront extends Component {
    constructor(props) {
        super()
        console.log("These are the props", props)
    }

    render () {
        return (
            <h1>This is the store page</h1>
        )
    }
}

export default StoreFront

