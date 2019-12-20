import React from "react"
import Timeline from "./modules/Timeline";
import ApexGraph from "./modules/ApexGraph"
import SensorDropdown from "./modules/addSensor"
import HighChart from "./modules/sampleChart"
import VictoryGraph from "./modules/victory"
import NivoGraph from "./modules/nivo"

const graphStyle = {
    width: '100%',
    height: '200px',
    backgroundColor: "white"
};

const timelineStyle = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100px'
};


class Graph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timeRange: [0,1]
        };
    }

    render() {
      const timeRange = this.props.timeRange;
      var charts = []
      console.log(this.props.sensorData)
      for (var i = 0; i < this.props.sensorData.length; i++ ) {
        charts.push(<ApexGraph key={i} timeRange = {this.props.timeRange}
          style = {graphStyle} graphTitle={'yeee'}
          sensorData={this.props.sensorData[i]['data']}
          sensorName={this.props.sensorData[i]['name']}/>)

      }
        return (
            <div className="content">
                <SensorDropdown avaliableSensors={this.props.avaliableSensors} dropdownChange={this.props.dropdownChange} dropdownValue={this.props.dropdownValue}/>
                <div className="charts">
                  {charts}
                </div>
                <Timeline style={timelineStyle} onTimeframeUpdate={this.props.onTimeframeUpdate} lastime={this.props.lastime} realtime={this.props.realtime}/>
            </div>
        );
    }
}
export default Graph;
