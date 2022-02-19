import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
    modalHeaderWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '5px',
        marginBottom: '0px',
        color: theme.palette.text.secondary,
        margin: '0px',
    },
    warningIcon: {
        fontSize: '2.7rem',
        color: red[ 400 ],
    },
}));

const CustomModal = () => (
    <div />
);

export const WarningModal = (props) => {
    const {
        isOpen, handleClose, handleAgree, isLoading = false,
    } = props;
    const classes = useStyles();
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            onClose={handleClose}
            className={classes.modalHeaderWrapper}
        >
            <DialogContent>
                <DialogContentText>
                    {props.children}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ marginTop: '0px' }}>
                <Button disabled={isLoading} onClick={(e) => { e.stopPropagation(); handleClose(); }} color="primary">
                    Disagree
                </Button>
                <Button disabled={isLoading} onClick={(e) => { e.stopPropagation(); handleAgree(); }} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomModal;
