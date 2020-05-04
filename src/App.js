import React from 'react';
import { Provider } from "react-redux";
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./layout/landing/index";
import StudentPage from "./layout/Student/landing";
import store from "./store";
import './App.css';
import StaffDashboard from "./layout/Staff";
import SecuredRoute from "./securityUtils/SecureRoute";
import StaffRoute from "./securityUtils/StaffRoute";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";
import Attendance from "./layout/Attendance";
import Success from "./layout/static/Success";
import Failed from "./layout/static/Failed";

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
  }
}

function App() {
  return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing}/>
              <SecuredRoute path="/student" component={StudentPage}/>
              <StaffRoute path="/staff" component={StaffDashboard}/>
              <Route exact path="/attendance/:id" component={Attendance}/>
              <Route exact path="/attendance/status/success" component={Success}/>
              <Route exact path="/attendance/status/failed" component={Failed}/>
              <Redirect exact from="/attendance/" to="/" />
            </Switch>
          </div>
        </Router>
      </Provider>
  );
}

export default App;
