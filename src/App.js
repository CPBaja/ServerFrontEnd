import React from 'react';
import './App.css';

//components
import TopBar from './mainPage/topBar'



export default class App extends React.Component {

  constructor(props) {
    this.state = {
      currentPage:'home',
      sidebarEnabled:'false'
    }
    this.setPage = this.setPage.bind(this);
  }

  setPage(target) {
    this.setState({currentPage:target})
  }

  render() {
    return (
      <div className="App">
        <TopBar changePage={this.state.setPage} currentPage={this.state.currentPage} />
      </div>
    );
  }

}
