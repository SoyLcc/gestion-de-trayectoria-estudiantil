import React, { Component } from 'react'
import axios from 'axios';
import Content from '../utils';
import styled from "styled-components";
import SubjectCard from '../student/SubjectCard'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import "./poll.css"

const ContainerStyles = {
    flexbasis: "20%",
    marginleft: "20px",
    fontsize: "11px",
    width: "130px",
    heigth: "60px",
    hoverborder: "3px solid",
    padding: "10px",
    margin: "0px"
}
const SubjectsList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;    
    flex-flow: row-wrap;
`;

export default class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            userId: "",
            poll: {} ,
            subjects: [],
            selectedStates:[],
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        let votedSubjects = [];
        this.state.subjects.forEach((subject,i) => {
            if(this.state.selectedStates[i] === true){
                votedSubjects.push(subject)
            }
        });
        axios.post('http://localhost:4000/api/votes/', {
                user: this.state.userId,
                poll: this.state.poll._id,
                subjects: votedSubjects
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.history.goBack();
    }

    handleClick(subject, index) {
        let selectedStates = this.state.selectedStates
        selectedStates[index] = !selectedStates[index]
        this.setState({ selectedStates })
    }

    async loadData() {
        const { id } = this.props.match.params
        const userId = localStorage.getItem("userID")
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/polls/'+id,
            });

            if (response.status === 200) {
               
                this.setState({
                    userId: userId,
                    poll: response.data,
                    subjects: response.data.subjects,
                    selectedStates: new Array(response.data.subjects.length).fill(false)
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
                                            let isSelected = this.state.selectedStates[i];
                                            const backgroundColor = isSelected ? {backgroundColor:"red"}:{};
                                            return (
                                                <div className="one-card" key={i} onClick={() => this.handleClick(subject, i)} style={backgroundColor}>
                                                    <SubjectCard subject={subject} styles={ContainerStyles}/>
                                                </div>
                                            )
                                        },this)
                                    }
                                </SubjectsList>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary float-right mr-2" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleSubmit() } }>Terminar mi votación</button>
                            <Link className="btn btn-primary float-right mr-2" to="/poll">Atras</Link>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}
