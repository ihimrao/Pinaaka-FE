import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '100px',
    },
});

const ManagementTokenContainer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h3>You do not have adequate permissions to view management tokens.</h3>
            <h3>Contact stack administrator for more details.</h3>
        </div>
    );
};

export default ManagementTokenContainer;
