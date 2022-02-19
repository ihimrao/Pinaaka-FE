import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';

const withSidenavArr = [ 'releases', 'content', 'assets', 'publish' ];

const showSidebarNavArr = [ 'content' ];

const pageWithNoSidebar = [ 'keys', 'admins', 'workspace', 'create-content', 'edit-content' ];

const useStyles = makeStyles(() => ({
    mainLayoutWrapper: {},
    viewWrapper: {
        display: 'flex',
        position: 'relative',
        padding: '20px 15px',
    },
    contentWrapper: {
        minHeight: '90vh',
        padding: (props) => (props.isSNExist ? props.paddingForSNExist : props.paddingForSNNull),
        flexGrow: 1,
        width: '63%',
    },
    sidebarSectionWrapper: {
        height: '85vh',
        position: 'sticky',
        top: 0,
    },
}));

const MainLayout = (props) => {
    const [ isSidebarNavExist, setIsSidebarNavExist ] = React.useState(0);
    const [ showSideNav, setShowSideNav ] = React.useState(true);
    const history = useHistory();

    const match = useRouteMatch('/:slug1/:slug2/:slug3');

    React.useEffect(() => {
        if (pageWithNoSidebar.some((item) => history.location.pathname?.includes(item))) {
            setShowSideNav(false);
            setIsSidebarNavExist(0);
            return;
        }
        if (showSidebarNavArr.some((item) => match?.params.slug2?.includes(item))) {
            setShowSideNav(false);
        } else {
            setShowSideNav(true);
            if (withSidenavArr.some((item) => history.location.pathname?.includes(item))) {
                setIsSidebarNavExist(1);
            } else {
                setIsSidebarNavExist(0);
            }
        }
    }, [ history.location.pathname ]);

    const classes = useStyles({
        isSNExist: showSideNav,
        paddingForSNExist: (isSidebarNavExist ? '0px 0px 20px 10px' : '0px 0px 20px 40px'),
        paddingForSNNull: '0px',
    });

    return (
        <div className={classes.mainLayoutWrapper}>
            <TopNav />

            <div className={classes.viewWrapper}>
                <div style={{ display: showSideNav ? 'block' : 'none' }} className={classes.sidebarSectionWrapper}>
                    <SideNav withSidenavArr={withSidenavArr} />
                </div>
                <div className={classes.contentWrapper}>
                    {props.children}
                </div>
            </div>

        </div>
    );
};

export default MainLayout;
