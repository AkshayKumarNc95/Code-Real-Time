import React, { useRef, useEffect, useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// My components
import HomePage from "../home";
// My sub components
import Header from "../../sub_components/common/header/NavBar";
import Stream from "../stream";
import { SignUp, Login } from "../auth";
import Landing from "../../sub_components/landing_page";

// utils
import { authContext, authDef } from "../../utils/global";

function App() {
  const divRef = useRef();

  const [Auth, setAuth] = useState(authDef);
  const isAuth = Auth.isAuthenticated;

  useEffect(() => {
    setDivHeight();
  }, []);

  function setDivHeight() {
    divRef.current.style.height = "100%";
  }

  return (
    <div className="App">
      <Router>
        <div id="app-outer" ref={divRef}>
          <Header isAuth={isAuth} />
          <authContext.Provider value={{ Auth, setAuth }}>
            <Switch>
              {isAuth && (
                <>
                  <Route
                    path="/home"
                    render={(props) => <HomePage Auth={Auth} />}
                  />
                  <Route
                    path="/stream"
                    render={(props) => <Stream Auth={Auth} />}
                  />
                </>
              )}
              <Route path="/" exact component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </authContext.Provider>
        </div>
      </Router>
    </div>
  );
}

export default App;
