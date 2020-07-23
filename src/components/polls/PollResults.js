import React, { Component } from 'react'
import axios from 'axios';
import Content from '../utils';
import { Link } from 'react-router-dom'
import './poll.css'
import { Chart, defaults, HorizontalBar, Bar } from 'react-chartjs-2';
import 'animate.css';
import { API_URL } from '../../App'

const themes = {
    purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
    red: ['#E23D3D', '#EF4545', '#FF28283B'],
    blue: ['#5674E0', '#5674E0', '#5674E03B'],
    black: ['#303030', '#303030', '#3030303B'],
    white: ['#ffffff', '#ffffff', '#ffffff3B'],
    cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B']
  }

const options = {
    animation: {
        duration: 0
    },
    legend: {
        display: false,
        position: 'bottom',
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
            },
            ticks: {
                // display: false,
                fontSize:10,
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
                url: `${API_URL}/polls/${pollID}`,
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
            const response = await axios.get(`${API_URL}/votes/${pollID}`);
            
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
    alignPoll = (customAlign) => {
        if (customAlign === 'left') {
          return 'flex-start'
        } else if (customAlign === 'right') {
          return 'flex-end'
        } else {
          return 'center'
        }
    }

    calculatePercent = (votes, total) => {
        if (votes === 0 && total === 0) {
          return '0%'
        }
        return `${parseInt((votes / total) * 100)}%`
    }

    render() {
        const customStyles = {
            questionSeparator: true,
            questionSeparatorWidth: 'question',
            questionBold: true,
            questionColor: '#303030',
            align: 'center',
            theme: 'black'
        }
        const question = "PROGRAMACION?";
        const subjectVotesPerArray = this.state.votes;
        const totalVotes = subjectVotesPerArray.reduce((total, subjectVotes) => total + subjectVotes, 0)

        const { poll } = this.state;
        let labels = this.state.labels;
        let datasets = [];
        let colors = themes['black'];

        var randomColorGenerator = function () { 
            return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
        };
        
        if (labels){
            let votes = this.state.votes;
            votes.forEach( (numVotes, i) => {
                console.log(numVotes)
                colors.push(randomColorGenerator());
                
            });
            datasets.push({
                backgroundColor: colors,
                borderWidth: 1,
                data: votes
            });
        }
        const data = {
            labels,
            datasets
        };
        return (
            <Content>
                <div className="container">
                    <div className="card text-center" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                        <h5 className="card-header">{poll.title}</h5>
                        <div className="card-body">
                            <div className="card" style={{border: "1px solid rgba(0,0,0,.160)"}}>
                                <article className={`animate__animated animate__fadeInLeft animate__faster poll`} style={{ textAlign: customStyles.align, alignItems: this.alignPoll(customStyles.align) }}>
                                <h3 className="question">Porcentaje de Interesados Por Materia</h3>
                                    <ul className="answers">
                                    { subjectVotesPerArray.map((subjectVotes,i) => (
                                        <li key={i}>
                                        {
                                            <div className={`animate__animated animate__fadeInLeft animate__faster result`} style={{ color: colors[0], borderColor: colors[1] }}>
                                                <div className="fill" style={{ width: this.calculatePercent(subjectVotes, totalVotes), backgroundColor: colors[2] }} />
                                                <div className="labels">
                                                    <span className="percent" style={{ color: colors[0] }}>{this.calculatePercent(subjectVotes, totalVotes)}</span>
                                                    <span className={`answer vote`} style={{ color: colors[0] }}>{labels[i]}</span>
                                                </div>
                                            </div>
                                        }
                                        </li>
                                        ))}
                                    </ul>
                                    <p className="votes">{`${totalVotes} voto${totalVotes !== 1 ? 's' : ''}`}</p>
                                </article>
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
