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
      sideMenuVisible: 'false',
      currentProfile: 'General'
    }
  }

  setPage = (e, {name}) => {
    this.setState({currentPage: name})
    console.log(name)
  }

  handleHamburgerClick = () => {
    if (this.state.sideMenuVisible==='true') {
      this.setState({ sideMenuVisible : 'false'})
    } else {
      this.setState({ sideMenuVisible : 'true'})
    }
    console.log(this.state.sideMenuVisible)
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
