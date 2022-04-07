import React from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import Tooltip  from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import userState from '../../redux/states/user/userSelector';
import images from '../../assets/images/images';
// import SearchInput from '../../components/SearchInput/SearchInput';
import { setAppTheme, setSidebarCollapse } from '../../redux/states/appState/appStateActions';
import { signoutUser } from '../../redux/states/user/userActions';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    container: {
        borderRadius: '10px',
        margin: '5px 18px',
        padding: '5px 10px',
        backgroundColor: alpha(theme.palette.background.paper, 0.1),
        boxShadow: theme.palette.boxShadow,
    },
    logoWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '30px',
    },
    logo: {
        height: 'inherit',
        width: 'inherit',
        objectFit: 'cover',
    },

    profileDivWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileImgWrapper: {
        width: '40px',
        height: '40px',
        marginRight: theme.spacing(1),
    },
    profileImg: {
        height: 'inherit',
        width: 'inherit',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    sectionDesktop: {
        display: 'none',
        [ theme.breakpoints.up('md') ]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [ theme.breakpoints.up('md') ]: {
            display: 'none',
        },
    },
    logoBtn: {
        '&.MuiButtonBase-root:hover': {
            backgroundColor: 'unset',
        },
    },
    buttonItems: {
        display: 'none',
    },
}));

const TopNav = () => {
    const classes = useStyles();
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(null);
    // const [ searchText, setSearchText ] = React.useState('');

    const currentTheme = useSelector((state) => state.appState?.theme);
    const { adminInfo } = useSelector((state) => state.user.userInfoState);
    const reduxDispatch = useDispatch();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const history = useHistory();
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        handleMenuClose();
        reduxDispatch(signoutUser());
        reduxDispatch(setSidebarCollapse(false));
        history.push('/');
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Divider />
            <MenuItem>{adminInfo?.wallet} Tokens</MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="primary">
                        <i className="bx bx-bell" />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show settings" color="inherit">
                    <Badge color="primary">
                        <SettingsIcon />
                    </Badge>
                </IconButton>
                <p>Settings</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="get help" color="inherit">
                    <Badge color="primary">
                        <i className="bx bx-help-circle" />
                    </Badge>
                </IconButton>
                <p>Help</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <div className={classes.profileDivWrapper}>
                        <div className={classes.profileImgWrapper}>
                            <img className={classes.profileImg} src={images.defaultProfileImg} alt="profile-img" />
                        </div>
                        <Typography variant="body2">
                            ADMIN
                        </Typography>
                    </div>
                </IconButton>
            </MenuItem>
        </Menu>
    );

    const handleChangeTheme = () => {
        reduxDispatch(setAppTheme(currentTheme === 'light' ? 'dark' : 'light'));
    };
    const role = useSelector(userState.getUserRole);
    const handleRedirectToHomepage = () => {
        if (role) { history.push('/admins'); } else { history.push('/imsarkaar/keys'); }
    };

    return (
        <div className={classes.grow}>

            <AppBar elevation={0} color="transparent" position="static">
                <div className={classes.container}>
                    <Toolbar style={{ border: '1px solid red', borderRadius: '10px' }}>
                        <div className={classes.logoWrapper}>
                            <Button className={classes.logoBtn} disableRipple type="button" onClick={handleRedirectToHomepage}>
                                <img className={classes.logo} alt="logo" src="https://i.imgur.com/A7FNVyr.png" />
                            </Button>
                        </div>
                        {/* <SearchInput value={searchText} onChange={(e) => setSearchText(e.target.value)} /> */}
                        <div className={classes.grow} />

                        <div className={classes.sectionDesktop}>
                            <Tooltip title="Notification" aria-label="Notification">
                                <IconButton className={classes.buttonItems} aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={17} color="primary">
                                        <i className="bx bx-bell" />
                                    </Badge>
                                </IconButton>

                            </Tooltip>
                            <Tooltip title="Settings" aria-label="Settings">
                                <IconButton className={classes.buttonItems} aria-label="show settings" color="inherit">
                                    <Badge color="primary">
                                        <SettingsIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Help" aria-label="help">
                                <IconButton aria-label="get help" color="inherit" className={classes.buttonItems}>
                                    <Badge color="primary">
                                        <i className="bx bx-help-circle" />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Profile" aria-label="profile">
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <div className={classes.profileDivWrapper}>
                                        <div className={classes.profileImgWrapper}>
                                            <img className={classes.profileImg} src="https://randomuser.me/api/portraits/men/77.jpg" alt="profile-img" />
                                        </div>
                                        <Typography style={{ textTransform: 'capitalize' }} variant="body2">
                                            Hi {adminInfo?.firstName}
                                        </Typography>
                                    </div>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Toggle light/dark theme" aria-label="Toggle light/dark theme">
                                <IconButton
                                    onClick={handleChangeTheme}
                                    style={{ marginLeft: '10px' }}
                                    aria-label="toggle theme"
                                    color="inherit"
                                >
                                    {currentTheme === 'light' ? <i className="bx bxs-moon" /> : <i className="bx bx-sun" /> }
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </div>
            </AppBar>

            {renderMobileMenu}
            {renderMenu}
        </div>
    );
};

export default TopNav;
