import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const SecuredRoute = ({component: Component, security, ...otherProps}) => (
    <Route {...otherProps} render={props => (security.validToken === true && security.user.role === "STUDENT") ? (<Component {...props}/>)
        :
        (<Redirect to="/"/>)}
    />
);


const mapStateToProps = state => ({
  security: state.security
});

export default withRouter(connect(mapStateToProps)(SecuredRoute));