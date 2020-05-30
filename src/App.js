import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AsignatureCard from './components/AsignatureCard'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }

  }

  loadData() {
      fetch('http://www.mocky.io/v2/5ed0d4533500004a00ff9f9e')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ data: data })
        })
        .catch(err => console.error(this.props.url, err.toString()))
    }

  componentDidMount() {
    this.loadData()
  }

  renderAsignaturas(materias) {
    const items = [];
    for (const [index, materia] of materias.entries()) {
      items.push(<AsignatureCard className="col" key={index} name={materia.asignatura} eje={materia.eje} isApproved={this.state.isShow} />)
    }
    return items;
  }

  render() {
    return (
      <Container fluid="xl">
        <div className="container1">
          { 
            this.state.data.map((materias, i) => {
              return ( 
                <div className="row1" key={i} >
                  { 
                    this.renderAsignaturas(materias)
                  }
                </div>
              )
            })
          }
        </div >
        <div className="container2">
            <div className="row1">
              <div>MATERIAS EJE ESPECIALIZANTE</div>
              <Col>2 of 2</Col>
            </div>
            <div className="row1">
              <div>MATERIAS EJE INTEGRADOR</div>
              <Col>2 of 2</Col>
            </div>
          </div>
      </Container>
    )
  }
}