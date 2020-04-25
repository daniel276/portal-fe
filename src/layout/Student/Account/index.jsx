import React, {Component} from 'react';
import "./styles.scss";

class Account extends Component {
  render() {
    return (
        <div className="account-page">
          <div className="row" style={{marginTop:'32px'}}>
            <div className="col-md-4">
              <div className="left-row">
                <div className="profile-picture">
                  ok
              </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row info">
                <div className="header">
                  Account Info
                </div>
                <div className="content">
                  <p>ID: 2020123123</p>
                  <p>Name: Daniel Juanda</p>
                  <p>Program: Computer Science</p>
                  <p>Date of Birth: 20/06/1998</p>
                  <p>Address: 150 Ilkeston Road, Nottingham NG7 3HE</p>
                </div>
              </div>
              <div className="row info" style={{marginTop: '32px'}}>
                <div className="header">
                  Login Info
                </div>
                <div className="content">
                  <p>Registered Email: danieljuanda276@gmail.com</p>
                  <p>Username : psydj3</p>
                  <p>Password: ***********</p>
                </div>
              </div>
              <div className="row info" style={{marginTop: '32px'}}>
                <div className="header">
                  Upload Face Biometric
                </div>
                <div className="content">
                  You have uploaded total of 5 picture of face biometrics
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Account;