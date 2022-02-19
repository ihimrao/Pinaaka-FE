import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

const SnackBar = (props) => {
    const {
        visible, setVisible, data, type,
    } = props;
    const handleCloseToast = () => {
        setVisible(!visible);
    };
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={Boolean(data?.status) && visible}
            autoHideDuration={3000}
            onClose={handleCloseToast}
        >
            <Alert onClose={handleCloseToast} elevation={6} variant="filled" severity={type}>
                {data?.status === 401 ? 'Token expired! Please login again.' : (data?.statusText || 'Something went wrong! Please try again later.')}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
