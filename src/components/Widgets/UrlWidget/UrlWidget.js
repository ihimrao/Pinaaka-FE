import React from 'react';
import { TextField as MaterialTextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import { useFormikContext } from 'formik';
import FormLabelMetaData from '../../FormLabelMetaData/FormLabelMetaData';

const useStyles = makeStyles((theme) => ({
    textWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
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

const UrlWidget = (props) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();

    const [ showValue, setShowValue ] = React.useState(true);
    const [ isDisabled, setIsDisabled ] = React.useState(true);
    const [ text, setText ] = React.useState(props.value || '');

    const handleToggleShowValue = () => {
        setShowValue((bool) => !bool);
    };

    const handleToggleEdit = () => {
        setIsDisabled((bool) => !bool);
    };

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
            <div className={classes.textWrapper}>
                <TextFieldWrapper
                    size="small"
                    disabled={isDisabled}
                    fullWidth
                    autoComplete="off"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    // value={props?.value}
                    helperText={props?.field_metadata?.instruction}
                    name={props?.uid}
                    type={showValue ? 'text' : 'password'}
                    label=""
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle value visibility"
                                    onClick={handleToggleShowValue}
                                >
                                    {showValue ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <IconButton
                    aria-label="Edit Url"
                    onClick={handleToggleEdit}
                >
                    <CreateIcon fontSize="small" />
                </IconButton>
            </div>
        </Box>
    );
};

export default UrlWidget;
