import React, {Component} from 'react';
import { connect } from "react-redux";
import Login from "../../components/Login";

class Landing extends Component {

  componentDidMount() {
    const isStaff = this.props.security.user.role === "STAFF";
    const isAuth = this.props.security.validToken;

    if(isAuth && isStaff){
      this.props.history.push("/staff")
    }
    if(isAuth){
      this.props.history.push("/student")
    }
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Login {...this.props}/>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(Landing);