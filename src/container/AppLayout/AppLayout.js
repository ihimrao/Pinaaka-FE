import {  makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getApplicationFlags } from '../../redux/states/flag/flagActions';

const useStyles = makeStyles((theme) => ({
    layoutWrapper: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
}));

const AppLayout = (props) => {
    const classes = useStyles();

    const reduxDispatch = useDispatch();

    useEffect(() => {
        reduxDispatch(getApplicationFlags());
    }, []);

    return (
        <div className={`layout-wrapper ${  classes.layoutWrapper }`}>
            {props.children}
        </div>
    );
};

export default AppLayout;
