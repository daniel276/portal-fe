import React, {Component} from 'react';
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../actions/securityActions";

class StaffHeader extends Component {

  logout = () => {
    this.props.logout();

    window.location.href = "/";

  };

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Admin Page</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/staff">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/staff/course">Course</NavLink>
              </li>
              <li className="nav-item">
               <NavLink className="nav-link" to="/staff/enrollment">Enrollment</NavLink>
              </li>
            </ul>
            <span className="navbar-text" style={{cursor: 'pointer'}} >
              <span onClick={this.logout}>Logout</span>
            </span>
          </div>
        </nav>
    );
  }
}

export default connect(null, { logout })(StaffHeader);