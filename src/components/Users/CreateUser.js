import React, { Component } from 'react'
import Axios from 'axios'

export default class CreateUser extends Component {
    state = {
        users: []
    }
    async componentDidMount(){
        const res = await Axios.get('')
        this.setState({users:res.data});
        console.log(this.state.users);
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
