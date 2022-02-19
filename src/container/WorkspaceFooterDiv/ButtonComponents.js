import Button  from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const TextMutedButton = withStyles(() => ({
    root: {
        textTransform: 'capitalize',
        fontWeight: 'normal',
    },
}))(Button);

export const DropDownButton = withStyles((theme) => ({
    root: {
        border: `1px solid ${ theme.palette.divider }`,
        textTransform: 'capitalize',
        padding: '5px 20px',
    },
}))(Button);

export const SubmitButton = withStyles((theme) => ({
    root: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `1px solid ${ theme.palette.divider }`,
        textTransform: 'capitalize',
        padding: '5px 20px',
        '&:hover': {
            background: theme.palette.buttonColors.primaryBtnHoverBgColor,
        },
        '&.Mui-disabled': {
            background: theme.palette.buttonColors.primaryBtnHoverBgColor,
            color: theme.palette.buttonColors.primaryBtnTextColor,
        },
    },
}))(Button);

export default TextMutedButton;
