import React from "react";
import ReactApexCharts from 'react-apexcharts'
import {throttle} from 'lodash'

let data = [];
for(let i = 0; i < 1000; i++){
    data.push([i/1000, Math.random() * 10])
}

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
        }, 1/30);


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
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Product Trends by Month',
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
                name: "Desktops",
                data: data
            }]
        };



    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.timeRange !== this.props.timeRange) {
            this.updateDomain(this.props.timeRange)

            //this.options.xaxis.min = this.props.timeRange[0];
            //this.options.xaxis.min = this.props.timeRange[1];

        }
    }

    render() {
        return (
            <div style={this.props.style}>
                {<ReactApexCharts height='100%' options={this.state.options} series={this.state.series}/>}
            </div>

        )
    }


}

export default ApexGraph;
