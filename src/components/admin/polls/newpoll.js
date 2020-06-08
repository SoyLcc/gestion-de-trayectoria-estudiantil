import React, { Component, setState, state } from 'react'

import NewPollBoard from './NewPollBoard';
import NavigationLeft from '../NavigationLeft'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components';
import axios from 'axios'

const AdminContent = styled.div`
    width: 100%;
    padding: 20px;  
    background-color: #e4f6f3;
    margin-left: 130px;
`;

export default class newPoll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            subjects: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    callbackFunction = (childData) => {
        this.setState({subjects: childData});
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }
    
    handleClick() {
        axios.post('http://localhost:4000/api/polls/', {
                title: this.state.title,
                description: this.state.description,
                isActive: true,
                subjects: this.state.subjects
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.history.goBack();
    }

    render() {
        const { title, description, subjects } = this.state;
        const enabled = title.length > 0 && description.length > 0 && subjects.length > 0;
        return (
            <div className="container-fluid">
                <div className="row">
                    <NavigationLeft/>
                        <div className="row mt-4">
                            <div className="col-2"></div>
                            <div className="col">
                                <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                                    <h5 className="card-header">Nueva Encuesta</h5>
                                    <div className="card-body pb-0">
                                        <form>
                                            <div className="form-group row">
                                                <label htmlfor="staticEmail" className="col-sm-2 col-form-label">Titulo:</label>
                                                <div className="col-sm-10">
                                                    <input name="title" type="text" className="form-control" value={this.state.title} onChange={ this.handleChange}/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlfor="staticEmail" className="col-sm-2 col-form-label" >Descripción:</label>
                                                <div className="col-sm-10">
                                                    <input name="description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body" style={{display:"flex"}}>
                                            <NewPollBoard parentCallback = {this.callbackFunction}/>
                                    </div>
                                    <div className="card-footer">
                                        <Button variant="success" size="sm" className="float-right mb-2" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick() } } disabled={!enabled}>Crear Encuesta</Button>
                                    </div>
                                </div>
                            </div>
                                    
                        </div>
                                
                </div>
            </div>
        )
    }
}

