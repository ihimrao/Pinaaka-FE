import React, { useState } from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import DialogActions  from '@material-ui/core/DialogActions';
import Button  from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import TextFieldWithLabel from '../../components/FormFields/TextFieldWithLabel';
import userSelectors from '../../redux/states/user/userSelector';
import { createProjectData } from '../../redux/states/project/projectActions';

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
    labelWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    dialogContentWrapper: {
        padding: '5px 0px 0px 0px',
    },
}));

const ProjectCreateModal = (props) => {
    const classes = useStyles();
    const [ submitAbled, setSubmitAbled ] = useState(true);
    const [ showSuccessToast, setShowSuccessToast ] = useState(false);
    const {
        handleClose = () => {}, open, setModalData, orgId,
    } = props;
    const accessToken = useSelector(userSelectors.getUserToken);
    const wallet = 100;
    let RandomKey = '';
    let RandPassword = '';

    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    const changeKey = () =>  {
        for (let i = 0; i < 10; i += 1) {
            RandomKey += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return RandomKey;
    };

    const changePassword = () =>  {
        for (let i = 0; i < 6; i += 1) {
            RandPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return RandPassword;
    };

    const handleCloseSuccessToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSuccessToast(false);
    };

    return (
        <>
            <Dialog fullWidth maxWidth="md" className={classes.root} onClose={handleClose} open={open}>
                <DialogTitle onClose={handleClose}>
                    <div className={classes.modalTitleWrapper}>
                        Create New Key - Wallet Balance : { wallet }
                        <Button autoFocus onClick={handleClose} color="inherit">
                            Close
                        </Button>
                    </div>
                </DialogTitle>
                <Formik
                    initialValues={{
                        keys: changeKey() || '',
                        description: changePassword() || '',
                        icon: '',
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.keys) {
                            errors.keys = 'required';
                        }
                        if (!values.description) {
                            errors.description = 'required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values) => {
                        setSubmitAbled(false);
                        const response = await createProjectData(accessToken, values, orgId);
                        setModalData(true);
                        setSubmitAbled(true);
                        if (response.status === 200) {
                            handleClose();
                            setShowSuccessToast(true);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                    }) => (
                        <>
                            <DialogContent dividers>

                                <Grid className={classes.spaceWrapper} container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextFieldWithLabel
                                            variant="outlined"
                                            value={values.keys}
                                            onChange={handleChange}
                                            name="keys"
                                            type="text"
                                            is_required={1}
                                            label="Enter keys"
                                            placeholder="Enter Release keys"
                                            onBlur={handleBlur}
                                            error={errors.keys && touched.keys}
                                            helperText={errors.keys && touched.keys ? 'Required' : ''}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextFieldWithLabel
                                            variant="outlined"
                                            value={values.description}
                                            onChange={handleChange}
                                            name="description"
                                            type="text"
                                            is_required={1}
                                            label=" Password"
                                            placeholder="Enter Description"
                                            rows={1}
                                            onBlur={handleBlur}
                                            error={errors.description && touched.description}
                                            helperText={errors.description && touched.description ? 'Required' : ''}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid className={classes.spaceWrapper} container spacing={2}>
                                    <Grid item xs={6} />
                                    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                                    <Select
                                        native
                                        value="10"
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={10}>Ten</option>
                                        <option value={20}>Twenty</option>
                                        <option value={30}>Thirty</option>
                                    </Select>
                                </Grid>
                            </DialogContent>

                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="inherit">
                                    Close
                                </Button>
                                <Button onClick={handleSubmit} autoFocus color="primary" disabled={!submitAbled}>
                                    Generate
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Formik>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={showSuccessToast}
                autoHideDuration={3000}
                onClose={handleCloseSuccessToast}
            >
                <Alert onClose={handleCloseSuccessToast} elevation={6} variant="filled" severity="success">
                    Project Added Successfully
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProjectCreateModal;
