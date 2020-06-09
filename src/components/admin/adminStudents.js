import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import NavigationLeft from './NavigationLeft'
import Content from '../utils'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'


export default class AdminStudents extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            students: [], 
        }
        this.handleClick = this.handleClick.bind(this);
    }

    loadData = async () => {
        const res = await axios.get('http://localhost:4000/api/users/');
        this.setState({students:res.data});
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    async handleClick(type,student) {
        if(type === "delete") {
            await axios.delete('http://localhost:4000/api/polls/'+student._id)
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
                                    <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                                        <h5 className="card-header">Estudiantes</h5>
                                        <div className="card-body">
                                            <Link to="/admin/newStudent">
                                                <Button variant="success" size="sm" className="float-right mb-2">Nuevo Estudiante</Button>
                                            </Link>
                                            {this.state.students.length !== 0  && 
                                                <Table striped bordered hover variant="dark" size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Expediente</th>
                                                            <th>Nombre</th>
                                                            <th>Apellidos</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {   
                                                            this.state.students.map((student, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{i}</td>
                                                                        <td>{student.student_id}</td>
                                                                        <td>{student.name}</td>
                                                                        <td>{student.lastname}</td>
                                                                        <td>
                                                                            <Button variant="warning" size="sm" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick('delete',student) } }>Editar</Button>{' '}
                                                                            <Button variant="danger" size="sm" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick('delete',student) } }>Eliminar</Button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>    
                                                </Table>
                                            }
                                            {this.state.students.length === 0 && 
                                                <div className="alert alert-danger mt-5" role="alert">
                                                    Aun no hay Estudiantes!
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
