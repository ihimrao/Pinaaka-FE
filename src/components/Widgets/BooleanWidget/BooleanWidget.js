import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useFormikContext } from 'formik';

const useStyles = makeStyles(() => ({
    wrapper: {
        width: '100%',
        padding: '15px 0px',
        maxWidth: '700px',
    },
}));

const BooleanWidget = (props) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();

    const [ checked, setChecked ] = React.useState(props.value || true);

    const handleChange = (e) => {
        e.preventDefault();
        setChecked((bool) => !bool);
    };

    const handleBlur = () => {
        const fieldName = props.parentKey?.length > 0 ? `${ props.parentKey }.${ props.index }` : props.index;
        setFieldValue(`data.${ fieldName }.value`, checked);
    };

    return (
        <div className={classes.wrapper}>
            <FormControlLabel
                control={(
                    <Checkbox
                        onBlur={handleBlur}
                        onChange={handleChange}
                        color="primary"
                        checked={checked}
                        name={props.display_name}
                    />
                )}
                label={props.display_name}
            />
        </div>
    );
};

export default BooleanWidget;
