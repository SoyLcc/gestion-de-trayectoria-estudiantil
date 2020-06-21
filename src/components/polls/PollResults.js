import React, { Component } from 'react'
import axios from 'axios';
import Content from '../utils';
import { Link } from 'react-router-dom'
import HorizontalBarExample from './horizontalBar';
import "./poll.css"
import { Chart, defaults, HorizontalBar, Bar } from 'react-chartjs-2';

const options = {
    legend: {
        display: false,
        labels: {
            boxWidth: 20,
            fontSize: 20
        }
    },
    scales: {
        yAxes: [{
            scaleLabel:{
                display:true,
                fontSize: 20,
                labelString: 'Votos'
            },
            ticks: {
                min: 0,
                beginAtZero: true,
                stepSize: 1,
            }
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                fontSize: 20,
                labelString: 'Materias'
            },
            ticks: {
                callback: function(value, index, values) {
                    if (/^.+\s.+$/.test(value)) {
                        // console.log(value.split(" "))
                        return value.split(" ")
                    } else {
                        return value;
                    }
                }
            }
        }],
    }
}

function compare(a, b) {
    const votesA = a.votes;
    const votesB = b.votes;
  
    let comparison = 0;
    if (votesA > votesB) {
      comparison = 1;
    } else if (votesA < votesB) {
      comparison = -1;
    }
    return comparison;
} 

export default class PollResults extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            poll: [],
            labels: [],
            votes: []
        }
    }
    
    async loadPoll(pollID){
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/polls/'+pollID,
            });

            if (response.status === 200) {
                this.setState({
                    poll: response.data,
                })
            }

        } catch (error) {
            
        }
    }
    async loadResults(pollID){
        try {
            const response = await axios.get('http://localhost:4000/api/votes/'+pollID);
            
            if (response.status === 200) {
                let subjects = response.data;
                let labels = [];
                let votes = [];

                subjects.sort((a, b) => b.votes - a.votes);
                subjects.forEach((subject) => {
                    if(subject.votes > 0){
                        labels.push(subject.name);
                        votes.push(subject.votes);
                    }
                    
                })
                this.setState({labels,votes})
            }
        } catch (error) {
            
        }
    }
    
    async loadData() {
        const { id } = this.props.match.params;
        this.loadPoll(id);
        this.loadResults(id);
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        const { poll } = this.state;
        const data = {
            labels: this.state.labels,
              datasets: [
                {
                  label: 'Materias',
                  backgroundColor: 'rgba(255,99,132,0.4)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: this.state.votes
                }
              ]
        };
        return (
            <Content>
                <div className="container">
                    <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                        <h5 className="card-header">{poll.title}</h5>
                        <div className="card-body">
                            <div className="card" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                                <Bar data={data} width={100} height={50} options={options}/>
                            </div>
                        </div>
                        <div className="card-footer">
                            <Link className="btn btn-primary float-right mr-2" to="/poll">Atras</Link>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}
