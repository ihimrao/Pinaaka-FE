import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    labelWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    requiredSpan: {
        lineHeight: '1',
        marginLeft: '5px',
        color: theme.palette.action.active,
        fontSize: '.6rem',
    },
}));
const FormLabelMetaData = ({ props }) => {
    const classes = useStyles();
    return (
        <div className={classes.labelWrapper}>
            <FormLabel style={{ textTransform: 'capitalize' }} component="legend">{props?.display_name || props?.name}</FormLabel>
            {props.mandatory || props?.required ? <span className={classes.requiredSpan}>( Required )</span> : <></>}
        </div>
    );
};

export default FormLabelMetaData;
