import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import NavigationLeft from './NavigationLeft'
import Content from '../utils'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'


export default class AdminPolls extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            polls: [], 
        }
        this.handleClick = this.handleClick.bind(this);
    }

    loadData = async () => {
        const res = await axios.get('http://localhost:4000/api/polls/');
        this.setState({polls:res.data});
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    async handleClick(type,poll) {
        if(type === "delete") {
            await axios.delete('http://localhost:4000/api/polls/'+poll._id)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        if(type === "status") {
            await axios.put('http://localhost:4000/api/polls/'+poll._id, {isActive: !poll.isActive})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        this.loadData();
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <NavigationLeft/>
                    <Content>
                        <div className="container">
                            <div className="row">
                            <div className="col-md-2"></div>
                                <div className="col-md-9">
                                    <div class="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                                        <h5 class="card-header">Encuestas</h5>
                                        <div class="card-body">
                                            <Link to="/admin/newpoll">
                                                <Button variant="success" size="sm" className="float-right mb-2">Crear Encuesta</Button>
                                            </Link>
                                            {this.state.polls.length !== 0  && 
                                                <Table striped bordered hover variant="dark" size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Titulo</th>
                                                            <th>Descripción</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {   
                                                            this.state.polls.map((poll, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{i}</td>
                                                                        <td>{poll.title}</td>
                                                                        <td>{poll.description}</td>
                                                                        <td>
                                                                            <Button variant="primary" size="sm" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick('status',poll) } }>
                                                                                {poll.isActive ? "Cerrar" : "Abrir"}
                                                                            </Button>{' '}
                                                                            {' '}
                                                                            <Button variant="primary" size="sm">Resultados</Button>{' '}
                                                                            <Button variant="warning" size="sm">Editar</Button>{' '}
                                                                            <Button variant="danger" size="sm" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick('delete',poll) } }>Eliminar</Button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>    
                                                </Table>
                                            }
                                            {this.state.polls.length === 0 && 
                                                <div class="alert alert-danger mt-5" role="alert">
                                                    Aun no hay Encuestas!
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </div>
            </div>
        )
    }
}
