import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class LineGraph extends Component {
    render() {
        const data = {
            labels: this.props.label,
            datasets: [
                {
                    label: 'EVENTS',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: '#003459',
                    borderColor: '#007EA7',
                    borderWidth: 2,
                    fontSize: '18px',
                    data: this.props.data
                }
            ],
            title: this.props.title,
            xAxisLabel: this.props.xAxisLabel
        };

        return (
            <section>
                <h1>{data.title}</h1>
                <Line
                    data={data}
                    options={{
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'The number of events'
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: `${data.xAxisLabel}`
                                }
                            }]
                        }
                    }}
                />
            </section>
        )
    }
}
