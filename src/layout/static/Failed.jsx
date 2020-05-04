import React, {Component} from 'react';
import "./styles.scss";

class Failed extends Component {
  render() {

    return (
        <div className="status-page">
          <div className="box">
            <h2 style={{color: 'red'}}>Failed to record</h2>
            <p className="text-center">Please retry</p>
            <button className="btn btn-outline-dark btn-block mt-3">Back to Device</button>
          </div>
        </div>
    );
  }
}

export default Failed;