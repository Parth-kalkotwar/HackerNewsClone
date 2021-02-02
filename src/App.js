import React from 'react';
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path = '/login' exact component={Login}></Route>
            <Route path='/' component={Homepage}></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
