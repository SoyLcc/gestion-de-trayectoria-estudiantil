import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import SubjectCard from './components/SubjectCard'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }

  }

  loadData() {
      fetch('http://www.mocky.io/v2/5ed4700a3300005f00f7a191')
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

  renderSubjects(subjects) {
    const items = [];
    for (const [index, subject] of subjects.entries()) {
      items.push(<SubjectCard className="col" key={index} subject={subject} />)
    }
    return items;
  }

  render() {
    return (
      <Container fluid="xl">
        <div className="container1">
          { 
            this.state.data.map((subjects, i) => {
              return ( 
                <div className="row1" key={i} >
                  { 
                    this.renderSubjects(subjects)
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