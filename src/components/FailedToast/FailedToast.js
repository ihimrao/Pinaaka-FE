import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

const FailedToast = (props) => {
    const {
        visible,  message, handleClose,
    } = props;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={visible}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} elevation={6} variant="filled" severity="error">
                {message || 'Something error occured'}
            </Alert>
        </Snackbar>
    );
};

export default FailedToast;
