import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    noPropertySelectTextWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '12px',
        height: '100%',
        justifyContent: 'center',
    },
}));

const NoPropertySelectWrapper = () => {
    const classes = useStyles();
    return (
        <div className={classes.noPropertySelectTextWrapper}>
            <Typography variant="body1" className={classes.editFieldHeading}>No Field Selected</Typography>
            <Typography variant="body1">Click on a Field to edit its properties</Typography>
        </div>
    );
};

export default NoPropertySelectWrapper;
