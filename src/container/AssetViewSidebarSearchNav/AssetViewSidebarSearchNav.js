import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchInputSm from '../../components/SearchInput/SearchInputSm';

const useStyles = makeStyles((theme) => ({
    sidebarSearchDiv: {
        padding: '10px',
        position: 'sticky',
        top: 0,
        [ theme.breakpoints.down('xs') ]: {
            padding: '0px',
        },
    },
    sidebarNavSearchWrapper: {
        margin: '10px 0px',
    },
    sidebarNavSearchResultDiv: {
        margin: '10px 0px',
        maxHeight: '50vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
}));

const SideNavSearchText = withStyles((theme) => ({
    root: {
        fontSize: '.9rem',
        lineHeight: '1.6',
        fontWeight: 'normal',
        padding: '6px 0px',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        [ theme.breakpoints.down('xs') ]: {
            fontSize: '.6rem',
        },
    },
}))(Typography);

const AssetViewSidebarSearchNav = () => {
    const classes  = useStyles();
    return (
        <div className={classes.sidebarSearchDiv}>
            <Typography variant="body1">
                Asset Type:
            </Typography>
            <div className={classes.sidebarNavSearchWrapper}>
                <SearchInputSm placeholder="140 content type" />
            </div>
            <Typography variant="caption">
                All Entries
            </Typography>
            <div className={classes.sidebarNavSearchResultDiv}>
                {[ 1, 2, 3, 4, 5, 6, 7, 8 ].map((item) => (
                    <div key={item}>
                        <Button component={SideNavSearchText}>
                            3-up Banners
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetViewSidebarSearchNav;
