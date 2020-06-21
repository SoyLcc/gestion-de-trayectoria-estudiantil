import React, { Component } from 'react'
// import styled from 'styled-components';
import StudentPlan from './StudentPlan'
import Content from '../utils';

export default class StudentHome extends Component {
    render() {
        return (
            <Content>
                <div className="container">
                    <StudentPlan/>
                </div>
            </Content>
        )
    }
}
