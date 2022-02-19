import Typography from '@material-ui/core/Typography';
import Button  from '@material-ui/core/Button';
import {
    makeStyles, alpha, withStyles, fade,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { setSidebarCollapse } from '../../redux/states/appState/appStateActions';

const useStyles = makeStyles((theme) => ({
    sidebarWrapper: {
        height: '100%',
    },
    flexWrapper: {
        marginTop: '10px',
        padding: '20px 10px',
        minWidth: '180px',
        borderRadius: '10px',
        backgroundColor: alpha(theme.palette.divider, 0.1),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    flexWrapperCollapse: {
        minWidth: '50px',
        marginTop: '10px',
        padding: '20px 10px',
        [ theme.breakpoints.down('xs') ]: {
            padding: '20px 5px',
        },
        borderRadius: '10px',
        backgroundColor: fade(theme.palette.divider, 0.1),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    flexStartWrapper: {
    },
    navItemWrapper: {
        marginTop: '20px',
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
    },
    navItemActive: {
        color: theme.palette.activeBlue,
    },
    sideNavItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
    },
    sideNavIcon: {
        minWidth: '20px',
        textAlign: 'center',
        fontSize: '1.2rem',
    },
    sideNavText: {
        fontSize: '.7rem',
        textTransform: 'uppercase',
        letterSpacing: '.1rem',
    },
    flexEndWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTop: `1px solid ${ alpha(theme.palette.text.primary, 0.4) }`,
        paddingTop: '10px',
    },
    collapseBtnWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-end',
    },
    collapseBtnWrapperWhenClpsed: {
        justifyContent: 'center',
    },
}));

const NavItemButtonWrapper = withStyles(() => ({
    root: {
        minWidth: 'unset',
        padding: '0px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
}))(Button);

const SidebarCollapseBtn = withStyles(() => ({
    root: {
        minWidth: 'unset',
        padding: '5px',
    },
}))(Button);

const sideNavItemArr = [
    {
        id: 1, title: 'Dashboard', icon: () => <i className="bx bx-tachometer" />, path: '/dashboard',
    },
    {
        id: 2, title: 'Content', icon: () => <i className="bx bx-calendar-edit" />, path: '/content',
    },
    {
        id: 3, title: 'Assets', icon: () => <i className="bx bx-category-alt" />, path: '/assets',
    },
    {
        id: 4, title: 'Publish Queue', icon: () => <i className="bx bx-coin-stack" />, path: '/publish',
    },
    {
        id: 5, title: 'Tokens', icon: () => <i className="bx bx-key" />, path: '/token',
    },
    // {
    //     id: 5, title: 'Releases', icon: () => <i className="bx bx-box" />, path: '/releases',
    // },
];

const SideNav = () => {
    const reduxDispatch = useDispatch();
    const isSidebarCollapsed = useSelector((state) => state.appState?.isSidebarCollapsed);

    const classes = useStyles();
    const routerParams = useRouteMatch('/:orgId/:projectId/:activeNavItem');
    const history = useHistory();

    const handleChangeNav = (key) => {
        const path = `/${ routerParams?.params?.orgId }/${ routerParams?.params?.projectId }${ key }`;
        history.push(path);
    };

    const handleToggleCollapse = () => {
        reduxDispatch(setSidebarCollapse(!isSidebarCollapsed));
    };

    return (
        <div className={classes.sidebarWrapper}>
            <div className={isSidebarCollapsed ? classes.flexWrapperCollapse : classes.flexWrapper}>
                <div className={classes.flexStartWrapper}>
                    <div className={clsx(classes.collapseBtnWrapper, isSidebarCollapsed ? classes.collapseBtnWrapperWhenClpsed : {})}>

                        <SidebarCollapseBtn onClick={handleToggleCollapse}>
                            <Tooltip title={isSidebarCollapsed ? 'Expand' : 'Collapse'} aria-label={isSidebarCollapsed ? 'Expand' : 'Collapse'}>
                                <i className={`bx bx-caret-left-square ${ isSidebarCollapsed ? 'bx-rotate-180' : '' }`} />
                            </Tooltip>
                        </SidebarCollapseBtn>
                    </div>
                    <div className={classes.navItemWrapper}>
                        {sideNavItemArr?.map((nav) => (
                            <NavItemButtonWrapper onClick={() => handleChangeNav(nav.path)} key={nav.id + nav.title} variant="text">
                                <div key={nav.id} className={clsx(classes.sideNavItem, nav.title?.toLowerCase()?.includes(routerParams?.params?.activeNavItem) ? classes.navItemActive : {})}>
                                    <div className={classes.sideNavIcon}>
                                        <nav.icon />
                                    </div>
                                    {!isSidebarCollapsed ? (
                                        <div className={classes.sideNavText}>
                                            {nav.title}
                                        </div>
                                    ) : <></>}
                                </div>
                            </NavItemButtonWrapper>
                        ))}
                    </div>
                </div>
                {!isSidebarCollapsed ? (
                    <Typography variant="caption" className={classes.flexEndWrapper}>
                        &copy;
                    </Typography>
                ) : <div />}
            </div>
        </div>
    );
};

export default SideNav;
