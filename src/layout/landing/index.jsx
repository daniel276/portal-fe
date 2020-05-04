import React, {Component} from 'react';
import { connect } from "react-redux";
import Login from "../../components/Login";

class Landing extends Component {

  componentDidMount() {

    if(this.props.security.user.role === "STAFF"){
      this.props.history.push("/staff")
    }
    if(this.props.security.user.role === "STUDENT"){
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

const mapStateToProps = state => ({ // select some data from the store and map into this component props
  security: state.security // get security data from the store and map into this component state
});

export default connect(mapStateToProps)(Landing);