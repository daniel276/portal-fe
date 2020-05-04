import React, {Component} from 'react';
import StaffHeader from "../../components/StaffHeader";
import "./styles.scss";
import { Route } from "react-router-dom";
import CoursePage from "./Course";
import Dashboard from "./Dashboard";
import Enrollment from "./Enrolment";
import CourseDetail from "./Course/CourseDetail";

class StaffDashboard extends Component {
  render() {
    return (
        <div className="staff-page">
          <StaffHeader/>
          <div className="container content">
           <Route exact path="/staff" component={Dashboard}/>
           <Route exact path="/staff/course" component={CoursePage}/>
           <Route exact path="/staff/enrollment" component={Enrollment}/>
           <Route exact path="/staff/course/:id" component={CourseDetail}/>
          </div>
        </div>
    );
  }
}

export default StaffDashboard;