import React, { Component } from 'react'
import NavigationLeft from './NavigationLeft'
import Content from '../utils'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { API_URL } from '../../App'
import './styles.css'

const AXIS = {
    BASICO: 'B',
    COMUN: 'C',
    PROFESIONAL: 'P',
    ESPECIALIZANTE: 'E',
    INTEGRADOR: 'I'
  }

export default class AdminSubjects extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            subjects: [], 
        }
        this.handleClick = this.handleClick.bind(this);
    }

    loadData = async () => {
        const res = await axios.get(`${API_URL}/subjects/`);
        this.setState({subjects:res.data});
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    async handleClick(type,subject) {
        if(type === "delete") {
            await axios.delete(`${API_URL}/subjects/${subject._id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        this.loadData();
    }
    
    chooseAxis(subject){
        let axis;
        if(subject.axis === AXIS.BASICO) {
            axis = "Basico";
        }
        if(subject.axis === AXIS.COMUN) {
            axis = "Comun";
        }
        if(subject.axis === AXIS.PROFESIONAL) {
            axis = "Profesional";
        }
        if(subject.axis === AXIS.ESPECIALIZANTE) {
            axis = "Especializante";
        }
        if(subject.axis === AXIS.INTEGRADOR) {
            axis = "Integrador";
        }
        return axis;
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
                                        <h5 className="card-header">Materias</h5>
                                        <div className="card-body">
                                            <Link to="/admin/newSubject">
                                                <Button variant="success" size="sm" className="float-right mb-2">Crear Materia</Button>
                                            </Link>
                                            {this.state.subjects.length !== 0  && 
                                                <Table striped bordered hover variant="dark" size="sm" responsive="lg">
                                                    <thead>
                                                        <tr>
                                                            <th>Clave</th>
                                                            <th>Nombre</th>
                                                            <th>Creditos</th>
                                                            <th>Requerimientos</th>
                                                            <th>Eje</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {   
                                                            this.state.subjects.map((subject, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{subject.key}</td>
                                                                        <td>{subject.name}</td>
                                                                        <td>{subject.credits}</td>
                                                                        <td>{subject.requirements}</td>
                                                                        <td>{this.chooseAxis(subject)}</td>
                                                                        <td className="btn-group ">
                                                                            <Link to= {{pathname: "/admin/editSubject", params: subject}}>
                                                                                <button type="button" className="btn btn-warning">Editar</button>
                                                                            </Link>
                                                                            <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Usted confirma esta acción?')) this.handleClick('delete',subject) } }>Eliminar</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>    
                                                </Table>
                                            }
                                            {this.state.subjects.length === 0 && 
                                                <div className="alert alert-danger mt-5" role="alert">
                                                    Aun no hay Materias!
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
