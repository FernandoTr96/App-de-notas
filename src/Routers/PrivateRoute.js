import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route {...rest} component={(props) => (
            isAuth ? <Component {...props} /> : <Redirect to='/auth/login' />
        )} />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired
}
