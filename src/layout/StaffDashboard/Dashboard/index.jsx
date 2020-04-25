import React, {Component} from 'react';
import "./styles.scss";

class Dashboard extends Component {
  render() {
    return (
        <div className="staff-dashboard">
          <div className="row" style={{marginTop: '32px'}}>
            <div className="jumbotron w-100">
              hi
            </div>
          </div>
          <div className="row">
            <div className="panel">
              <div className="panel-header">
                Courses
              </div>
              <div className="panel-content">
                Ths is
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
                Clicking here, will redirect you to enrollment page.
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Dashboard;