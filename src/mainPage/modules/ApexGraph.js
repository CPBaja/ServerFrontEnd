import React from "react";
import Chart from 'react-apexcharts'
import {throttle} from 'lodash'



const GraphStyle = {};



class ApexGraph extends React.Component {
    constructor(props) {
        super(props);

        this.updateDomain = throttle((newRange) => {
            this.setState({
                options: {
                    xaxis: {
                        min: newRange[0],
                        max: newRange[1]
                    }
                }
            });
        }, 1/60);


        this.state = {
            options: {
                chart: {
                    animations: {
                        enabled: false,
                        easing: 'easeout',
                    },
                    height: '100px',
                    zoom: {
                        enabled: false
                    },
                    title: this.props.graphTitle
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: this.props.sensorName,
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    type: "numeric",
                    min: this.props.timeRange[0],
                    max: this.props.timeRange[1],
                }
            },

            series: [{
                name: this.props.sensorName,
                data: this.props.sensorData
            }]
        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.timeRange !== this.props.timeRange) {
            this.updateDomain(this.props.timeRange)
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <Chart height='100%' options={this.state.options} series={this.state.series}/>
            </div>

        )
    }


}

export default ApexGraph;
