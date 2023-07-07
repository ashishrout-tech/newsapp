import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);

  // const setProgress = (progress) => {
  //   setPgs(progress);
  // }
  return (
    <div>
      <NavBar />
      <LoadingBar color='#f11946' height={3} progress={progress} />
      <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="science" />
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
export default App;

