import React, { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Typography  from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';
import { getProjectData } from '../../redux/states/project/projectActions';
import { clearContent } from '../../redux/states/content/contentAction';
import StackCard from '../../container/StackCard/StackCard';
import userSelectors from '../../redux/states/user/userSelector';
import ProjectCreateModal from '../../container/ProjectCreateModal/ProjectCreateModal';
import SearchInput from '../../components/SearchInput/SearchInput';
import Loading from '../Loading/Loading';
import projectSelector from '../../redux/states/project/projectSelector';

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
        minWidth: '140px',
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

const Homepage = () => {
    const classes = useStyle();
    const reduxDispatch = useDispatch();
    const { orgId } = useParams();
    const [ isProjectCreateModalOpen, setIsProjectCreateModalOpen ] = React.useState(false);
    const projectError = useSelector(projectSelector.getProjectsError);

    const projectLoading = useSelector(projectSelector.getProjectLoading);

    const  data  = useSelector(projectSelector.getProjectsData);
    const userToken = useSelector(userSelectors.getUserToken);
    const [ nameSearch, setSearchName ] = useState('');
    const [ filterData, setFilterData ] = useState(data);
    const [ modalData, setModalData ] = useState(false);

    const handleToggleCreateProjectModal = (bool) => {
        setIsProjectCreateModalOpen(bool);
    };

    useEffect(() => {
        reduxDispatch(getProjectData(userToken, orgId));
        reduxDispatch(clearContent());
    }, []);

    useEffect(() => {
        reduxDispatch(getProjectData(userToken, orgId));
    }, [ modalData ]);

    useEffect(() => {
        if (data?.length) {
            setFilterData(data);
        }
        if (projectError) {
            setFilterData([]);
        }
    }, [ projectLoading ]);

    const handleSearchFilter = (e) => {
        const searchValue = e.target.value;

        if (searchValue !== '') {
            const results = data.filter((user) => user.key.toLowerCase().includes(searchValue.toLowerCase()));
            setFilterData(results);
        } else {
            setFilterData(data);
        }

        setSearchName(searchValue);
    };

    const handleProjectList = () => {
        if (filterData?.length > 0) {
            return filterData?.map((project) => <StackCard key={project.id} dataProject={project} token={userToken} getProjectData={getProjectData} />);
        }
        return (
            <Typography className={classes.headingResult} variant="h6">No user found in current admin stack!</Typography>
        );
    };
    return (
        <>
            <div>
                <div className={classes.projectsDashboardWrapper}>
                    <div className={classes.headerWrapper}>
                        <div className={classes.headerDiv}>
                            <Typography variant="h6">
                                Users
                            </Typography>
                            <Icon>
                                <i className="bx bx-help-circle" />
                            </Icon>
                        </div>
                        <SearchInput name="Search for Key" value={nameSearch} onChange={handleSearchFilter} />
                        <div className={classes.flexRightWrapper}>
                            <HeaderButton onClick={() => handleToggleCreateProjectModal(true)} variant="outlined">
                                Create New Key
                                <Icon>
                                    <i className="bx bxs-plus-circle" />
                                </Icon>
                            </HeaderButton>
                        </div>
                    </div>
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {!projectLoading ? (
                                    handleProjectList()
                                ) : (
                                    <Loading />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <ProjectCreateModal setModalData={setModalData} open={isProjectCreateModalOpen} handleClose={() => handleToggleCreateProjectModal(false)} orgId={orgId} />
                </div>
            </div>
        </>
    );
};

export default Homepage;
