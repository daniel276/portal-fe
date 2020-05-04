import React, {Component} from 'react';
import "./styles.scss";
import { connect } from "react-redux";
import { getAttendanceByStudentId } from "../../../../actions/attendanceActions";
import { Collapse } from "reactstrap";
import moment from "moment";

class Attendance extends Component {

  constructor(){
    super();

    this.state = {
      security: {},
      activeIdx: null,
      attendances: []
    }
  }


  componentDidMount() {
    const {id} = this.props.security.user;
    this.props.getAttendanceByStudentId(id);
  }

  handleOpenToggle = id => e => {
    this.setState(prevState => ({
      activeIdx: id
    }))
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { security } = nextProps;
    this.setState({
      security
    })
  }

  render() {

    const { attendances } = this.props;

    return (
        <div className="attendance-page">
          <div className="jumbotron" style={{paddingTop: '2rem', paddingBottom:'2rem'}}>
            <h1 className="display-4">Attendance</h1>
            <p className="lead">Your attendance log</p>
          </div>


            {attendances ? attendances.map(value => (
                <React.Fragment>
                  <div className="attendance-panel">
                    <div className="attendance-header" key={value.id}>
                      <p>{value.aClass.name} {value.aClass.location} - {moment(value.aClass.startTime).format("DD MMM YYYY")}</p>
                      <button className="btn btn-outline-primary" onClick={this.handleOpenToggle(value.id)}>View</button>
                    </div>
                    <Collapse isOpen={this.state.activeIdx === value.id}>
                      <div className="attendance-content">
                        <p>Date/Time: {value.aClass.startTime} / {value.aClass.endTime}</p>
                        <p>Location: {value.aClass.location}</p>
                        <p>Record Time: {moment(value.recordTime).format("DD MMM YYYY")}</p>
                        <p>Present : {value.present ? "Y" : "-"}</p>
                      </div>
                    </Collapse>
                  </div>
                </React.Fragment>
            )) :
                <div className="alert alert-primary" role="alert">
                  No record found.
                </div>
            }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  attendances: state.attendance.attendances,
  security: state.security
});

export default connect(mapStateToProps, { getAttendanceByStudentId })(Attendance);