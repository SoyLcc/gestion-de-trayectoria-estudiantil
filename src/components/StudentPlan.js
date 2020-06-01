import React from 'react';
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import SubjectCard from './SubjectCard'

const semester = ['I','II','III','IV','V','VI','VII','VIII'];

export default class StudentPlan extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  loadData() {
    // const res = await Axios.get('')
    // this.setState({users:res.data});
    // console.log(this.state.users);

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
      <div className="row">
        <div className="col-md-8">
          <Container fluid="xl">
            <div className="container1">
              {
                this.state.data.map((subjects, i) => {
                  return (
                    <div className="row1 justify-content-md-center" key={i} >
                      <div className="semester-text" key={i}>{semester[i]}</div>
                      {
                        this.renderSubjects(subjects)
                      }
                    </div>
                  )
                })
              }
            </div >

          </Container>
        </div>
        <div className="col-md-4">
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
        </div>
      </div>
    )
  }
}