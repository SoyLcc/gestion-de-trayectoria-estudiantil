import React, { Component } from 'react'
import NavigationLeft from '../NavigationLeft'
import Button from 'react-bootstrap/Button'
// import styled from 'styled-components';
import axios from 'axios'

export default class NewStudent extends Component {
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
            <div className="container">
                <NavigationLeft/>
                <div className="row mt-4">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                            <h5 className="card-header">Nuevo Estudiante</h5>
                            <div className="card-body">
                                <form>
                                    <div className="form-group row">
                                        <label htmlfor="staticEmail" className="col-sm-3 col-form-label">Expediente:</label>
                                        <div className="col-sm-9">
                                            <input name="title" type="text" className="form-control" value={this.state.title} onChange={ this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlfor="staticEmail" className="col-sm-3 col-form-label">Nombre:</label>
                                        <div className="col-sm-9">
                                            <input name="title" type="text" className="form-control" value={this.state.title} onChange={ this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlfor="staticEmail" className="col-sm-3 col-form-label">Apellidos:</label>
                                        <div className="col-sm-9">
                                            <input name="description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlfor="staticEmail" className="col-sm-3 col-form-label" >Contraseña:</label>
                                        <div className="col-sm-9">
                                            <input name="description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label htmlfor="staticEmail" className="col-sm-3 col-form-label">Administrador:</label>
                                        <div className="col-sm-9">
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <input type="checkbox" aria-label="Checkbox for following text input"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-body" style={{display:"flex"}}>
                            </div>
                            <div className="card-footer">
                                <Button variant="success" size="sm" className="float-right mb-2" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick() } } disabled={!enabled}>Crear Encuesta</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

