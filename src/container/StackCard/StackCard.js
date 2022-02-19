import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as colors from '@material-ui/core/colors';
import { useHistory, useParams } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircleDiv from '../../components/CircleDiv/CircleDiv';
import pickRandomFromObj from '../../helpers/pickRandomFromObj';
import { WarningModal } from '../../components/CustomModal/CustomModal';
import { deleteProjectById } from '../../redux/states/project/projectActions';

const useStyle = makeStyles(() => ({
    projectTopFlex: {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circleMd: {
        width: '40px',
        height: '40px',
        fontSize: '1.5rem',
        backgroundColor: (props) => props.themeColor[ 300 ],
    },
    contributorWrapper: {
        margin: '20px 0px',
        display: 'flex',
        alignItems: 'center',
        '& > div': {
            width: '30px',
            height: '30px',
            fontSize: '.7rem',
            textTransform: 'uppercase',
        },
        '& > div:nth-child(1)': {
            backgroundColor: '#6EAC74',
        },
        '& > div:nth-child(2)': {
            transform: 'translateX(-10px)',
            backgroundColor: '#FCE5C9',
        },
        '& > div:nth-child(3)': {
            backgroundColor: '#2C5CC9',
            transform: 'translateX(-20px)',
        },
    },
    bottomWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0px 0px 10px 0px',
    },
    timeModifiedWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    btnWrapper: {
        position: 'relative',
    },
    topBar: {
        backgroundColor: (props) => props.themeColor[ 300 ],
        width: '90%',
        left: '50%',
        borderRadius: '10px',
        transform: 'translateX(-50%)',
        height: '5px',
        position: 'absolute',
    },
    dltBtnWrapper: {
        position: 'absolute',
        right: 30,
        bottom: 20,
    },
    circleWrapper: {
        display: 'none',
    },
    cardIcon: {
        width: '60px',
    },
    descriptionWrapper: {
        textAlign: 'right',
    },
}));

const ProjectPaperWrapper = withStyles(() => ({
    root: {
        padding: '20px',
        boxShadow: '5px 5px 20px -5px #00000030',
        borderRadius: '10px',
    },
}))(Paper);

const OpenStackButton = withStyles(() => ({
    root: {
        backgroundColor: (props) => props.theme_color[ 600 ],
        maxWidth: '45%',
        position: 'absolute',
        width: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-40px',
        padding: '10px 0',
        fontSize: '.8rem',
        '& .MuiButton-label': {
            color: 'white',
        },
        '&:hover': {
            backgroundColor: (props) => props.theme_color[ 800 ],
            color: 'red',
        },
    },
}))(Button);

const StackCard = ({ dataProject, token, getProjectData }) => {
    const [ currentTheme, setCurrentTheme ] = React.useState(colors.blue);
    const reduxDispatch = useDispatch();
    const history = useHistory();
    const { orgId } = useParams();
    const [ isDltWarningModal, setIsDltWarningModal ] = React.useState(false);
    const [ isDeleteSuccess, setIsDeleteSuccess ] = React.useState(false);
    const [ isDeleteInProgress, setIsDeleteInProgress ] = React.useState(false);

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
    };

    const handleDeleteOrganization = async () => {
        setIsDeleteInProgress(true);
        const response = await deleteProjectById({
            orgId, projectId: dataProject.id, token,
        });
        if (response.status === 200) {
            toggleDltSuccessToast(true);
            toggleDltWarningModal(false);
            reduxDispatch(getProjectData(token, orgId));
            setIsDeleteInProgress(false);
        }
    };

    React.useEffect(() => {
        setCurrentTheme(pickRandomFromObj(colors));
    }, []);

    const handleStack = () => {
        history.push({
            pathname: `/${ orgId }/${ dataProject.id }/dashboard`,
            name: dataProject.name,
        });
    };

    const classes = useStyle({ themeColor: currentTheme });

    return (
        <Grid style={{ marginBottom: '30px', position: 'relative' }} sm={6} md={4} xl={3} item>
            <div className={classes.topBar} />
            <ProjectPaperWrapper>
                <div className={classes.projectTopFlex}>
                    <Typography variant="h6">
                        {dataProject.key.length < 21
                            ? `${ dataProject.key }`
                            : `${ dataProject.key.substring(0, 21) }...`}
                    </Typography>
                    {/* {dataProject?.icon == '' ? (
                        <img src={dataProject.icon} alt="icon" className={classes.cardIcon} />
                    ) : ( */}
                    <CircleDiv className={classes.circleMd}>
                        <i className="bx bxs-face-mask" />
                    </CircleDiv>
                    {/* )} */}
                </div>
                <div className={classes.descriptionWrapper}>
                    <Typography variant="caption">
                        Days: {dataProject.days}
                    </Typography>
                </div>
                <div className={classes.bottomWrapper}>
                    <div className={classes.contributorWrapper}>
                        <CircleDiv className={classes.circleWrapper}>
                            {'hel'.slice(0, 2)}
                        </CircleDiv>
                        <CircleDiv className={classes.circleWrapper}>
                            {'hel'.slice(0, 2)}
                        </CircleDiv>
                        <CircleDiv className={classes.circleWrapper}>
                            {'hel'.slice(0, 2)}
                        </CircleDiv>
                    </div>
                    <div className={classes.timeModifiedWrapper}>
                        <Typography variant="caption">
                            Expire on: {moment(dataProject.expireAt ? dataProject.expireAt : 'Not Logged In').format('MMMM DD YYYY HH:MM')}
                        </Typography>
                    </div>
                </div>
                <IconButton onClick={() => toggleDltWarningModal(true)} className={classes.dltBtnWrapper} size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>

                <div className={classes.btnWrapper}>
                    <OpenStackButton theme_color={currentTheme} onClick={handleStack}>
                        Open User
                    </OpenStackButton>

                </div>
            </ProjectPaperWrapper>
            <WarningModal
                isLoading={isDeleteInProgress}
                handleAgree={handleDeleteOrganization}
                isOpen={isDltWarningModal}
                handleClose={() => toggleDltWarningModal(false)}
            >
                Are you sure you want to delete &nbsp;
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {dataProject.key < 21
                        ? `${ dataProject.key }`
                        : `${ dataProject.key.substring(0, 21) }...`}
                </span> project?
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
                    User deleted successfully!
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default StackCard;
