import React, {Component} from 'react';
import "./styles.scss";

class CoursesList extends Component {

  courses = [{
    id: 1,
    code: "COMP3003",
    name: "COMPUTER SECURITY",
    startDate: "20/06/2020",
    endDate: "20/07/2020"
  }];

  render() {
    return (
        <div className="courses-list">
          <div className="course">
            <div className="course-title">
              COMP6038 - Computer Security
            </div>
            <div className="course-desc text-muted">
              6 June 2020
            </div>
          </div>

          <div className="course">
            <div className="course-title">
              COMP3030 - Games
            </div>
            <div className="course-desc text-muted">
              20 June 2020
            </div>
          </div>

        </div>
    );
  }
}

export default CoursesList;