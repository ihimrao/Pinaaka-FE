import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    noWidgetText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '12px',
        height: '100%',
        justifyContent: 'center',
    },
}));

const NoWidgetTextWrapper = () => {
    const classes = useStyles();
    return (
        <div className={classes.noWidgetText}>
            <Typography variant="body1">Add more fields</Typography>
            <Typography variant="body1">Drag and drop fields from the list on the left</Typography>
        </div>
    );
};

export default NoWidgetTextWrapper;
