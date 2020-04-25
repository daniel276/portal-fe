import React, {Component} from 'react';
import "./styles.scss";

class Dropdown extends Component {
  render() {
    return (
        <div className="dropdown-bar">
          <div className="bar-header">
            Learning
          </div>
          <div className="bar-option">
            Courses
          </div>
          <div className="bar-option">
            Grades
          </div>
          <div className="bar-option">
            Attendance
          </div>
        </div>
    );
  }
}

export default Dropdown;