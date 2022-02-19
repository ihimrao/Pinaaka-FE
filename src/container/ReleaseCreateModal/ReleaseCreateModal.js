import React from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import DialogActions  from '@material-ui/core/DialogActions';
import Button  from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextFieldWithLabel from '../../components/FormFields/TextFieldWithLabel';

const useStyles = makeStyles(() => ({
    modalTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    radioLabelWrapper: {
        margin: '10px 0px',
    },
    spaceWrapper: {
        marginBottom: '20px',
    },
}));

const ReleaseCreateModal = (props) => {
    const classes = useStyles();
    const { handleClose = () => {}, open } = props;
    return (
        <Dialog fullWidth maxWidth="md" className={classes.root} onClose={handleClose} open={open}>
            <DialogTitle onClose={handleClose}>
                <div className={classes.modalTitleWrapper}>
                    Create New Releases
                    <Button autoFocus onClick={handleClose} color="inherit">
                        Close
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Grid className={classes.spaceWrapper} container spacing={2}>
                    <Grid item xs={12}>
                        <TextFieldWithLabel
                            variant="outlined"
                            value=""
                            // onChange={handleChange}
                            name="releaseName"
                            type="text"
                            is_required={1}
                            label="Release Name"
                            placeholder="Enter Release Name"
                        />
                    </Grid>
                </Grid>
                <Grid className={classes.spaceWrapper} container spacing={2}>
                    <Grid item xs={12}>
                        <TextFieldWithLabel
                            variant="outlined"
                            value=""
                            // onChange={handleChange}
                            name="releaseDescription"
                            type="text"
                            is_required={1}
                            label="Release Description"
                            placeholder="Enter Release Description"
                            multiline
                            rows={5}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="inherit">
                    Close
                </Button>
                <Button autoFocus onClick={handleClose} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReleaseCreateModal;
