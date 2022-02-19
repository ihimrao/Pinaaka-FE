import React from 'react';
import { makeStyles, withStyles, alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SelectAssetModal from './SelectAssetModal';

const useStyles = makeStyles(() => ({
    fileWidgetWrapper: {
        marginTop: '30px',
        maxWidth: '700px',
        width: '700px',
    },
    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '20px',
        marginTop: '20px',
    },
}));

const ChooseAssetsBtn = withStyles((theme) => ({
    root: {
        textTransform: 'capitalize',
        padding: '5px 20px',
        borderRadius: '20px',
        border: `1px solid ${ theme.palette.primary.main }`,
        background: theme.palette.background.paper,
        color: theme.palette.primary.main,
        boxShadow: 'unset',
        '&:hover': {
            background: alpha(theme.palette.background.paper, 0.3),
            boxShadow: theme.palette.boxShadow,
        },
    },
}))(Button);

const AddNewAssetsBtn = withStyles((theme) => ({
    root: {
        textTransform: 'capitalize',
        padding: '5px 20px',
        // borderRadius: '20px',
        border: `1px solid ${ theme.palette.divider }`,
    },
}))(Button);

const FileWidget = (props) => {
    const classes = useStyles();

    const [ isAssetModalOpen, setIsAssetModalOpen ] = React.useState(false);

    const handleToggleAssetModal = (bool) => {
        if (bool !== isAssetModalOpen) {
            setIsAssetModalOpen(bool);
        }
    };

    return (
        <Box className={classes.fileWidgetWrapper}>
            <Typography>{props.display_name}</Typography>
            <div className={classes.buttonWrapper}>
                <ChooseAssetsBtn
                    component="label"
                    variant="contained"
                    onClick={() => handleToggleAssetModal(true)}
                >
                    Choose from uploads
                </ChooseAssetsBtn>
                <Typography variant="caption" color="primary">or</Typography>
                <AddNewAssetsBtn
                    component="label"
                    color="primary"
                >
                    Upload new file
                    <input
                        type="file"
                        hidden
                    />
                </AddNewAssetsBtn>
                <SelectAssetModal
                    isOpen={isAssetModalOpen}
                    handleClose={() => handleToggleAssetModal(false)}
                    handleAgree={() => {}}
                />
            </div>
        </Box>
    );
};

export default FileWidget;
