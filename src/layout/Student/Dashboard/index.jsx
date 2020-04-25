import React, {Component} from 'react';
import { connect } from "react-redux";
import "./styles.scss";
import CoursesList from "./CoursesList";

class Dashboard extends Component {

render() {

  const { security } = this.props;
  const { user } = security;

  return (
        <div className="student-dashboard container">
          <div className="row" style={{marginTop: '16px'}}>
            <div className="col-md-4">
              <div className="info-box">
                <div className="box-header">
                  Profile
                </div>
                <div className="box-content">
                  <span className="name">{user.firstName} {user.lastName}</span>
                  <p>Program: Computer Science </p>
                  <p>Student ID: 2001586262 </p>
                  <p>Birthdate: {user.dob}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-box">
                <div className="box-header">
                  Courses
                </div>
                <div className="box-content">
                  <CoursesList/>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-box">
                <div className="box-header">
                  Attendance
                </div>
                <div className="box-content">
                  Attendance for living
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(Dashboard);