import React, {Component} from 'react';
import { Route } from "react-router-dom";
import Header from "../Header";
import Learning from "../LearningPage";
import Dashboard from "../Dashboard";
import Account from "../Account";
import "./styles.scss";

class StudentPage extends Component {
  render() {
    return (
          <div className="student-page" style={{backgroundColor: '#E5E5E5'}}>
            <Header/>
            <div className="content-page">
              <Route exact path="/student" component={Dashboard}/>
              <Route path="/student/learning" component={Learning}/>
              <Route path="/student/account" component={Account}/>
            </div>
          </div>
    );
  }
}

export default StudentPage;