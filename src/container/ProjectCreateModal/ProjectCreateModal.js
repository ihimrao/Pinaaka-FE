import React, { useState, useEffect } from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import Typography  from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogActions  from '@material-ui/core/DialogActions';
import Button  from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import TextFieldWithLabel from '../../components/FormFields/TextFieldWithLabel';
import userSelectors from '../../redux/states/user/userSelector';
import { createProjectData } from '../../redux/states/project/projectActions';
import { getUserinfo } from '../../redux/states/user/userInfoAction';

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
    spaceWrapperDay: {

        display: 'flex',
        flexDirection: 'row',
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
    const { globalDetails } = useSelector(({
        user,
    }) => ({
        globalDetails: user.globalInfoState,
    }));

    const reduxDispatch = useDispatch();
    const userToken = useSelector(userSelectors.getUserToken);

    const { adminInfo } = useSelector((state) => state.user.userInfoState);
    const [ submitAbled, setSubmitAbled ] = useState(true);
    const [ showSuccessToast, setShowSuccessToast ] = useState({ show: false, msg: '', success: true });
    const {
        handleClose = () => {}, open, setModalData, orgId,
    } = props;

    useEffect(() => {
        reduxDispatch(getUserinfo(userToken));
    }, [  ]);
    const accessToken = useSelector(userSelectors.getUserToken);
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

        setShowSuccessToast({ show: false });
    };

    return (
        <>
            <Dialog fullWidth maxWidth="md" className={classes.root} onClose={handleClose} open={open}>
                <DialogTitle onClose={handleClose}>
                    <div className={classes.modalTitleWrapper}>
                        Create New Key - Wallet Balance : { adminInfo?.wallet || 0 }
                        <Button autoFocus onClick={handleClose} color="inherit">
                            Close
                        </Button>
                    </div>
                </DialogTitle>
                <Formik
                    initialValues={{
                        keys: changeKey() || '',
                        password: changePassword() || '',
                        days: '7',
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.keys) {
                            errors.keys = 'required';
                        }
                        if (!values.password) {
                            errors.password = 'required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values) => {
                        setSubmitAbled(false);
                        const response = await createProjectData(accessToken, values, orgId);
                        setModalData(true);
                        setSubmitAbled(true);
                        if (response.status === 200) {
                            console.log(response);
                            handleClose();
                            if (response?.data.generated) {
                                setShowSuccessToast({ show: true, msg: `Key ${ response.data.KEY } Generated`, success: true });
                            } else {
                                setShowSuccessToast({ show: true, msg: ` ${ response.data.msg }`, success: false });
                            }
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
                                            value={values.password}
                                            onChange={handleChange}
                                            name="password"
                                            type="text"
                                            is_required={1}
                                            label=" Password"
                                            placeholder="Enter password"
                                            rows={1}
                                            onBlur={handleBlur}
                                            error={errors.password && touched.password}
                                            helperText={errors.password && touched.password ? 'Required' : ''}
                                        />
                                    </Grid>
                                </Grid>

                                <RadioGroup
                                    onChange={handleChange}
                                    className={classes.spaceWrapper}
                                    name="days"
                                    value={values.days}
                                >
                                    <div className={classes.spaceWrapperDay}>
                                        <FormControlLabel
                                            value="7"
                                            control={<Radio />}
                                            label={(
                                                <div className={classes.radioLabelWrapper}>
                                                    <Typography variant="body1">
                                                        7 Day
                                                    </Typography>
                                                    <Typography variant="caption">

                                                        (Price - {globalDetails?.keyPrice?.price?.seven})
                                                    </Typography>
                                                </div>
                                            )}
                                        />
                                        <FormControlLabel
                                            value="30"
                                            control={<Radio />}
                                            label={(
                                                <div className={classes.radioLabelWrapper}>
                                                    <Typography variant="body1">
                                                        30 Days
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        (Price - {globalDetails?.keyPrice?.price?.thirty})
                                                    </Typography>
                                                </div>
                                            )}
                                        />
                                        <FormControlLabel
                                            value="60"
                                            control={<Radio />}
                                            label={(
                                                <div className={classes.radioLabelWrapper}>
                                                    <Typography variant="body1">
                                                        60 Days
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        (Price - {globalDetails?.keyPrice?.price?.sixty })
                                                    </Typography>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </RadioGroup>
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
                open={showSuccessToast?.show}
                autoHideDuration={3000}
                onClose={handleCloseSuccessToast}
            >
                <Alert onClose={handleCloseSuccessToast} elevation={6} variant="filled" severity={showSuccessToast?.success ? 'success' : 'error'}>
                    {showSuccessToast.msg}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProjectCreateModal;
