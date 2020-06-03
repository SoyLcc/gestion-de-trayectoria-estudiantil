import React, { Component } from 'react'
import styled from 'styled-components';
import StudentPlan from './StudentPlan'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export default class StudentHome extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <StudentPlan/>
                </div>
                <div className="col-md-4">
                    <Title>Hola Mundo!</Title>
                </div>
            </div>
        )
    }
}
