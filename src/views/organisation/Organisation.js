import React, { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { getOrganizationData, clearProjects } from '../../redux/states/project/projectActions';
import StackCardOrganization from '../../container/StackCard/StackCardOrganization';
import userSelectors from '../../redux/states/user/userSelector';
import projectSelectors from '../../redux/states/project/projectSelector';
import SearchInput from '../../components/SearchInput/SearchInput';
import Loading from '../Loading/Loading';
import OrganizationCreateModal from '../../container/OrganisationCreateModal/OrganisationCreateModal';
// import PermissionWrapper from '../../container/PermissionWrapper/PermissionWrapper';
// import PermissionObj from '../../permission';

const useStyle = makeStyles(() => ({
    projectsDashboardWrapper: {

    },
    headerWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
    },
    headerDiv: {
        borderRadius: '10px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
    },
    headingResult: {
        width: '100%',
        minHeight: '50vh',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleFlexWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        '& i': {
            cursor: 'pointer',
        },
    },
    snackbarWrapper: {
        position: 'absolute',
        top: '-25px',
    },
}));

const HeaderButton = withStyles(() => ({
    root: {
        padding: '7px 12px',
        fontSize: '.7rem',
        lineHeight: 'unset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .material-icons': {
            marginLeft: '20px',
        },
    },
}))(Button);

const Organization = () => {
    const classes = useStyle();
    const reduxDispatch = useDispatch();

    const  data  = useSelector(projectSelectors.getOrganizationData);
    console.log(useSelector(projectSelectors.getOrganizationData));
    const userToken = useSelector(userSelectors.getUserToken);

    const [ isOrganizationCreateModalOpen, setIsOrganizationCreateModalOpen ] = React.useState(false);
    const [ nameSearch, setSearchName ] = useState('');
    const [ filterData, setFilterData ] = useState(data);
    const [ modalData, setModalData ] = useState(false);
    const [ isOrganizationLoading, setIsOrganizationLoading ] = useState(false);
    const [ showSuccessToast, setShowSuccessToast ] = useState(false);
    const [ showErrorToast, setShowErrorToast ] = useState(false);
    const [ refresh, setRefresh ] =  useState(true);
    const [ error, setError ] = useState();

    const handleToggleCreateOrganizationModal = (bool) => {
        setIsOrganizationCreateModalOpen(bool);
    };

    const handleSearchFilter = (e) => {
        const searchValue = e.target.value;

        if (searchValue !== '') {
            const results = data.filter((organization) => organization.username.toLowerCase().includes(searchValue.toLowerCase()));
            setFilterData(results);
        } else {
            setFilterData(data);
        }

        setSearchName(searchValue);
    };

    const getOrganizationList = () => {
        setIsOrganizationLoading(true);
        console.log(userToken);
        reduxDispatch(getOrganizationData(userToken));
    };

    useEffect(() => {
        getOrganizationList();
        reduxDispatch(clearProjects());
    }, [ modalData, refresh ]);

    useEffect(() => {
        if (data?.error) {
            setError(data.error);
            setShowErrorToast(true);
            console.error(error);
        }
        if (data?.length) {
            setFilterData(data);
            setIsOrganizationLoading(false);
        } else {
            setIsOrganizationLoading(false);
            setFilterData([]);
        }
    }, [ data ]);

    const handleCloseSuccessToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSuccessToast(false);
    };

    return (
        <>
            <div className={classes.projectsDashboardWrapper}>
                <div className={classes.headerWrapper}>
                    <div className={classes.headerDiv}>
                        <div className={classes.titleFlexWrapper}>
                            <Typography variant="h6">
                                Admins
                            </Typography>
                            <Icon>
                                <i className="bx bx-help-circle" />
                            </Icon>
                        </div>
                        <SearchInput name="Search for admins" value={nameSearch} onChange={handleSearchFilter} />
                        <div>
                            {/* <PermissionWrapper validRole={PermissionObj.organizationCreateButton}> */}
                            <HeaderButton onClick={() => handleToggleCreateOrganizationModal(true)} variant="outlined">
                                Create New admin
                                <Icon>
                                    <i className="bx bxs-plus-circle" />
                                </Icon>
                            </HeaderButton>
                            {/* </PermissionWrapper> */}
                        </div>
                    </div>
                </div>
                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {filterData && filterData.length > 0 ? (
                                filterData.map((organization) => (
                                    <StackCardOrganization
                                        getOrganizationList={getOrganizationList}
                                        key={organization._id}
                                        dataOrganization={organization}
                                    />
                                ))
                            ) : (
                                <Typography className={classes.headingResult} variant="h6">No Admin found!</Typography>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <OrganizationCreateModal
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setShowSuccessToast={setShowSuccessToast}
                    setModalData={setModalData}
                    open={isOrganizationCreateModalOpen}
                    handleClose={() => handleToggleCreateOrganizationModal(false)}
                />
                <Snackbar
                    className={classes.snackbarWrapper}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={showSuccessToast || showErrorToast}
                    autoHideDuration={3000}
                    onClose={handleCloseSuccessToast}
                >
                    <Alert onClose={handleCloseSuccessToast} elevation={6} variant="filled" severity={showSuccessToast ? 'success' : 'error'}>
                        ({ showSuccessToast ? 'New Admin created' : data.error})
                    </Alert>
                </Snackbar>
            </div>
            {isOrganizationLoading && <Loading />}
        </>
    );
};

export default Organization;
