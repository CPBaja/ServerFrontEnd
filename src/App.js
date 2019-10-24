import React from 'react';
import './App.css';

//components
import TopBar from './mainPage/topBar'
//import MainSidebar from './mainPage/sidebar'

import Content from './mainPage/content'
import StatusTable from './vehicleStatus/statusTable'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage:'home',
      sidebarEnabled:false,
      sideMenuVisible: true,
      currentProfile: 'General'
    }
  }

  setPage = (e, {name}) => {
    this.setState({currentPage: name})
    console.log(name)
  }

  handleHamburgerClick = () => {
    var currentMenu = this.state.sideMenuVisible
    console.log(!currentMenu)
    this.setState({sideMenuVisible : !currentMenu})
  }

  render() {

    if (this.state.currentPage=='home') {
      console.log('shit')
      return(

        <div className="App">
          <TopBar setPage={this.setPage} currentPage={this.state.currentPage}
            handleHamburgerClick={this.handleHamburgerClick}/>
          <Content />
        </div>
      )
    }
    if (this.state.currentPage=='sensorPage') {
      console.log('fuck')
      return (
        <div className="App">
          <TopBar setPage={this.setPage} currentPage={this.state.currentPage}
            handleHamburgerClick={this.handleHamburgerClick}/>
          <StatusTable />
        </div>
      )
    }
  }

}
