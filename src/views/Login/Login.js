import React, { useState, useEffect } from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import images from '../../assets/images/images';
import LoginForm from './LoginForm';
import { getUserData } from '../../redux/states/user/userActions';
import userState from '../../redux/states/user/userSelector';
import Loading from '../Loading/Loading';

/*= ================ Styling Start ========================== */
const useStyles = makeStyles((theme) => ({
    loginWrapper: {
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
    },
    bgWrapperImg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
    },
    leftViewWrapper: {
        width: '50%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [ `@media(max-width: ${ theme.breakpoints.custom.mobile })` ]: {
            display: 'none',
        },
    },
    leftLogoWrapper: {
        width: '500px',
    },
    rightViewWrapper: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        padding: '10%',
        [ `@media(max-width: ${ theme.breakpoints.custom.mobile })` ]: {
            height: 'inherit',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '10%',
            position: 'relative',
        },
    },
    loginHeader: {
        zIndex: 1,
    },
    loadingProgress: {
        position: 'absolute',
        right: 40,
        bottom: 40,
    },
    overViewWrapper: {
        backgroundColor: theme.palette.primaryColor,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.7,
    },
    separatorDiv: {
        zIndex: 1,
        color: 'white',
        margin: '10px 0px',
        width: '100%',
    },
    line: {
        background: 'white',
        height: '1px',
        margin: '0px 10px',
        width: 'inherit',
    },
    loginHeaderText: {
        color: 'white',
        borderRadius: '10px',
        border: '1px solid',
        alignItems: 'center',
        textAlign: 'center',
        padding: '10px',
    },
    belowDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
    },
}));

const ViewWrapper = withStyles(() => ({
    root: {
        height: 'inherit',
    },
}))(Box);

/*= ================ Styling End ========================== */
/*= ================ component ========================== */

const Login = () => {
    const classes = useStyles();
    const [ showSuccessToast, setShowSuccessToast ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const reduxDispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(userState.getUserToken);
    const role = useSelector(userState.getUserRole);
    const loginError = useSelector(userState.getLoginError);

    useEffect(() => {
        if (token) {
            if (role) { history.push('/admins'); } else {
                history.push('/imsarkaar/keys');
            }
        }
        setLoading(false);
        setShowSuccessToast(true);
        if (loginError?.data?.message) {
            setErrorMsg(loginError.data?.message);
        } else {
            setErrorMsg('something went wrong');
        }
    }, [ token, loginError ]);

    const handleLogin = async (values) => {
        setLoading(true);
        reduxDispatch(getUserData(values));
    };

    const handleCloseSuccessToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSuccessToast(false);
    };

    return (
        <div className={classes.loginWrapper}>
            <ViewWrapper className="view-wrapper" display="flex" alignItems="center" justifyContent="space-around">
                <img src={images.loginBg} className={`left-img ${ classes.bgWrapperImg }`} alt="" />
                {/* <div className={classes.leftViewWrapper}>
                    <img src={images.logo_light} className={`left-img ${ classes.leftLogoWrapper }`} alt="" />

                </div> */}
                <div className={classes.rightViewWrapper}>
                    <div className={classes.loginHeader}>
                        <Typography className={classes.loginHeaderText} variant="h5" display="block">
                            <Box display="flex" justifyContent="center" alignItems="center" margin="5px 0px">
                                <MaterialButton>
                                    <img src={images.adminLogo} className="belowDiv" alt="" height="80px" width="80px" />

                                </MaterialButton>
                            </Box>
                            SIGN IN TO TRIDO-ADMIN
                        </Typography>
                    </div>
                    <LoginForm loginError={loginError} handleSubmit={handleLogin} />

                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={Boolean(loginError) && showSuccessToast}
                    autoHideDuration={3000}
                    onClose={handleCloseSuccessToast}
                >
                    <Alert onClose={handleCloseSuccessToast} elevation={6} variant="filled" severity="error">
                        {errorMsg}
                    </Alert>
                </Snackbar>
            </ViewWrapper>
            {loading && (
                <Loading color="white" />
            )}
        </div>
    );
};

export default Login;
