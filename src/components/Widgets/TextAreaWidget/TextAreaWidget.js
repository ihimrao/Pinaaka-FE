import React from 'react';
import { TextField as MaterialTextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useFormikContext } from 'formik';
import Divider from '@material-ui/core/Divider';
import MarkdownEditor from '../../MarkdownEditor/MarkdownEditor';
import FormLabelMetaData from '../../FormLabelMetaData/FormLabelMetaData';

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        maxWidth: theme.palette.maxWrapperWidgetWidth,
        width: '100%',
        margin: '20px 0px',
    },
}));

const TextFieldWrapper = withStyles(() => ({
    root: {
        '& .MuiInputBase-input': {
            borderRadius: '4px',
        },
    },

}))(MaterialTextField);

const TextAreaWidget = (props) => {
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

    const handleMarkdownBlur = (value) => {
        const fieldName = props.parentKey?.length > 0 ? `${ props.parentKey }.${ props.index }` : props.index;
        setFieldValue(`data.${ fieldName }.value`, value);
    };

    return (
        <Box className={classes.boxWrapper}>
            <FormLabelMetaData props={props} />
            {props?.field_metadata?.markdown ? (
                <div>
                    <MarkdownEditor handleChangeState={handleMarkdownBlur} />
                </div>
            ) : (
                <TextFieldWrapper
                    multiline
                    rows={4}
                    error={(props?.unique_id && !text && props?.errors[ props?.unique_id ])}
                    size="small"
                    fullWidth
                    autoComplete="off"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    helperText={props?.field_metadata?.instruction ||  (!text && props?.errors[ props?.unique_id ]) || ''}
                    name={props?.uid || props?.unique_id}
                    type="text"
                    label=""
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            )}
            {props?.field_metadata?.markdown ? <Divider /> : <></>}
        </Box>
    );
};

export default TextAreaWidget;
