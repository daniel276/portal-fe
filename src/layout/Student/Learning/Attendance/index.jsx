import React, {Component} from 'react';
import { connect } from "react-redux";
import { getAttendanceByStudentId } from "../../../../actions/attendanceActions";

class Attendance extends Component {

  constructor(){
    super();

    this.state = {
      security: {}
    }
  }


  componentDidMount() {
    this.props.getAttendanceByStudentId(2);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { security } = nextProps;
    this.setState({
      security
    })
  }

  render() {
    return (
        <div className="attendance-box">
          <div className="jumbotron" style={{paddingTop: '2rem', paddingBottom:'2rem'}}>
            <h1 className="display-4">Attendance</h1>
            <p className="lead">Your attendance log</p>
          </div>
          <div className="attendance-panel">

            {/*<div className="alert alert-primary" role="alert">*/}
            {/*  No record found.*/}
            {/*</div>*/}
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  attendances: state.attendance.attendances,
  security: state.security
});

export default connect(mapStateToProps, { getAttendanceByStudentId })(Attendance);