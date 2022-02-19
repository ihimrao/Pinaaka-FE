import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userState from '../redux/states/user/userSelector';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(userState.getUserToken);
    const handleCheckPrivate = () => (!!token);
    return (
        <Route
            {...rest}
            render={(props) => (handleCheckPrivate() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location },
                    }}
                />
            ))}
        />
    );
};

export default PrivateRoute;
