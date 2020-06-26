import React, { Component } from 'react';
import './App.css';
import Display from './components/Display';
import Sort from './components/Sort';

class App extends Component {
  render(){
    return (
     <div className='App'>
        <legend id='h1'>Quản lý Công Việc</legend>
        <Sort/>
        <Display/>
      </div> 
  );
}
}
export default App;
