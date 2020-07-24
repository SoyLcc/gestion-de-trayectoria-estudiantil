import React, { Component } from 'react'
import NavigationLeft from '../NavigationLeft'
import Button from 'react-bootstrap/Button'
// import styled from 'styled-components';
import axios from 'axios'
import { API_URL } from '../../../App'

export default class NewSubject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: "",
            name: "",
            type: "",
            credits: "",
            theory: "",
            lab: "",
            axis: "",
            minCredits: "",
            requirements: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    
    handleSubmit(e) {
        e.preventDefault();
        let confirmed = window.confirm('Usted confirma esta acción?')
        if (confirmed) {
            axios.post(`${API_URL}/subjects/`, this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.props.history.goBack();
        } 
    }

    render() {
        return (
            <div className="container">
                <NavigationLeft/>
                <div className="row mt-4">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                            <h5 className="card-header">Nueva Materia</h5>
                            <form className="needs-validation" onSubmit={this.handleSubmit}>
                                <div className="card-body">
                                        <div className="form-group row">
                                            <label htmlFor="key" className="col-sm-3 col-form-label">Clave:</label>
                                            <div className="col-sm-9">
                                                <input name="key" type="number" className="form-control" value={this.state.key} onChange={ this.handleChange } required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Nombre:</label>
                                            <div className="col-sm-9">
                                                <input name="name" type="text" className="form-control" value={this.state.name} onChange={ this.handleChange } required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Tipo:</label>
                                            <div className="col-sm-9">
                                                <select className="custom-select" name="type" value={this.state.type} onChange={this.handleChange } required>
                                                    <option value="">Abrir menu de selección</option>
                                                    <option value="OBL">Obligatoria</option>
                                                    <option value="OPT">Optativa</option>
                                                    <option value="SEL">De Selección</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Creditos:</label>
                                            <div className="col-sm-9">
                                                <input name="credits" type="number" className="form-control" value={this.state.credits} onChange={this.handleChange } required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Horas de Teoria:</label>
                                            <div className="col-sm-9">
                                                <input name="theory" type="number" className="form-control" value={this.state.theory} onChange={this.handleChange } required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Horas de Laboratorio:</label>
                                            <div className="col-sm-9">
                                                <input name="lab" type="number" className="form-control" value={this.state.lab} onChange={this.handleChange } required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Eje:</label>
                                            <div className="col-sm-9">
                                                <select className="custom-select" name="axis" value={this.state.axis} onChange={this.handleChange } required>
                                                    <option value="">Abrir menu de selección</option>
                                                    <option value="C">Comun</option>
                                                    <option value="B">Basico</option>
                                                    <option value="P">Profesional</option>
                                                    <option value="I">Integrador</option>
                                                    <option value="E">Especializante</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Minimo de Creditos:</label>
                                            <div className="col-sm-9">
                                                <input name="minCredits" type="number" className="form-control" value={this.state.minCredits} onChange={this.handleChange } required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Requerimientos:</label>
                                            <div className="col-sm-9">
                                                <input name="requirements" type="text" className="form-control" value={this.state.requirements} onChange={this.handleChange } required/>
                                            </div>
                                        </div>
                                </div>
                                <div className="card-body" style={{display:"flex"}}>
                                </div>
                                <div className="card-footer">
                                    <Button type="submit" variant="success" size="sm" className="float-right mb-2">Crear Estudiante</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

