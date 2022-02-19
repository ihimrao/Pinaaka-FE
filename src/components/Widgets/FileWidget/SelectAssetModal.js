import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles, alpha } from '@material-ui/core/styles';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
    modalHeaderWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    assetViewContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        border: `1px solid ${ theme.palette.divider }`,
        borderRadius: '10px',
        maxHeight: '40vh',
        overflowY: 'scroll',
    },
    assetWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        maxHeight: '100px',
        position: 'relative',
    },
    assetImage: {
        maxHeight: 'inherit',
        height: 'inherit',
        width: 'inherit',
        objectFit: 'cover',
        borderRadius: '10px',
        boxShadow: theme.palette.boxShadow,
        border: '1px solid #94F281',
    },
    selectedIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        boxShadow: theme.palette.boxShadow,
        color: '#94F281',
    },
}));

const TextFieldWrapper = withStyles((theme) => ({
    root: {
        '& .MuiInputBase-input': {
            borderRadius: '4px',
            background: alpha(theme.palette.toggledPrimaryColor, 0.6),
        },
    },
}))(TextField);

const AssetGridWrapper = withStyles((theme) => ({
    root: {
        cursor: 'pointer',

        '& .asset-wrapper': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            maxHeight: '100px',
            position: 'relative',
        },

        '& .asset-image': {
            maxHeight: 'inherit',
            height: 'inherit',
            width: 'inherit',
            objectFit: 'cover',
            borderRadius: '10px',
            boxShadow: theme.palette.boxShadow,
            border: (props) => (props.is_selected ? '1px solid #94F281' : '1px solid transparent'),
        },

        '& .select-icon': {
            position: 'absolute',
            top: 0,
            right: 0,
            boxShadow: theme.palette.boxShadow,
            color: '#94F281',
            display: (props) => (props.is_selected ? 'block' : 'none'),
        },
    },
}))(Grid);

const imageUrl = 'https://images.unsplash.com/photo-1626164764219-700b08950fd4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80';

const SelectAssetModal = (props) => {
    const { isOpen, handleClose, handleAgree } = props;
    const classes = useStyles();

    const [ selectedAssets, setSelectedAssets ] = React.useState([]);

    const handleSelectAsset = (e, asset) => {
        e.stopPropagation();
        if (selectedAssets.some((selectedAsset) => selectedAsset.id === asset.id)) {
            setSelectedAssets((prevAssets) => prevAssets.filter((prevAsset) => prevAsset.id !== asset.id));
        } else {
            setSelectedAssets((pervAssets) => [ ...pervAssets, asset ]);
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            onClose={handleClose}
        >
            <DialogContent>
                <div className={classes.modalHeaderWrapper}>
                    <Typography variant="h6">
                        Select Asset
                    </Typography>
                    <FolderSharedIcon fontSize="large" />
                </div>
                <TextFieldWrapper
                    size="small"
                    fullWidth
                    autoComplete="off"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    helperText={props?.field_metadata?.instruction}
                    name={props?.uid}
                    type="text"
                    label=""
                    placeholder="Search assets and folder"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle value visibility"
                                // onClick={handleToggleShowValue}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                // value={text}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // InputLabelProps={{
                //   shrink: false,
                // }}
                />

                <div className={classes.assetViewContainer}>
                    <Grid container spacing={2}>
                        {new Array(10).fill({
                            image: imageUrl,
                        }).map((asset, i) => {
                            const isSelected = selectedAssets.some((selectedAsset) => selectedAsset.id === i);
                            return (
                                <AssetGridWrapper
                                    style={{ cursor: 'pointer' }}
                                    onClick={(e) => handleSelectAsset(e, { ...asset, id: i })}
                                    // key={asset.id}
                                    item
                                    xs={3}
                                    is_selected={isSelected ? 1 : 0}
                                >
                                    <div className="asset-wrapper">
                                        <img className="asset-image" alt="logo" src={asset.image} />
                                        <CheckCircleIcon className="select-icon" />
                                    </div>
                                </AssetGridWrapper>
                            );
                        })}
                    </Grid>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => { e.stopPropagation(); handleClose(); }} color="primary">
                    Cancel
                </Button>
                <Button onClick={(e) => { e.stopPropagation(); handleAgree(); }} color="primary" autoFocus>
                    Add selected assets
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SelectAssetModal;
