import React, {Component} from 'react';
import { connect } from "react-redux"
import { registerStudent, getAllAccounts, resetPassword } from "../../../actions/securityActions";
import "./styles.scss";

class Enrollment extends Component {

  constructor(){
    super();

    this.state = {
      users: [],
      role: "",
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
      role: this.state.role ? this.state.role === "" : "STUDENT",
      username: this.state.username,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      dob: this.state.dob
    };

    console.log('ok', enroll);

    // this.props.registerStudent(enroll, this.props.history);

  };

  onSubmitResetPassword = id => e => {
    this.props.resetPassword(id);
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    const { users } = nextProps;

    this.setState({
      users
    })
  }

  renderUsers = e => {

    const users = this.state.users;

    return users.map(value => (
        <tr key={value.id}>
          <td>{value.username ? value.username : "-"}</td>
          <td>{value.role ? value.role : "-"}</td>
          <td>{value.firstName ? value.firstName : "-"}</td>
          <td>{value.lastName ? value.lastName : "-"}</td>
          <td>{value.email ? value.email : "-"}</td>
          <td><button className="btn btn-primary" onClick={this.onSubmitResetPassword(value.id)}>Reset Pass</button></td>
        </tr>
    ))

  };

  componentDidMount() {
    this.props.getAllAccounts();
  }


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
                      <label className="col-md-4 control-label">Role</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <select className="custom-select mr-sm-2" name="role" onChange={this.handleChangeForm} value={this.state.role}>
                            <option value={null}>Student</option>
                            <option value="STAFF">Staff</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Email</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <input required name="email" placeholder="Email" onChange={this.handleChangeForm} value={this.state.email} className="form-control" type="email"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Username</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <input required name="username" placeholder="Username" onChange={this.handleChangeForm} value={this.state.username} className="form-control" type="text"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">First Name</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <input required name="firstName" placeholder="First Name" onChange={this.handleChangeForm} value={this.state.firstName} className="form-control" type="text"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Last Name</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <input required name="lastName" placeholder="Last Name" onChange={this.handleChangeForm} value={this.state.lastName} className="form-control" type="text"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Date of Birth</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <input required name="dob" placeholder="Date of Birth" onChange={this.handleChangeForm} value={this.state.dob} className="form-control" type="date"/>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label">Address</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
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
              <div className="box-container user-table">
                <div className="box-header">
                  List of user(s)
                </div>
                <div className="box-content overflow-auto">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">#</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.renderUsers()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.security.users
});

export default connect(mapStateToProps, { registerStudent, getAllAccounts, resetPassword })(Enrollment);