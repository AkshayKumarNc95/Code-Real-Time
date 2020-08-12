import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// My components
import HomePage from '../home'; 
// My sub components
import Header from '../../sub_components/common/header/NavBar';
import Stream from '../stream';

function App() {
  return (
    <div className="App">
      
      <Router >
      <Header />
        <Switch>
          <Route path ="/" exact component = {HomePage}/>
          <Route path = "/stream"  component ={Stream} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
