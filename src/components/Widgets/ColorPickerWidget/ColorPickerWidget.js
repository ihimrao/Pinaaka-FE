import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useFormikContext } from 'formik';
import BlockPickerDiv from './BlockPickerDiv';
import AlphaPickerDiv from './AlphaPickerDiv';
import { useStyles, TextFieldWrapper } from './colorPicker.styles';

const ColorPickerWidget = (props) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();

    const [ data, setData ] = React.useState({
        ...props.value,
    });

    const changeFormikValue = (changedData = data) => {
        const fieldName = props.parentKey?.length > 0 ? `${ props.parentKey }.${ props.index }` : props.index;
        setFieldValue(`data.${ fieldName }.value`, changedData);
    };

    const handleChange = (obj) => {
        const { value, key } = obj;

        const newData = {
            ...data,
            [ key ]: value,
        };

        setData(newData);
        changeFormikValue(newData);
    };

    const changeColorDesc = (e) => {
        setData((prevData) => (
            {
                ...prevData,
                colorDescription: e.target.value,
            }
        ));
    };

    return (
        <Box className={classes.colorPickerWrapper}>
            <Divider className={classes.divider} />
            <Typography>{props.display_name}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box className={classes.pickerGridWrapper}>
                        <BlockPickerDiv value={data} handleChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box className={classes.pickerGridWrapper}>
                        <AlphaPickerDiv value={data} handleChange={handleChange} />
                    </Box>
                </Grid>
            </Grid>

            <TextFieldWrapper
                size="small"
                multiline
                fullWidth
                autoComplete="off"
                color="secondary"
                margin="normal"
                variant="outlined"
                name={props?.uid}
                type="text"
                label="Color Description"
                InputLabelProps={{ shrink: true }}
                onChange={changeColorDesc}
                onBlur={() => changeFormikValue()}
                value={data?.colorDescription}
            />
            <Divider className={classes.divider} />

        </Box>
    );
};

export default ColorPickerWidget;
