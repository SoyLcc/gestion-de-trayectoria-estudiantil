import React, { Component } from 'react'
import axios from 'axios';
// import styled from 'styled-components';
import Content from '../utils';
import { Link } from 'react-router-dom'

export default class PollsHome extends Component {
    constructor(props) {
        super(props)
        this.state = { polls: [] }
    }
    
    async loadData() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/polls',
            });

            if (response.status === 200) {
                // console.log(response.data);
                this.setState({
                    polls: response.data
                })
            }
        } catch (error) {
            
        }
    }
    
    componentDidMount() {
        this.loadData()
    }

    PollCard(poll) {
        return (
            <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                <h5 className="card-header">{poll.title}</h5>
                <div className="card-body">
                    <p className="card-text">{poll.description}</p>
                    <Link className="btn btn-secondary" to={`/polls/${poll._id}`}>Abrir Encuesta</Link>{' '}
                    <Link className="btn btn-secondary" to={`/polls/${poll._id}/results`}>Resultados</Link>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Content>
                <div className="container">
                    {
                        this.state.polls.map((poll, i) => {
                            return (
                                <div className="row pt-5"  key={i}>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8">
                                        { this.PollCard(poll) }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Content>
        )
    }
}
