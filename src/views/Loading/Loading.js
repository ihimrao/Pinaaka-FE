import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles((theme) => ({
    loaderWrapper: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.text.primary,
    },
}));

const Loading = (colorWhite) => {
    const classes = useStyle();
    return (
        <div className={classes.loaderWrapper}>
            <Backdrop style={colorWhite} className={classes.backdrop} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Loading;
