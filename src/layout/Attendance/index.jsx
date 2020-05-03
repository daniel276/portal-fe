import React, {Component} from 'react';
// import moment from "moment";
import { connect } from "react-redux";
import { getModulesByUsername, getClasses } from "../../actions/moduleActions";
import { recordAttendance } from "../../actions/attendanceActions";
import "./styles.scss";
import moment from "moment";

class Attendance extends Component {

  constructor(){
    super();

    this.state = {
      studentModules: [],
      classes: [],
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
    const { id } = this.props.match.params;
    this.props.getModulesByUsername(id);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onSubmitAttendance = (class_id) => e => {
    const { id } = this.props.match.params;
    this.props.recordAttendance(id, class_id, this.props.history);
  };

  checkDate = getDate => {
    return moment(getDate).isSameOrAfter(moment().format("YYYY-MM-DD HH:mm"))
  };

  render() {

    const { studentModules = [] } = this.props;

    const { id } = this.props.match.params;

    return (
        <div className="attendance container">
          <div className="col-md-6 ml-auto mr-auto">
            <div className="header p-3">
              <h3 className="display-4">Attendance</h3>
            </div>
            <div className="row text-center">
              <p className="text-center">Hi, {id}</p>
              <p>Please confirm your attendance by clicking the appropriate course of yours below.</p>
              <p className="mt-2">Current Date: {new Date().toDateString()} {this.state.date.toLocaleTimeString()}</p>
            <div className="row w-100">
              {studentModules.length > 0 ? studentModules.map(value => (
                  <div className="course-panel" key={value.id}>
                    <div className="header-panel">
                      {value.module.code} - {value.module.name}
                    </div>
                    {value.module.classList.length > 0 && value.module.classList.map(value => (
                      <div className="classes-panel" key={value.id} onClick={this.onSubmitAttendance(value.id)}>
                        <table className="table table-hover">
                          <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">#</th>
                          </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{value.name}</td>
                              <td>{value.location}</td>
                              <td>{value.startTime}</td>
                              <td>{value.endTime}</td>
                              <td><button disabled={this.checkDate(value.startTime)} className="btn btn-outline-success">Confirm</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )) }
                  </div>
              )) :
                  <div className="alert alert-primary w-100 mt-lg-4" role="alert">
                    No Running classes. Click<a href="http://localhost:8080" className="alert-link"> here</a> to return.
                  </div>
              }
            </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  studentModules: state.module.studentModules,
  classes: state.module.classes
});

export default connect(mapStateToProps , { getModulesByUsername, recordAttendance, getClasses })(Attendance);