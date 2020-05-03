import React, {Component} from 'react';
import "./styles.scss";

class Course extends Component {

  render() {

    const { data } = this.props;

    return (
        <div className="course-card" key={data.id}>
          <div className="course-header">
            {data.code} - {data.name}
          </div>
          <div className="course-desc">
            <p>Total Credit: {data.credit}</p>
            <div className="date">
              <p>Start Date: {data.startDate}</p>
              <p>End Date: {data.endDate}</p>
            </div>
          </div>
        </div>
    );
  }
}

export default Course;