import Box from '@material-ui/core/Box';
import { withStyles, makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import TextField from '../../components/FormFields/TextField';

const LoginButton = withStyles(() => ({
    root: {},
}))(Button);
const useStyles = makeStyles((theme) => ({
    textField: {
        '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
            '-webkit-box-shadow': `0 0 0 30px ${ theme.palette.loginInputBg } inset !important`,
        },
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
                    label="Username"
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
                <div style={{ paddingBottom: '10px' }} />

                <LoginButton type="submit" color="primary" fullWidth variant="contained">
                    SIGN IN
                </LoginButton>
            </form>
        </Box>
    );
};

export default LoginForm;
