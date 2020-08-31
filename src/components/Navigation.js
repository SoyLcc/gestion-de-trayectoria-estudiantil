import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './navigationStyles.css'

export default class Navigation extends Component {

    componentDidMount() {
        this.checkUserprivileges()
    }

    checkUserprivileges(){
        

    }

    render() {
        let isAdmin = localStorage.getItem("isAdmin")

        return (
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
                <Link to="/">
                    <Navbar.Brand className="brand1">Gestión De Trayectoria Estudiantil</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className="nav-link" to="/">Inicio</Link>
                        <Link className="nav-link" to="/poll">Encuestas</Link>
                        {/* <Link className="nav-link" to="/profile">Mi Perfil</Link> */}
                        {isAdmin ?
                            <Link className="nav-link btn btn-success ml-2" to="/admin/polls">Admin Panel</Link>: ""
                        }
                        <Link className="nav-link btn btn-secondary ml-2" to="/logout">Cerrar sesión</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

