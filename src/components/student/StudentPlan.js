import React from 'react';
import styled from 'styled-components';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

import SubjectCard from './SubjectCard'

const semester = ['I','II','III','IV','V','VI','VII','VIII'];


const Container = styled.div`
  display: flex !important;
`;
const Column = styled.div`
  margin-left: 20px !important;
  justify-content: start;
`;
const ColumnNumber = styled.div`
  text-align: center;
  font-family: 'Spectral', serif;
`;

export default class StudentPlan extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  loadData() {
    // const res = await Axios.get('')
    // this.setState({users:res.data});
    // console.log(this.state.users);

    fetch('http://www.mocky.io/v2/5ed6b21d340000b9e006dbea')
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
      items.push(<SubjectCard key={index} subject={subject} />)
    }
    return items;
  }

  render() {
    return (
      <Container>
        {
          this.state.data.map((subjects, i) => {
            return (
              <Column key={i} >
                <ColumnNumber>{semester[i]}</ColumnNumber>
                {
                  this.renderSubjects(subjects)
                }
              </Column>
            )
          })
        }
      </Container>
    )
  }
}