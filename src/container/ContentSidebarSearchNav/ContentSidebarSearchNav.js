import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { v4 as uuid } from 'uuid';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Tooltip  from '@material-ui/core/Tooltip';
import { WarningModal } from '../../components/CustomModal/CustomModal';
import SearchInputSm from '../../components/SearchInput/SearchInputSm';
import userSelectors from '../../redux/states/user/userSelector';
import { deleteBrick } from '../../redux/states/brickContent/brickContentAction';
import { fetchContentList, fetchBrickDetails } from '../../redux/states/content/contentAction';
import ContentCreateModal from '../ContentCreateModal/ContentCreateModal';
import ContentUploadModal from '../ContentUploadModal/ContentUploadModal';

const LoadingSkeleton = () => (
    <>
        {new Array(6).fill().map(() => (
            <Skeleton style={{ margin: '5px 0px' }} height="30px" width="80%" key={uuid()} />
        ))}
    </>
);

const useStyles = makeStyles((theme) => ({
    sidebarSearchDiv: {
        padding: '10px',
        position: 'sticky',
        top: 0,
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
    sectionMobile: {
        display: 'flex',
        alignItems: 'center',
    },
    sideNavSelectedItem: {
        backgroundColor: theme.palette.divider,
    },
    test: {
        fontSize: '15px',
        marginLeft: '5px',
    },
    flexRightWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
    },
    iconContent: {
        '@media(max-width: 768px)': {
            display: 'none',
        },
        '&:first-child': {
            marginRight: '10px',
        },
    },
}));

const SideNavSearchText = withStyles(() => ({
    root: {
        fontSize: '.9rem',
        lineHeight: '1.6',
        fontWeight: 'normal',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textTransform: 'capitalize',
    },
}))(Typography);

