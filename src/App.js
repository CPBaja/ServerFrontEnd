import React from 'react';
import './App.css';

//components
import TopBar from './mainPage/topBar'
import MainSidebar from './mainPage/sidebar'


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
    return (
      <div className="App">
        <TopBar setPage={this.setPage} currentPage={this.state.currentPage}
          handleHamburgerClick={this.handleHamburgerClick}/>
        <MainSidebar click={this.handleHamburgerClick} visibility={this.state.sideMenuVisible} currentPage={this.state.currentPage}/>
      </div>
    );
  }

}
