import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useFormikContext } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabelMetaData from '../../FormLabelMetaData/FormLabelMetaData';

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        maxWidth: theme.palette.maxWrapperWidgetWidth,
        width: '100%',
        margin: '20px 0px',
    },
    formControl: {
        margin: '10px 0px',
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
    },
}));

const DropDownWidget = (props) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();
    const [ value, setValue ] = React.useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        const newValue = e.target.name;

        if (props.multiple) {
            if (value.some((prevValue) => prevValue === newValue)) {
                setValue(value.filter((prevValue) => prevValue !== newValue));
            } else setValue([ ...value, e.target.name ]);
        } else {
            setValue([ newValue ]);
        }
    };

    const handleBlur = () => {
        const fieldName = props.parentKey?.length > 0 ? `${ props.parentKey }.${ props.index }` : props.index;
        setFieldValue(`data.${ fieldName }.value`, value);
    };

    React.useEffect(() => {
        handleBlur();
    }, [ value ]);

    return (
        <Box className={classes.boxWrapper}>
            <FormLabelMetaData props={props} />
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                {props?.enum?.choices?.map((option) => (
                    <FormControlLabel
                        control={(
                            <Checkbox
                                checked={value.some((item) => item === option.value)}
                                onChange={handleChange}
                                name={option.value}
                            />
                        )}
                        label={option.value}
                    />
                ))}
                <FormHelperText>{props?.field_metadata?.description}</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default DropDownWidget;
