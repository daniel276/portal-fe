import React, {Component} from 'react';
import { connect } from "react-redux"
import { registerStudent } from "../../../actions/securityActions";
import "./styles.scss";

class Enrollment extends Component {

  constructor(){
    super();

    this.state = {
      username: "",
      email: "",
      dob: "",
      firstName: "",
      lastName: "",
      address: ""
    }
  }

  handleChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();

    const enroll = {
      username: this.state.username,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      dob: this.state.dob
    };

    this.props.registerStudent(enroll, this.props.history);

  };

  // UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
  //
  // }


  render() {
    return (
        <div className="enrollment-page">
          <div className="row" style={{marginTop: '32px'}}>
            <div className="col-md-6">
              <div className="box-container">
                <div className="box-header">
                  Register new user
                </div>
                <div className="container box-content">
                  <form onSubmit={this.onSubmit} className="well form-horizontal">

                    <div className="form-group">
                      <label className="col-md-4 control-label">Email</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                          <input name="email" placeholder="Email" onChange={this.handleChangeForm} value={this.state.email} className="form-control" type="email"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Username</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                          <input name="username" placeholder="Username" onChange={this.handleChangeForm} value={this.state.username} className="form-control" type="text"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">First Name</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                          <input name="firstName" placeholder="First Name" onChange={this.handleChangeForm} value={this.state.firstName} className="form-control" type="text"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Last Name</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                          <input name="lastName" placeholder="Last Name" onChange={this.handleChangeForm} value={this.state.lastName} className="form-control" type="text"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Date of Birth</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                          <input name="dob" placeholder="Date of Birth" onChange={this.handleChangeForm} value={this.state.dob} className="form-control" type="date"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Address</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                          <textarea name="address" placeholder="Address" onChange={this.handleChangeForm} value={this.state.address} className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary m-auto">Register</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box-container">
                <div className="box-header">
                  List of student(s)
                </div>
                <div className="box-content">
                  Ok oce
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(null, { registerStudent })(Enrollment);