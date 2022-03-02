import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
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
            style={{ border: '1px solid gray' }}
            open={isOpen}
            onClose={handleClose}
            className={classes.modalHeaderWrapper}
        >
            <DialogTitle>
                {props?.title || 'Title'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.children}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ marginTop: '0px' }}>
                <Button disabled={isLoading} style={{ background: '#09112c', color: 'white' }} onClick={(e) => { e.stopPropagation(); handleClose(); }} color="primary">
                    Disagree
                </Button>
                <Button disabled={isLoading} style={{ background: 'red', color: 'black' }} onClick={(e) => { e.stopPropagation(); handleAgree(); }} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomModal;
