import React, {Component} from 'react';
import "./styles.scss";

class Success extends Component {

  render() {

    return (
        <div className="status-page">
          <div className="box">
            <h3 style={{color: 'green'}}>Attendance Successfully Taken</h3>
            <button className="btn btn-outline-dark btn-block mt-3"><a href="http://localhost">Back to Device</a></button>
          </div>
        </div>
    );
  }
}

export default Success;