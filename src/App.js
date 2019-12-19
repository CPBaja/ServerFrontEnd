import React from 'react';
import './App.css';

//router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//components
import TopBar from './mainPage/topBar'

//functions
import DataWebSocketRequest from './websockets';

import Content from './mainPage/content'


import StatusTable from './vehicleStatus/statusTable'
var ws;

var data = [];
var data2 = []
for(let i = 0; i < 2000; i++){
    data.push([i/100, Math.random() * 10])
    data2.push([i/100, Math.random() * 10])
}

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage:'home',
      sidebarEnabled:false,
      sideMenuVisible: true,
      currentProfile: 'General',

      avaliableSensors: [{key: 'Speed', text: 'Speed', connected: true, detail: 'Measures Current Speed (GPS)'}, {key: 'Accelerometer', text: 'Accelerometer (Y)', detail: "Acclerometer Data in Y direction", connected:false}],

      timeRange: [0, 1],

      dropdownValue: '',

      realtime: false,
      lastime: 20,

      density: 1000,
      currentSensors: [],
      sensorData: [

      ],
    }
  }

  /*
  componentDidMount() {
    ws = new WebSocket('/api');
  }
  */
  setPage = (e, {name}) => {
    this.setState({currentPage: name})
    console.log(name)
  }

  handleHamburgerClick = () => {
    var currentMenu = this.state.sideMenuVisible
    console.log(!currentMenu)
    this.setState({sideMenuVisible : !currentMenu})
  }

  onTimeframeUpdate = (newFrame) => {
    //TODO write websocket request
    //DataWebSocketRequest(newFrame, this.state.density, this.state.sensors, ws)
    this.setState({timeRange: newFrame})
    //console.log(newFrame)
  }

  dropdownChange = (e, {value}) => {
    this.state.currentSensors.push(value)
    //this.setState({dropdownValue : ''})

    //TESTING ONLY!
    if (value == "Accelerometer") {
      this.state.sensorData.push({'name': value, 'data': data})
    } else {
      this.state.sensorData.push({'name': value, 'data': data2})
    }

  }




  render() {

    return (
      <Router>
        <TopBar setPage={this.setPage} currentPage={this.state.currentPage}
          handleHamburgerClick={this.handleHamburgerClick}/>

        <Switch>
          <Route path="/sensors">
            <Content timeRange={this.state.timeRange} onTimeframeUpdate={this.onTimeframeUpdate} realtime={this.state.realtime} lastime={this.state.lastime} avaliableSensors={this.state.avaliableSensors} dropdownChange={this.dropdownChange} dropdownValue={this.state.dropdownValue} sensorData={this.state.sensorData}/>
          </Route>
          <Route path="/status">
            <StatusTable avaliableSensors={this.state.avaliableSensors}/>
          </Route>
        </Switch>
      </Router>
    )
  }

}
