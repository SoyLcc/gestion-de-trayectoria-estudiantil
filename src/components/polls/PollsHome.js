import React, { Component } from 'react'
import styled from 'styled-components';
import Content from '../utils';

function PollsClosed() {
    return (
        <div class="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
            <h5 class="card-header">Atencion Estudiantes!</h5>
            <div class="card-body">
                <h5 class="card-title">Próxima Encuesta Semestral</h5>
                <p class="card-text">Comunidad de Lcc la proxima encuesta semestral para concer las necesidades de los estudiantes se llevara acabo en el siguiente periodo:</p>
                <p class="card-text font-weight-bold">25 de agosto de 2020 - 7 de septiembre de 2020</p>
            </div>
        </div>
    );
}

function PollsOpened() {
    return (
        <div class="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
            <h5 class="card-header">Atencion Estudiantes!</h5>
            <div class="card-body">
                <h5 class="card-title">Encuesta Semestral Abierta</h5>
                <p class="card-text">Comunidad de Lcc la proxima encuesta semestral para concer las necesidades de los estudiantes esta abierta</p>
                <a href="#" class="btn btn-primary">ir a la Encuesta</a>
            </div>
        </div>
    );
}
function LastPollReuslts() {
    return (
        <div class="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
            <h5 class="card-header">Resultados Encuesta 2020-1</h5>
            <div class="card-body">
                <h5 class="card-title">Resultados</h5>
                <p class="card-text">Resultados...</p>
            </div>
        </div>
    );
}

export default class PollsHome extends Component {
    render() {
        return (
            <Content>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            { PollsClosed() }
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            { PollsOpened() }
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            { LastPollReuslts() }
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}
