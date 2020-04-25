import React, { Component } from 'react';
import "./styles.scss";
import {Route, NavLink } from "react-router-dom";
import Courses from "../Learning/Courses";
import Attendance from "../Learning/Attendance";

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
                  <a><NavLink to="/learning/courses">Courses</NavLink></a>
                </div>
                <div className="bar-option">
                  <a><NavLink to="/learning/attendance">Attendance</NavLink></a>
                </div>
              </div>
            </div>
            <div className="col-md-8 right-box">
              <Route path={"/learning/courses"} component={Courses} />
              <Route path="/learning/attendance" component={Attendance}/>
            </div>
          </div>
        </div>
    );
  }
}

export default Learning;