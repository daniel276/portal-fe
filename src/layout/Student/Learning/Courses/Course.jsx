import React, {Component} from 'react';

class Course extends Component {
  render() {

    const { course } = this.props;

    return (
        <div className="course-card">
          <div className="course-title">
            COMP3008 - Intro To Programming
          </div>
          <div className="content">
            Testing 123
          </div>
        </div>
    );
  }
}

export default Course;