import React, { Component } from 'react'
import NavigationLeft from '../NavigationLeft'
import Button from 'react-bootstrap/Button'
// import styled from 'styled-components';
import axios from 'axios'

export default class EditStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.params.id,
            student_id: this.props.location.params.student_id,
            name: this.props.location.params.name,
            lastname: this.props.location.params.lastname,
            password: null,
            role: this.props.location.params.role == "user" ? false : true,
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
    toggleChange = () => {
        this.setState({
          role: !this.state.role,
        });
      }
    
    handleClick() {
        let id = this.state.id;
        axios.put('http://localhost:4000/api/users/'+id, {
                student_id: this.state.student_id,
                name: this.state.name,
                lastname: this.state.lastname,
                password: this.state.password,
                role: this.state.role ? "admin" : "user",
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
        const { student_id, name, lastname, password } = this.state;
        const enabled = student_id.length > 0 && name.length > 0 && lastname.length > 0;
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
                                        <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Expediente:</label>
                                        <div className="col-sm-9">
                                            <input name="student_id" type="text" className="form-control" value={this.state.student_id} onChange={ this.handleChange }/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Nombre:</label>
                                        <div className="col-sm-9">
                                            <input name="name" type="text" className="form-control" value={this.state.name} onChange={ this.handleChange }/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Apellidos:</label>
                                        <div className="col-sm-9">
                                            <input name="lastname" type="text" className="form-control" value={this.state.lastname} onChange={this.handleChange }/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-3 col-form-label" >Contraseña:</label>
                                        <div className="col-sm-9">
                                            <input name="password" type="text" className="form-control" value={this.state.password} onChange={this.handleChange }/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Administrador:</label>
                                        <div className="col-sm-9">
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <input type="checkbox" name="role" checked={this.state.role} onChange={this.toggleChange }/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-body" style={{display:"flex"}}>
                            </div>
                            <div className="card-footer">
                                <Button variant="success" size="sm" className="float-right mb-2" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick() } } disabled={!enabled}>Crear Estudiante</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

