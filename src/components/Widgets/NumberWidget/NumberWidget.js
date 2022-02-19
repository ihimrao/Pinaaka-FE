import React from 'react';
import { TextField as MaterialTextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';
import { useFormikContext } from 'formik';
import FormLabelMetaData from '../../FormLabelMetaData/FormLabelMetaData';

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        maxWidth: theme.palette.maxWrapperWidgetWidth,
        width: '100%',
        margin: '20px 0px',
    },
}));

const TextFieldWrapper = withStyles((theme) => ({
    root: {
        '& .MuiInputBase-input': {
            borderRadius: '4px',
            background: alpha(theme.palette.toggledPrimaryColor, 0.6),
        },
    },

}))(MaterialTextField);

const NumberWidget = (props) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();
    const [ text, setText ] = React.useState(props.value || '');

    const handleChange = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };

    const handleBlur = () => {
        const fieldName = props.parentKey?.length > 0 ? `${ props.parentKey }.${ props.index }` : props.index;
        setFieldValue(`data.${ fieldName }.value`, text);
    };

    return (
        <Box className={classes.boxWrapper}>
            <FormLabelMetaData props={props} />
            <TextFieldWrapper
                size="small"
                fullWidth
                autoComplete="off"
                color="secondary"
                margin="normal"
                variant="outlined"
                helperText={props?.field_metadata?.instruction}
                name={props?.uid}
                type="number"
                label=""
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
            // InputLabelProps={{
            //   shrink: false,
            // }}
            />
        </Box>
    );
};

export default NumberWidget;
