import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 5;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }

  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <NavBar />
        <LoadingBar color='#f11946' height={3} progress={this.state.progress}/>
        <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="general" />
        {/* <News pageSize={this.pageSize} country = "in" category="business"/>
        <News pageSize={this.pageSize} country = "in" category="entertainment"/>
        <News pageSize={this.pageSize} country = "in" category="general"/>
        <News pageSize={this.pageSize} country = "in" category="health"/>
        <News pageSize={this.pageSize} country = "in" category="science"/>
        <News pageSize={this.pageSize} country = "in" category="sports"/>
        <News pageSize={this.pageSize} country = "in" category="technology"/> */}
      </div>
    )
  }
}

