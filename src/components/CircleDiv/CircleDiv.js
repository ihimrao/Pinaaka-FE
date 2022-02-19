import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyle = makeStyles((theme) => ({
    divWrapper: {
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
}));

const CircleDiv = (props) => {
    const classes = useStyle();
    return (
        <div className={clsx(classes.divWrapper, props.className)}>
            {props.children}
        </div>
    );
};

export default CircleDiv;
