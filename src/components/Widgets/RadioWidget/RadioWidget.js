import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';
import { useFormikContext } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormHelperText } from '@material-ui/core';
import FormLabelMetaData from '../../FormLabelMetaData/FormLabelMetaData';

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        maxWidth: theme.palette.maxWrapperWidgetWidth,
        width: '100%',
        margin: '20px 0px',
    },
    formControl: {
        margin: '10px 0px',
    },
}));

const TextFieldWrapper = withStyles((theme) => ({
    root: {
        '& .MuiInputBase-input': {
            borderRadius: '4px',
            background: alpha(theme.palette.toggledPrimaryColor, 0.6),
        },
    },

}))(Select);

const RadioWidget = (props) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();
    const [ value, setValue ] = React.useState(props.field_metadata?.default_value || '');

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e);
        setValue(e.target.value);
    };

    const handleBlur = () => {
        const fieldName = props.parentKey?.length > 0 ? `${ props.parentKey }.${ props.index }` : props.index;
        setFieldValue(`data.${ fieldName }.value`, value);
    };

    return (
        <Box className={classes.boxWrapper}>
            <FormLabelMetaData props={props} />
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <TextFieldWrapper
                    error={(props?.unique_id && !value && props?.errors[ props?.unique_id ])}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                >
                    {(props?.enum?.choices || props?.options)?.map((option) => (
                        <MenuItem key={option.value || option} value={option.value || option}>{option.label || option.value || option}</MenuItem>
                    ))}
                </TextFieldWrapper>
                <FormHelperText error={props?.unique_id && !value && props?.errors[ props?.unique_id ]}>{props?.field_metadata?.description || (!value && props?.errors[ props?.unique_id ]) || ''}</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default RadioWidget;
