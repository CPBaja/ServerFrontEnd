import React from "react"
import Timeline from "./modules/Timeline";
import ApexGraph from "./modules/ApexGraph"

const graphStyle = {
    width: '100%',
    height: '200px',
    backgroundColor: "white"
};

const timelineStyle = {
    position: 'absolute',
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
        return (
            <div >
                <div>
                    {this.state.timeRange}
                    <ApexGraph timeRange = {this.state.timeRange} style = {graphStyle}/>
                </div>
                <Timeline style={timelineStyle} onTimeframeUpdate={newFrame => this.setState({timeRange: newFrame})}/>


            </div>
        );
    }
}
export default Graph;
