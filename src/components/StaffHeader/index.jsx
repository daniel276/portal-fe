import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

class StaffHeader extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">MyUNI</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link"><NavLink to="/staff">Home</NavLink><span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><NavLink to="/staff/course">Course</NavLink></a>
              </li>
              <li className="nav-item">
                <a className="nav-link"><NavLink to="/staff/enrollment">Enrollment</NavLink></a>
              </li>
            </ul>
            <span className="navbar-text">
              Hi, Admin
            </span>
          </div>
        </nav>
    );
  }
}

export default StaffHeader;