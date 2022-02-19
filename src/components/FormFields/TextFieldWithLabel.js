import React from 'react';
import { TextField as MaterialTextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    labelWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    requiredSpan: {
        lineHeight: '1',
        color: theme.palette.selectActiveColor,
        marginLeft: '5px',
    },
}));

const TextFieldWrapper = withStyles(() => ({
    root: {
        borderRadius: '4px',
    },

}))(MaterialTextField);

const TextField = (props) => {
    const classes = useStyles();

    return (
        <Box width="100%">
            <div className={classes.labelWrapper}>
                <FormLabel style={{ textTransform: 'capitalize' }} component="legend">{props.label}</FormLabel>
                {props.is_required ? <span className={classes.requiredSpan}>*</span> : <></>}
            </div>
            <TextFieldWrapper
                fullWidth
                autoComplete="false"
                color="secondary"
                margin="normal"
                variant="outlined"
                {...props}
                label=""
            // InputLabelProps={{
            //   shrink: false,
            // }}
            />
        </Box>
    );
};

export default TextField;
