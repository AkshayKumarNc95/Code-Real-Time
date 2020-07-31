import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// My components
import HomePage from '../home'; 
// My sub components
import Header from '../../sub_components/header/NavBar';

function App() {
  return (
    <div className="App">
      <Header />
      <Router >
        <Switch>
          <Route path ="/" exact component = {HomePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
