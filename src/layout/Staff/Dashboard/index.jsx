import React, {Component} from 'react';
import "./styles.scss";
import {Link} from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
        <div className="staff-dashboard">
          <div className="row" style={{marginTop: '32px'}}>
            <div className="jumbotron w-100">
              <h1 className="display-4">Staff Page</h1>
              <hr/>
              <p className="lead">Welcome to admin page, add and modify student and courses here</p>
            </div>
          </div>
          <div className="row">
            <div className="panel">
              <div className="panel-header">
                Courses
              </div>
              <div className="panel-content">
                This is where you can manage available courses. Click <Link to="/staff/course">here</Link> to direct you to course page.
              </div>
            </div>
          </div>

          <div className="row">
            <div className="panel">
              <div className="panel-header">
                Enrollment
              </div>
              <div className="panel-content">
                This is where you can add new, modify and delete registered student in the system.
                Click <Link to="/staff/enrollment">here</Link> to direct you to enrollment page.
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Dashboard;