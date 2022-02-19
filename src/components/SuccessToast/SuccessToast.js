import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

const SuccessToast = (props) => {
    const {
        visible,  message = '', handleClose,
    } = props;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={visible}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} elevation={6} variant="filled" severity="success">
                {message || 'Record Updated Successfully'}
            </Alert>
        </Snackbar>
    );
};

export default SuccessToast;
