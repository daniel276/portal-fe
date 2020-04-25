import React, {Component} from 'react';
import { connect } from "react-redux";
import { login } from "../../actions/securityActions"
import "./styles.scss";

class Login extends Component {

  constructor(){
    super();

    this.state = {
      errors: {}
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();

    const loginRequest = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(loginRequest);

  };

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.security.validToken && nextProps.security.user.role === "STUDENT"){
      this.props.history.push("/student")
    }
    if(nextProps.security.validToken && nextProps.security.user.role === "STAFF"){
      this.props.history.push("/staff")
    }

    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidMount() {
    if(this.props.security.validToken && this.props.security.user.role === "STUDENT"){
      this.props.history.push("/student") // GO TO NEXT PAGE
    }
    if(this.props.security.validToken && this.props.security.user.role === "STUDENT") {
      this.props.history.push("/staff")
    }
  }

  render() {

    const { errors = {} } = this.state;

    return (
        <div className="login-box">
          <div className="login-title">
            <h1 className="display-4 text-center">Student Login</h1>
          </div>
          <div className="login-content mt-3">
            <form className="w-50 ml-auto mr-auto" onSubmit={this.onSubmit}>
              <div className="form-group ">
                <input type="text" className="form-control form-control-lg" placeholder="username" name="username" onChange={this.onChange}/>
              {/*  put errors validation here*/}
              {/*  {errors.username && <div className="text-danger"><small>{errors.username}</small></div>}*/}
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" onChange={this.onChange}/>
                {/*{errors.password && <div className="text-danger"><small>{errors.password}</small></div>}*/}
              </div>
              <input type="submit" className="btn btn-primary btn-lg btn-block mt-4"/>
            </form>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(mapStateToProps, { login })(Login);