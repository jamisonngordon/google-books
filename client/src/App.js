import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/Home'
import Books from './components/Books'
import "./App.css";

class App extends Component {
  render() {
    return (
        <Router>
          <Route path='/' exact component={Home}/>
          <Route path='/books' exact component={Books}/>
        </Router>
    );
  }
}

export default App;
