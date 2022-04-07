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

    button: {
        textDecoration: 'none',
        cursor: 'pointer',
        width: '200px',
        height: '60px',
        padding: '20px 60px',
        lineHeight: '60px',
        background: 'linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4)',
        backgroundSize: '400%',
        borderRadius: '999px',
        fontSize: '1.3em',
        position: 'relative',
        zIndex: '1',
        '&:hover': {
            textDecoration: 'none',
            animation: 'animate 8s linear',
        },

    },

    //   .button:before {
    //     content: "";
    //     position: absolute;
    //     top: -5px;
    //     left: -5px;
    //     right: -5px;
    //     bottom: -5px;
    //     z-index: -1;
    //     background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    //     background-size: 400%;
    //     border-radius: 999px;
    //     filter: blur(20px);
    //     opacity: 0;
    //     transition: 0.5s;
    //   }

//   .button:hover:before {
//     filter: blur(20px);
//     opacity: 1;
//     animation: animate 8s linear infinite;
//   }
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

                <LoginButton fullWidth className={classes.button} type="submit" variant="contained">
                    Login
                </LoginButton>
            </form>
        </Box>
    );
};

export default LoginForm;
