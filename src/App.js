import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./layout/landing/index";
import Learning from "./layout/Student/LearningPage";
import StudentPage from "./layout/Student/landing";
import store from "./store";
import './App.css';
import Header from "./layout/Student/Header";
import StaffDashboard from "./layout/StaffDashboard";
import SecuredRoute from "./securityUtils/SecureRoute";
import StaffRoute from "./securityUtils/StaffRoute";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";

const jwtToken = localStorage.jwttoken;

if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_jwt = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwt
  });

  const currentTime = Date.now()/1000;
  if(decoded_jwt.exp < currentTime){
    store.dispatch(logout);
    window.location.href = "/"
    // window.location.href("/");
  }
}

function App() {
  return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/*<Header/>*/}
            <Switch>
              <Route exact path="/" component={Landing}/>
              {/*<Route exact path="/dashboard"*/}
              <SecuredRoute path="/student" component={StudentPage}/>
              <StaffRoute path="/staff" component={StaffDashboard}/>
            </Switch>
          </div>
        </Router>
      </Provider>
  );
}

export default App;
