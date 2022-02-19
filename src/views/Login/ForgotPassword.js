import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import TextField from '../../components/FormFields/TextField';

const SendEmail = withStyles(() => ({
    root: {},
}))(Button);

const ForgotPassword = () => {
    const [ email, setEmail ] = useState('');
    const [ errorEmail, setErrorEmail ] = useState('');

    const patternEmail = /\S+@\S+\.\S+/;

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmitEmail = (e) => {
        e.preventDefault();

        if (email.length === 0) {
            setErrorEmail('Please enter email');
        } else if (!patternEmail.test(email)) {
            setErrorEmail('Please Use like "abc@gmail.com"');
        } else {
            setErrorEmail('');
        }
        setEmail('');
    };
    return (
        <Box data-testid="login-form-wrapper">
            <form data-testid="login-form">
                <TextField
                    autoComplete="off"
                    onChange={handleChangeEmail}
                    value={email}
                    label="Email"
                    name="email"
                    type="text"
                    error={errorEmail}
                    helperText={errorEmail}
                />
                <SendEmail onClick={handleSubmitEmail} style={{ marginTop: '15px' }} type="submit" color="primary" fullWidth variant="contained">
                    Send Email
                </SendEmail>
            </form>
        </Box>
    );
};

export default ForgotPassword;
