import React from 'react';
import Dialog  from '@material-ui/core/Dialog';
import { makeStyles }  from '@material-ui/core/styles';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import SingleUpload from '../../components/Upload/SingleUpload';

const useStyles = makeStyles(() => ({
    dialogContentWrapper: {
        paddingTop: '5px',
    },
}));

const ContentUploadModal = (props) => {
    const {
        handleClose = () => {}, open, uploadFiles, handleChangeUpload,
    } = props;
    const classes  = useStyles();
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Upload new assets</DialogTitle>
            <DialogContent className={classes.dialogContentWrapper}>
                <SingleUpload value={uploadFiles} onChange={handleChangeUpload} />
            </DialogContent>
        </Dialog>
    );
};

export default ContentUploadModal;
