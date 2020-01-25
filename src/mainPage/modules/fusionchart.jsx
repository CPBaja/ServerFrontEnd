import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "../lib/ReactFC";

ReactFC.fcRoot(FusionCharts, TimeSeries);

var data = {
    chart: {},
    caption: {
        text: "Overview of the Baja Car"
    },
    subcaption: {
        text: "Data from individual sensors"
    },
    yaxis: [
        {

        }
    ]
}

export default class FusionChart extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                { this.state.data ? (
                    <ReactFC />
                ) : (
                    "Loading"
                )}
            </div>
            
        );
    }
}