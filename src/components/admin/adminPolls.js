import React, { Component } from 'react'
import NavigationLeft from './NavigationLeft'
import Content from '../utils'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

export default class adminPolls extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <NavigationLeft/>
                    <Content>
                        <div className="container">
                            <div className="row">
                            <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <div class="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                                        <h5 class="card-header">CRUD Encuestas </h5>
                                        <div class="card-body">
                                            <Button variant="success" size="sm" className="float-right mb-2">Crear Encuesta</Button>
                                            <Table striped bordered hover variant="dark" size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Titulo</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>2020-1</td>
                                                        <td>
                                                            <Button variant="primary" size="sm">Cerrar/Abrir</Button>{' '}
                                                            <Button variant="primary" size="sm">Resultados</Button>{' '}
                                                            <Button variant="warning" size="sm">Editar</Button>{' '}
                                                            <Button variant="danger" size="sm">Eliminar</Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>2019-2</td>
                                                        <td>
                                                            <Button variant="primary" size="sm">Cerrar/Abrir</Button>{' '}
                                                            <Button variant="primary" size="sm">Resultados</Button>{' '}
                                                            <Button variant="warning" size="sm">Editar</Button>{' '}
                                                            <Button variant="danger" size="sm">Eliminar</Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>2019-1</td>
                                                        <td>
                                                            <Button variant="primary" size="sm">Cerrar/Abrir</Button>{' '}
                                                            <Button variant="primary" size="sm">Resultados</Button>{' '}
                                                            <Button variant="warning" size="sm">Editar</Button>{' '}
                                                            <Button variant="danger" size="sm">Eliminar</Button>
                                                        </td>   
                                                    </tr>
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
