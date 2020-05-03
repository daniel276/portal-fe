import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { connect } from "react-redux";
import { logout } from "../../../actions/securityActions";

class Header extends Component {

  logout = () => {
    this.props.logout();

    window.location.href = "/";

  };

  render() {

    const { security } = this.props;

    const { user } = security;

    return (
        <div className="header">
          <nav className="nav navbar-expand-md navbar-dark bg-dark">
            <div className="left">
              <a href="/" className="navbar-brand">{user.firstName} {user.lastName} | {user.id}</a>
            </div>
            <div className="right">
              <NavLink to="/student/account" className="navbar-brand">Profile</NavLink>
              <NavLink className="navbar-brand" to="/student/learning/course">Courses</NavLink>
            </div>
          </nav>

          <div className="menu-bar">
            <div className="title-bar">
              <h3>Student Portal</h3>
            </div>
            <div className="navigation">
              <NavLink className="nav-link" to="/student/">Dashboard</NavLink>
              <NavLink className="nav-link" to="/student/learning">Learning</NavLink>
              <NavLink className="nav-link" to="/student/account">Account</NavLink>
              <NavLink className="nav-link" to="/" onClick={this.logout}>Log out</NavLink>
            </div>
          </div>

        </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps, { logout })(Header);