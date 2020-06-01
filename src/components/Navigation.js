import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to="/">
                    <Navbar.Brand>Gestion De Trayectoria Estudiantil</Navbar.Brand>
                </Link>
                <Nav className="ml-auto">
                    <Link className="nav-link" to="/">Inicio</Link>
                    <Link className="nav-link" to="/poll">Encuestas</Link>
                    <Link className="nav-link" to="/profile">Mi Perfil</Link>
                </Nav>
            </Navbar>
        )
    }
}
