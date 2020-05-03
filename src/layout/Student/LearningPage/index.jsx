import React, { Component } from 'react';
import "./styles.scss";
import {Route, NavLink, Redirect } from "react-router-dom";
import Courses from "../Learning/Courses";
import Attendance from "../Learning/Attendance";
import ModuleEnrollment from "../ModuleEnrollment";

class Learning extends Component {
  render() {
    return (
        <div className="student-learning container">
          <div className="panel row">
            <div className="col-md-4 left-box">
              <div className="dropdown-bar">
                <div className="bar-header">
                  Learning
                </div>
                <div className="bar-option">
                  <NavLink className="nav-link" to="/student/learning/course">Courses</NavLink>
                </div>
                <div className="bar-option">
                  <NavLink className="nav-link" to="/student/learning/attendance">Attendance</NavLink>
                </div>
                <div className="bar-option">
                  <NavLink className="nav-link" to="/student/learning/enrollment">Enrollment</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-8 right-box">
              <Route exact path={["/student/learning/course", "/student/learning"]} component={Courses} />
              <Route exact path={"/student/learning/attendance"} component={Attendance}/>
              <Route exact path="/student/learning/enrollment" component={ModuleEnrollment}/>
              <Redirect exact from="/student/learning" to="/student/learning/course" />
            </div>
          </div>
        </div>
    );
  }
}

export default Learning;