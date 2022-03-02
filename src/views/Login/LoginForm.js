import Box from '@material-ui/core/Box';
import { withStyles, makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import TextField from '../../components/FormFields/TextField';

const LoginButton = withStyles(() => ({
    root: {
        background: '#09112c',
        color: '#FFFFFF',
    },
}))(Button);
const useStyles = makeStyles((theme) => ({
    textField: {
        '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
            '-webkit-box-shadow': `0 0 0 30px ${ theme.palette.loginInputBg } inset !important`,
        },
        borderRadius: '0px',
    },
}));
const LoginForm = (props) => {
    const classes = useStyles();
    const [ formObj, setFormObj ] = useState({
        username: '',
        password: '',
    });
    const [ errors, setErrors ] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (props.loginError?.status === 401 || props.loginError?.status === 400) {
            setErrors({
                username: 'Invalid username',
                password: 'Invalid password',
            });
        } else {
            setErrors({
                username: '',
                password: '',
            });
        }
    }, [ props.loginError ]);

    const handleChangeValidation = () => {
        setErrors({
            username: '',
            password: '',
        });
    };

    const handleCheckValidation = () => {
        let isValid = false;
        if (formObj?.username?.length < 1 || formObj?.password?.length < 1) {
            setErrors({
                username: 'Please enter the username',
                password: 'Please enter the password',
            });
        } else {
            setErrors({
                username: '',
                password: '',
            });
            isValid = true;
        }

        return isValid;
    };

    const handleChange = (e) => {
        e.preventDefault();
        handleChangeValidation();
        const newFormObj = { ...formObj, [ e.target.name ]: e.target.value };
        setFormObj(newFormObj);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleCheckValidation()) { props.handleSubmit(formObj); }
    };

    return (
        <Box data-testid="login-form-wrapper">
            <form data-testid="login-form" onSubmit={handleSubmit}>
                <TextField
                    inputProps={{
                        'data-testid': 'text-field-username',
                    }}
                    autoComplete="off"
                    value={formObj?.username}
                    onChange={handleChange}
                    label="Email"
                    name="username"
                    type="text"
                    error={!!errors?.username}
                    helperText={errors?.username}
                    className={classes.textField}
                />
                <TextField
                    inputProps={{
                        'data-testid': 'text-field-password',
                    }}
                    value={formObj?.password}
                    onChange={handleChange}
                    label="Password"
                    name="password"
                    type="password"
                    error={!!errors?.password}
                    helperText={errors?.password}
                    className={classes.textField}
                />
                <div style={{
                    display: 'flex', flexDirection: 'row', paddingBottom: '10px', justifyContent: 'flex-end', alignItems: 'center',
                }}
                />

                <LoginButton style={{ width: '50%', justifyContent: 'center', alignItems: 'center'  }} type="submit" variant="contained">
                    Login
                </LoginButton>
            </form>
        </Box>
    );
};

export default LoginForm;
