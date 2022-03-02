import React from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import DialogActions  from '@material-ui/core/DialogActions';
import Button  from '@material-ui/core/Button';
import Typography  from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import TextFieldWithLabel from '../../components/FormFields/TextFieldWithLabel';
import userSelectors from '../../redux/states/user/userSelector';
import { createOrganizationData } from '../../redux/states/project/projectActions';

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

const OrganisationCreateModal = (props) => {
    const classes = useStyles();
    const {
        handleClose = () => {}, open, setModalData, setShowSuccessToast, refresh, setRefresh,
    } = props;
    const accessToken = useSelector(userSelectors.getUserToken);

    return (
        <Dialog fullWidth maxWidth="md" className={classes.root} onClose={handleClose} open={open}>
            <DialogTitle onClose={handleClose}>
                <div className={classes.modalTitleWrapper}>
                    Create New Admin
                    <Button autoFocus onClick={handleClose} color="inherit">
                        Close
                    </Button>
                </div>
            </DialogTitle>
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    firstname: '',
                    lastname: '',
                    password: '',
                    admin: 'subadmin',
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'required';
                    }
                    if (!values.password) {
                        errors.password = 'required';
                    }
                    if (!values.firstname) {
                        errors.firstname = 'required';
                    }
                    if (!values.lastname) {
                        errors.lastname = 'required';
                    }
                    if (!values.email) {
                        errors.email = 'required';
                    }
                    return errors;
                }}
                onSubmit={async (values) => {
                    const data = values;
                    // if (uploadFiles) {
                    //     const imageFile = await uploadImages.uploadImages(uploadFiles);
                    //     data.icon = `https:${ imageFile.url }`;
                    // }
                    console.log('..>>', values);
                    const response = await createOrganizationData(data, accessToken);
                    setModalData(true);
                    if (response.request.status === 200) {
                        handleClose();
                        setRefresh(!refresh);
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
                    isSubmitting,
                }) => (
                    <>
                        <DialogContent dividers>

                            <Grid className={classes.spaceWrapper} container spacing={2}>
                                <Grid item xs={12}>
                                    <TextFieldWithLabel
                                        variant="outlined"
                                        value={values.email}
                                        onChange={handleChange}
                                        name="email"
                                        type="text"
                                        is_required={1}
                                        label="Enter email"
                                        placeholder="Enter Email Here"
                                        onBlur={handleBlur}
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email ? 'Required' : ''}
                                    />
                                </Grid>
                            </Grid>

                            <Grid className={classes.spaceWrapper} container spacing={2}>
                                <Grid item xs={6}>
                                    <TextFieldWithLabel
                                        variant="outlined"
                                        value={values.username}
                                        onChange={handleChange}
                                        name="username"
                                        autoComplete="off"
                                        type="text"
                                        is_required={1}
                                        label="Enter Username"
                                        placeholder="Enter Username"
                                        error={errors.username}
                                        helperText={errors.username ? 'Name Should Be Atleast 3-60 Length' : ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextFieldWithLabel
                                        variant="outlined"
                                        value={values.password}
                                        onChange={handleChange}
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        is_required={1}
                                        label="Enter Password"
                                        placeholder="Enter Password"
                                        error={errors.password}
                                        helperText={errors.password ? 'Name Should Be Atleast 3-60 Length' : ''}
                                    />
                                </Grid>
                            </Grid>

                            <Grid className={classes.spaceWrapper} container spacing={2}>
                                <Grid item xs={6}>
                                    <TextFieldWithLabel
                                        variant="outlined"
                                        value={values.firstname}
                                        onChange={handleChange}
                                        name="firstname"
                                        type="text"
                                        is_required={1}
                                        label="Enter Firstname"
                                        placeholder="Enter Firstname"
                                        error={errors.firstname}
                                        helperText={errors.firstname ? 'Name Should Be Atleast 3-60 Length' : ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextFieldWithLabel
                                        variant="outlined"
                                        value={values.lastname}
                                        onChange={handleChange}
                                        name="lastname"
                                        type="text"
                                        is_required={1}
                                        label="Enter Lastname"
                                        placeholder="Enter Lastname"
                                        error={errors.lastname}
                                        helperText={errors.lastname ? 'Name Should Be Atleast 3-60 Length' : ''}
                                    />
                                </Grid>
                            </Grid>

                            <RadioGroup
                                onChange={handleChange}
                                className={classes.spaceWrapper}
                                name="admin"
                                value={values.admin}
                            >
                                <FormControlLabel
                                    value="superadmin"
                                    control={<Radio />}
                                    label={(
                                        <div className={classes.radioLabelWrapper}>
                                            <Typography variant="body1">
                                                Super Admin
                                            </Typography>
                                            <Typography variant="caption">
                                                (Let&apos;s you create a new superadmin)
                                            </Typography>
                                        </div>
                                    )}
                                />
                                <FormControlLabel
                                    value="subadmin"
                                    control={<Radio />}
                                    label={(
                                        <div className={classes.radioLabelWrapper}>
                                            <Typography variant="body1">
                                                Sub Admin
                                            </Typography>
                                            <Typography variant="caption">
                                                (Let&apos;s you create a new subadmin)
                                            </Typography>
                                        </div>
                                    )}
                                />
                            </RadioGroup>

                        </DialogContent>

                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="inherit">
                                Close
                            </Button>
                            <Button onClick={handleSubmit} disabled={isSubmitting} autoFocus color="primary">
                                Save changes
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Formik>
        </Dialog>
    );
};

export default OrganisationCreateModal;
