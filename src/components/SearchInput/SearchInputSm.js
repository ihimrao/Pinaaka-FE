import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 10px 37px rgba(0, 0, 0, 0.03)',
        transition: 'all .2s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.background.paper,
        },
        marginLeft: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

const SearchInputSm = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.search}>
            <InputBase
                placeholder={props?.placeholder || 'Search for content'}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                {...props}
            />
            <div className={classes.searchIcon}>
                {props.value?.length > 0 ? (
                    <IconButton
                        onClick={() => {
                            props.onChange({
                                target: {
                                    value: '',
                                },
                            });
                        }}
                        size="small"
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                ) : (
                    <SearchIcon fontSize="small" />
                )}
            </div>
        </div>
    );
};

export default SearchInputSm;
