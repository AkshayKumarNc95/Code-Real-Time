import React, { useRef, useEffect, useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// My components
import HomePage from "../../views/home";
// My sub components
import Header from "../common/header/NavBar";
import Stream from "../../views/stream";
import { SignUp, Login } from "../../views/auth";
import Landing from "../../views/landing_page";

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
                    path="/History"
                    render={(props) => <HomePage Auth={Auth} />}
                  />
                  <Route
                    path="/Stream"
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
