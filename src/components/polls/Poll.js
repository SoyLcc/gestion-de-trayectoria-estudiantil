import React, { Component } from 'react'
import axios from 'axios';
import Content from '../utils';
import styled from "styled-components";
import SubjectCard from '../student/SubjectCard'
import Button from 'react-bootstrap/Button'

import "./poll.css"

const ContainerCardstyles = {
    flexbasis: "20%",
    marginleft: "20px",
    fontsize: "14px",
    width: "130px",
    heigth: "60px",
    hoverborder: "3px solid"
}
const SubjectsList = styled.div`
    margin: 0 20px 0 20px;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    align-items: center;  
    flex-basis: 33%;       
    
`;

export default class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            poll: {} ,
            subjects: []
        }
    }
    
    async loadData() {
        const { id } = this.props.match.params
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/polls/'+id,
            });

            if (response.status === 200) {
                this.setState({
                    poll: response.data,
                    subjects: response.data.subjects
                })
            }
        } catch (error) {
            
        }
    }
    
    componentDidMount() {
        this.loadData()
    }
    

    render() {
        const { poll, subjects } = this.state;
        const enabled = false;
        return (
            <Content>
                <div className="container">
                    <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                        <h5 className="card-header">{poll.title}</h5>
                        <div className="card-body">
                            <p className="card-text">{poll.description}</p>
                            <div className="card" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                                <SubjectsList>
                                    { poll !== {} &&
                                        subjects.map((subject, i) => {
                                            return (
                                                <SubjectCard key={i} subject={subject} styles={ContainerCardstyles} />
                                            )
                                        })
                                    }
                                </SubjectsList>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-primary float-right mr-2">Terminar mi votación</button>
                            <button type="button" className="btn btn-primary float-right mx-2">Proponer materia</button>
                            <button type="button" className="btn btn-primary float-right">Atras</button>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}