const ContentSidebarSearchNav = () => {
    const classes  = useStyles();
    const { contentList, contentListLoading } = useSelector(({ content }) => ({
        contentList: content.contentList,
        contentListLoading: content.contentListLoading,
    }));
    const userToken = useSelector(userSelectors.getUserToken);
    const reduxDispatch = useDispatch();

    const [ searchText, setSearchText ] = React.useState('');
    const [ errorMessage, setErrorMessage ] = React.useState('');
    const [ filteredList, setFilteredList ] = React.useState([]);
    const [ contentMoreAnchorEl, setContentMoreAnchorEl ] = React.useState(null);
    const [ contentId, setContentId ] = React.useState(null);
    const isContentMenuOpen = Boolean(contentMoreAnchorEl);
    const history = useHistory();
    const { projectId } = useParams();
    const [ selectedBrickIndex, setSelectedBrickIndex ] = React.useState(0);
    const [ isContentCreateModalOpen, setIsContentCreateModalOpen ] = React.useState(false);
    const [ isUploadContentModalOpen, setIsUploadContentModalOpen ] = React.useState(false);
    const [ uploadFile, setUploadFile ] = React.useState(null);

    const handleNavItemPress = (brickId, brickIndex) => {
        reduxDispatch(fetchBrickDetails({
            userToken,
            projectId,
            brickId,
        }));
        setSelectedBrickIndex(brickIndex || 0);
    };

    const [ isDltWarningModal, setIsDltWarningModal ] = React.useState(false);
    const [ isDeleteSuccess, setIsDeleteSuccess ] = React.useState(false);
    const [ isDeleteFailure, setIsDeleteFailure ] = React.useState(false);
    const [ isDeleteInProgress, setIsDeleteInProgress ] = React.useState(false);

    const handleToggleCreateContentModal = (bool) => {
        setIsContentCreateModalOpen(bool);
    };
    const handleToggleUploadContentModal = (bool) => {
        setIsUploadContentModalOpen(bool);
    };

    const handleChangeUpload = (file) => {
        setUploadFile(file);
    };

    const toggleDltWarningModal = (bool) => {
        setIsDltWarningModal(bool);
    };

    const toggleDltSuccessToast = (bool) => {
        setIsDeleteSuccess(bool);
    };

    const handleCloseDltSuccessToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        toggleDltSuccessToast(false);
        setIsDeleteFailure(false);
    };

    React.useEffect(() => {
        setFilteredList(contentList.data || []);
        if (contentList?.data && contentList?.data?.[ 0 ]?.id) {
            handleNavItemPress(contentList?.data?.[ 0 ]?.id);
        }
    }, [ contentList ]);

    const handleChangeSearchText = (e) => {
        const value = e.target.value || '';
        const staticContentList = contentList.data || [];
        setSearchText(value);

        let newFilteredList;
        if (value) {
            newFilteredList = staticContentList.filter((item) => item.name?.toLowerCase()?.includes(value?.toLowerCase()));
        } else {
            newFilteredList = staticContentList;
        }
        setFilteredList(newFilteredList);
    };

    const handleContentMenuOpen = (event, id) => {
        setContentMoreAnchorEl(event.currentTarget);
        setContentId(id);
    };

    const handleContentMenuClose = () => {
        setContentMoreAnchorEl(null);
    };

    const handleEditButton = () => {
        history.push(`${ contentId }/edit-content`);
    };

    const handleDeleteOrganization = async () => {
        setIsDeleteInProgress(true);
        const response = await deleteBrick({
            token: userToken,
            projectId,
            brickId: contentId,
        });
        if (response?.error) {
            setErrorMessage(response?.error);
            setIsDeleteFailure(true);
            toggleDltWarningModal(false);
        }

        if (response.status === 200) {
            toggleDltSuccessToast(true);
            toggleDltWarningModal(false);
            reduxDispatch(fetchContentList({ userToken, projectId }));
            setIsDeleteInProgress(false);
        }
    };

    const renderContentMenu = (
        <Menu
            anchorEl={contentMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isContentMenuOpen}
            onClose={handleContentMenuClose}
            onClick={handleContentMenuClose}
            PaperProps={{ style: { width: 195 } }}
        >
            <MenuItem onClick={handleEditButton}>
                <EditIcon fontSize="small" />
                <p className={classes.test}>Edit Brick Type</p>
            </MenuItem>
            <MenuItem onClick={() => toggleDltWarningModal(true)}>
                <DeleteIcon fontSize="small" />
                <p className={classes.test}>Delete</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.sidebarSearchDiv}>
            <div className={classes.flexRightWrapper}>
                <Typography variant="body1">
                    Brick Type:
                </Typography>
                <div>
                    <Tooltip title="Import" placement="top">
                        <Icon
                            className={classes.iconContent}
                            onClick={() => handleToggleUploadContentModal(true)}
                        >
                            <i className="bx bx-folder-plus" />
                        </Icon>
                    </Tooltip>
                    <Tooltip title="New Brick type" placement="top">
                        <Icon className={classes.iconContent} onClick={() => handleToggleCreateContentModal(true)}>
                            <i className="bx bxs-plus-circle" />
                        </Icon>
                    </Tooltip>
                </div>
            </div>
            <div className={classes.sidebarNavSearchWrapper}>
                <SearchInputSm
                    value={searchText}
                    onChange={handleChangeSearchText}
                    placeholder={`${ contentList.data?.length || 0 } brick type`}
                />
            </div>
            <Typography variant="caption">
                All Entries
            </Typography>
            <div className={classes.sidebarNavSearchResultDiv}>
                {contentListLoading && <LoadingSkeleton />}
                {filteredList?.map((content, index) => (
                    <div key={content?.id} className={classes.sectionMobile}>
                        <Button
                            className={selectedBrickIndex === index ? classes.sideNavSelectedItem : ''}
                            component={SideNavSearchText}
                            onClick={() => handleNavItemPress(content?.id, index)}
                        >
                            {content?.name}
                        </Button>
                        <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                            onClick={(e) => handleContentMenuOpen(e, content?.id)}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                        <WarningModal
                            isLoading={isDeleteInProgress}
                            handleAgree={handleDeleteOrganization}
                            isOpen={isDltWarningModal && content?.id === contentId}
                            handleClose={() => toggleDltWarningModal(false)}
                        >
                            Are you sure you want to delete &nbsp;
                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                {content?.name?.length < 21
                                    ? content.name
                                    : content.name.substring(0, 21)}
                            </span> brick type?
                        </WarningModal>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={isDeleteSuccess}
                            autoHideDuration={3000}
                            onClose={handleCloseDltSuccessToast}
                        >
                            <Alert onClose={handleCloseDltSuccessToast} elevation={6} variant="filled" severity="success">
                                Brick Type deleted successfully!
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={isDeleteFailure}
                            autoHideDuration={3000}
                            onClose={handleCloseDltSuccessToast}
                        >
                            <Alert onClose={handleCloseDltSuccessToast} elevation={6} variant="filled" severity="error">
                                {errorMessage}
                            </Alert>
                        </Snackbar>
                    </div>
                ))}
            </div>

            {renderContentMenu}
            <ContentCreateModal
                open={isContentCreateModalOpen}
                handleClose={() => handleToggleCreateContentModal(false)}
            />
            <ContentUploadModal
                uploadFiles={uploadFile}
                handleChangeUpload={handleChangeUpload}
                open={isUploadContentModalOpen}
                handleClose={() => handleToggleUploadContentModal(false)}
            />
        </div>
    );
};

export default ContentSidebarSearchNav;
