import React, { Component } from 'react'
import NavigationLeft from './NavigationLeft'
import Content from '../utils'


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
                                        <h5 class="card-header">CRUD Encuestas</h5>
                                        <div class="card-body">
                                            <h5 class="card-title">...</h5>
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
