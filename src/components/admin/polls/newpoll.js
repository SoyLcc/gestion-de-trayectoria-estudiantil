import React, { Component, useState } from 'react'
import NewPollBoard from './NewPollBoard';
import NavigationLeft from '../NavigationLeft'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components';

const AdminContent = styled.div`
    width: 100%;
    padding: 20px;  
    background-color: #e4f6f3;
    margin-left: 130px;
`;

export default class newPoll extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <NavigationLeft/>
                        <div className="row mt-4">
                            <div className="col-2"></div>
                            <div className="col">
                                <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                                    <h5 className="card-header">Nueva Encuesta </h5>
                                    <div className="card-body pb-0">
                                        <form>
                                            <div className="form-group row">
                                                <label for="staticEmail" className="col-sm-2 col-form-label">Titulo de la Encuesta:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-body" style={{display:"flex"}}>
                                            <NewPollBoard/>
                                    </div>
                                    <div className="card-footer">
                                        <Button variant="success" size="sm" className="float-right mb-2">Crear Encuesta</Button>
                                    </div>
                                </div>
                            </div>
                                    
                        </div>
                                
                </div>
            </div>
        )
    }
}

