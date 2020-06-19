import React, { Component } from 'react'
import { Chart, defaults, HorizontalBar, Bar } from 'react-chartjs-2';
import { merge } from 'lodash';

merge(defaults, {
    global: {
        pointLabelFontSize : 20,
        animation: true,
        fullWidth: false,
        align: "center",
        labels : {
            boxWidth: 20,
            fontSize: 20
        }
    },
});

const data = {
labels: ['CÁLCULO DIFERENCIAL E INTEGRAL I', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Materias',
      backgroundColor: 'rgba(255,99,132,0.4)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

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
                labelString: 'Materias',
            },
            ticks: {
                callback: function(value, index, values) {
                    if (/^.+\s.+$/.test(value)) {
                        console.log(value.split(" "))
                        return value.split(" ")
                    } else {
                        return value;
                    }
                }
            }
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                fontSize: 20,
                labelString: 'Votos'
            },
            ticks: {
                callback: function(value, index, values) {
                    if (/^.+\s.+$/.test(value)) {
                        console.log(value.split(" "))
                        return value.split(" ")
                    } else {
                        return value;
                    }
                }
            }
        }],
    }
}

function formatLabel(str, maxwidth) {
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function(item, index){
        if(temp.length > 0)
        {
            var concat = temp + ' ' + item;

            if(concat.length > maxwidth){
                sections.push(temp);
                temp = "";
            }
            else{
                if(index == (words.length-1))
                {
                    sections.push(concat);
                    return;
                }
                else{
                    temp = concat;
                    return;
                }
            }
        }

        if(index == (words.length-1))
        {
            sections.push(item);
            return;
        }

        if(item.length < maxwidth) {
            temp = item;
        }
        else {
            sections.push(item);
        }

    });

    return sections;
}

export default class HorizontalBarExample extends Component {

    
    componentWillMount() {
        Chart.pluginService.register({
            beforeDraw: function (chart, easing) {
                console.log(chart)
               
                chart.ctx.textAlign = 'center';
            }
        });
    }
   
    render() {
        return (
        <div>
            <h2>Horizontal Bar Example</h2>
            {/* <HorizontalBar data={data} options={options}/> */}
            <Bar data={data} width={100} height={50} />
        </div>
        );
    }
};