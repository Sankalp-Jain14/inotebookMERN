import logo from './logo.svg';
import './App.css';

import React ,{Component} from 'react';

export default class App extends Component {
  c = "John";
  render (){
    return(
    <div>
      I have started learning class component and variable c is {this.c}
    </div>
    )
  }
} 
