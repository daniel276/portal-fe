import React, {Component} from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { getAccount } from "../../../actions/securityActions";
import { getModulesByStudentId } from "../../../actions/moduleActions";
import DEFAULT_PICTURE from "../../../assets/user.jpeg"
import "./styles.scss";

class Dashboard extends Component {

  constructor(){
    super();

    this.state = {
      studentModules: [],
    }
  }

  componentDidMount() {
    this.props.getAccount(this.props.security.user.id); // keep user data updated
    this.props.getModulesByStudentId(this.props.security.user.id);
  }

  directToCoursePage = e => {
    this.props.history.push("/student/learning/course");
  };

  render() {

  const { security = {}, studentModules = {} } = this.props;
  const { user = {} } = security;

  return (
        <div className="student-dashboard container">
          <div className="row">
            <div className="jumbotron w-100">
              <h1 className="display-4">Student Portal</h1>
              <hr/>
              <p className="lead">Welcome to Student portal, manage your courses here</p>
            </div>
          </div>
          <div className="row" >
            <div className="col-md-6">
              <div className="info-box">
                <div className="box-header">
                  Profile
                </div>
                <div className="box-content">
                  <div className="image-block">
                    <img src={user.profile_picture ? user.profile_picture : DEFAULT_PICTURE} className="img-thumbnail mt-1" alt="img" width="150px" height="150px"/>
                  </div>
                  <span className="name">{user.firstName} {user.lastName}</span>
                  <p>Student ID: {user.id} </p>
                  <p>Birth date: {moment(user.dob).format("DD MMMM YYYY")}</p>
                </div>
              </div>
            </div>

              <div className="col-md-6">
                <div className="info-box">
                  <div className="box-header">
                    Courses
                  </div>
                  <div className="box-content">
                    <div className="courses-list">
                      {studentModules.length > 0 ? studentModules.map(value => (
                          <div className="course" key={value.id} onClick={this.directToCoursePage}>
                            <div className="course-title">
                              {value.module.code} - {value.module.name}
                            </div>
                            <div className="course-desc text-muted">
                              Total Credit {value.module.credit}
                            </div>
                          </div>
                      )) : (
                          <p className="text-center">No Enrolled Module(s)</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </div>


        </div>
    );
  }
}

const mapStateToProps = state => ({
  studentModules: state.module.studentModules,
  security: state.security
});

export default connect(mapStateToProps, { getAccount, getModulesByStudentId })(Dashboard);