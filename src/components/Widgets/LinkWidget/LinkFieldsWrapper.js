import React from 'react';
import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import { TextField as MaterialTextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    valueWrapper: {
        margin: '20px 0px',
        padding: '20px',
        borderRadius: '10px',
        border: `1px solid ${ theme.palette.divider }`,
        position: 'relative',
    },
    fieldWrapper: {
        margin: '10px 0px',
    },
    deleteBtnWrapper: {
        position: 'absolute',
        right: '15px',
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

const LinkFieldsWrapper = (props) => {
    const classes = useStyles();

    const [ data, setData ] = React.useState({
        title: props?.title || '',
        url: props?.url || '',
    });

    const handleChangeText = (e, key) => {
        setData({ ...data, [ key ]: e.target.value });
    };

    const handleBlur = () => {
        props.onBlur(data);
    };

    return (
        <div className={classes.valueWrapper}>
            {props?.has_delete ? (
                <IconButton
                    size="small"
                    onClick={props.onDelete}
                    className={classes.deleteBtnWrapper}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            ) : <></>}
            <div className={classes.fieldWrapper}>
                <div className={classes.labelWrapper}>
                    <FormLabel style={{ textTransform: 'capitalize' }} component="legend">Title</FormLabel>
                </div>
                <TextFieldWrapper
                    size="small"
                    fullWidth
                    autoComplete="off"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    name={props?.uid}
                    type="text"
                    label=""
                    onChange={(e) => handleChangeText(e, 'title')}
                    onBlur={handleBlur}
                    value={data?.title}
                />
            </div>
            <div className={classes.fieldWrapper}>
                <div className={classes.labelWrapper}>
                    <FormLabel style={{ textTransform: 'capitalize' }} component="legend">Url</FormLabel>
                </div>
                <TextFieldWrapper
                    size="small"
                    fullWidth
                    autoComplete="off"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    name={props?.uid}
                    type="text"
                    label=""
                    onChange={(e) => handleChangeText(e, 'url')}
                    value={data?.url}
                />
            </div>
        </div>
    );
};

export default LinkFieldsWrapper;
