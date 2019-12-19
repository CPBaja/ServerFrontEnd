import React from "react";
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
}
    from "victory";
//import {throttle} from 'lodash'

let data = [];
for (let i = 0; i < 1; i++) {
    data.push({x: i / 1, y: Math.random() * 10})
}

const GraphStyle = {};


class VictoryGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartWidth: 0,
            chartHeight: this.props.style.height,
            data: data
        }

    }

    componentDidMount() {
        this.setState({
            chartWidth: window.innerWidth

        });
        window.addEventListener('resize', this.updateDimensions.bind(this));
        // remove this on unmount
    }

    updateDimensions(event) {
        this.setState({
            chartWidth: event.target.innerWidth
        })
    }

    render() {
        return (
            <div style={this.props.style}>
                <svg viewBox={`0 0 ${this.state.chartWidth} ${this.state.chartHeight}`} preserveAspectRatio="none" width="100%">
                    <VictoryChart
                        standalone={false}
                        width={this.state.chartWidth}
                        height={this.props.style.height || '200px'}
                        theme={VictoryTheme.material}
                        domain={{x: this.props.timeRange}}
                    >
                        <VictoryLine
                            style={{
                                data: {stroke: "#c43a31"},
                                parent: {border: "1px solid #ccc"}
                            }}
                            data={this.state.data}
                        />
                    </VictoryChart>

                </svg>

            </div>

        )
    }


}

export default VictoryGraph;
