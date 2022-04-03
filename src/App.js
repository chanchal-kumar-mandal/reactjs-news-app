import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route exact path="/" element={
              <News setProgress={this.setProgress} key="general" country="in" category="general" pageSize={this.pageSize}/>
            }>
            </Route>
            <Route exact path="/business" element={
              <News setProgress={this.setProgress} key="business" country="in" category="business" pageSize={this.pageSize}/>
            }>
            </Route>
            <Route exact path="/entertainment" element={
              <News setProgress={this.setProgress} key="entertainment" country="in" category="entertainment" pageSize={this.pageSize}/>
            }>
            </Route>
            <Route exact path="/general" element={
              <News setProgress={this.setProgress} key="general" country="in" category="general" pageSize={this.pageSize}/>
            }>
            </Route>
            <Route exact path="/health" element={
              <News setProgress={this.setProgress} key="health" country="in" category="health" pageSize={this.pageSize}/>
            }>
            </Route>
            <Route exact path="/science" element={
              <News setProgress={this.setProgress} key="science" country="in" category="science" pageSize={this.pageSize}/>
            }>
            </Route>
            <Route exact path="/sports" element={
              <News setProgress={this.setProgress} key="sports" country="in" category="sports" pageSize={this.pageSize}/>
            }>
            </Route>
            <Route exact path="/technology" element={
              <News setProgress={this.setProgress} key="technology" country="in" category="technology" pageSize={this.pageSize}/>
            }>
            </Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

