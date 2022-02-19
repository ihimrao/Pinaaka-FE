import { makeStyles, withStyles, alpha } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const useStyles = makeStyles((theme) => ({
    colorPickerWrapper: {
        position: 'relative',
    },
    pickerWrapper: {
        flexGrow: 1,
    },
    pickerGridWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        padding: '10px 0px',
    },
    divider: {
        margin: '20px 0px',
    },
    alphaPickerWrapper: {
        backgroundColor: theme.palette.background.paper,
        // background: 'white',
        padding: '4px 20px',
        borderRadius: '10px',
    },
    blockPickerPreviewDiv: {
        width: '20px',
        height: '20px',
        background: (props) => props.currentColorPickerColor,
        borderRadius: '2px',
        border: `1px solid ${ theme.palette.divider }`,
    },
    custom_block_picker: {
        '& div:nth-of-type(3n)': {
            background: theme.palette.background.paper,
        },
    },
}));

export const TextFieldWrapper = withStyles((theme) => ({
    root: {
        '& .MuiInputBase-input': {
            borderRadius: '4px',
        },
        '& .MuiInputBase-multiline': {
            background: alpha(theme.palette.toggledPrimaryColor, 0.6),
        },
    },

}))(TextField);

export const PickerButton = withStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '6px 15px',
        border: `1px solid ${ theme.palette.divider }`,
    },
}))(Button);

export default useStyles;
