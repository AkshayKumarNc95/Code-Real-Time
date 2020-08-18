import React,{useRef, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// My components
import HomePage from '../home'; 
// My sub components
import Header from '../../sub_components/common/header/NavBar';
import Stream from '../stream';
import {SignUp, Login} from '../auth';



function App() {
  const divRef = useRef()
  
  useEffect(()=>{
    setDivHeight();
  },[])

  function setDivHeight(){
    divRef.current.style.height = "100%";
  }

  return (
    <div className="App">
      <Router >
        <div id = "app-outer" ref={divRef}>
        <Header />
        <Switch>
          <Route path ="/" exact component = {HomePage}/>
          <Route path = "/stream"  component ={Stream} />
          <Route path = "/login" component = {Login} />
          <Route path = '/signup' component = {SignUp} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
