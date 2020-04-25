import React, {Component} from 'react';
import { Link, NavLink } from "react-router-dom";
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
              <a href="/" className="navbar-brand">Profile</a>
              <a className="navbar-brand"><NavLink to="/learning/courses">Courses</NavLink></a>
            </div>
          </nav>

          <div className="menu-bar">
            <div className="title-bar">
              <h3>Student Portal</h3>
            </div>
            <div className="navigation">
              <a><NavLink to="/student/">Dashboard</NavLink></a>
              <a><NavLink to="/student/learning">Learning</NavLink></a>
              <a><NavLink to="/student/account">Account</NavLink></a>
              <a><Link onClick={this.logout}>Log out</Link></a>
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