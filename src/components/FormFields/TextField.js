import React from 'react';
import { TextField as MaterialTextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { withStyles, alpha } from '@material-ui/core/styles';

const TextFieldWrapper = withStyles(() => ({
    root: {
        borderRadius: '4px',
        '& .MuiInputBase-root': {
            background: alpha('#ffffff', 0.2),
        },
        '& .MuiInputBase-input': {
            color: '#ffffff',
        },
        '& .MuiFormLabel-root': {
            color: '#ffffff',
        },
    },

}))(MaterialTextField);

const TextField = (props) => (
    <Box width="100%">
        <TextFieldWrapper
            fullWidth
            autoComplete="false"
            color="secondary"
            margin="normal"
            variant="outlined"
            {...props}
        />
    </Box>
);

export default TextField;
