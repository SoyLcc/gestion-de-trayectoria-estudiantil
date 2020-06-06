import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import NavigationLeft from './NavigationLeft'
import Content from '../utils'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'


export default class adminPolls extends Component {
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
    updateData = async () => {
        const res = await axios.update('http://localhost:4000/api/polls/', {});
        this.loadData();
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    async handleClick(id) {
        await axios.delete('http://localhost:4000/api/polls/'+id)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.loadData();
    }
    render() {
        function OpenCloseButton(props) {
            const isActive = props.isActive;
            if (isActive) {
              return <Button variant="primary" size="sm">Cerrar</Button>;
            }
            return <Button variant="primary" size="sm">Abrir</Button>;
        }
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
                                        <h5 class="card-header">CRUD Encuestas </h5>
                                        <div class="card-body">
                                            <Link to="/admin/newpoll">
                                                <Button variant="success" size="sm" className="float-right mb-2">Crear Encuesta</Button>
                                            </Link>
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
                                                                        <OpenCloseButton isActive={poll.isActive}/>
                                                                        {' '}
                                                                        <Button variant="primary" size="sm">Resultados</Button>{' '}
                                                                        <Button variant="warning" size="sm">Editar</Button>{' '}
                                                                        <Button variant="danger" size="sm" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick(poll._id) } }>Eliminar</Button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
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
