import React, { Component } from 'react'
// import styled from 'styled-components';
import StudentPlan from './StudentPlan'

export default class StudentHome extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <StudentPlan/>
                </div>
            </div>
        )
    }
}
