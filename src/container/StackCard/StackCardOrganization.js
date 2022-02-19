import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import * as colors from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CircleDiv from '../../components/CircleDiv/CircleDiv';
import pickRandomFromObj from '../../helpers/pickRandomFromObj';
import { WarningModal } from '../../components/CustomModal/CustomModal';
import { deleteOrganizationById } from '../../redux/states/project/projectActions';
import userSelectors from '../../redux/states/user/userSelector';

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
        '& .MuiSvgIcon-root': {
        },
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
        minWidth: '40%',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-40px',
        padding: '10px 30px',
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

const StackCardOrganization = ({ dataOrganization, getOrganizationList = () => { } }) => {
    const [ currentTheme, setCurrentTheme ] = React.useState(colors.blue);
    const classes = useStyle({ themeColor: currentTheme });
    console.log('new', dataOrganization);
    const [ isDltWarningModal, setIsDltWarningModal ] = React.useState(false);
    const [ isDeleteSuccess, setIsDeleteSuccess ] = React.useState(false);
    const [ isDeleteInProgress, setIsDeleteInProgress ] = React.useState(false);

    const userToken = useSelector(userSelectors.getUserToken);

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

    const history = useHistory();

    React.useEffect(() => {
        setCurrentTheme(pickRandomFromObj(colors));
    }, []);

    const handleDeleteOrganization = async () => {
        setIsDeleteInProgress(true);
        const response = await deleteOrganizationById({
            orgId: dataOrganization._id, token: userToken,
        });
        if (response === 200) {
            toggleDltSuccessToast(true);
            toggleDltWarningModal(false);
            getOrganizationList();
            setIsDeleteInProgress(false);
        }
    };

    const handleStack = () => {
        history.push({
            pathname: `/${ dataOrganization._id }/keys`,
        });
    };
    return (
        <Grid style={{ marginBottom: '30px', position: 'relative' }} sm={6} md={4} xl={3} item>
            <div className={classes.topBar} />
            <ProjectPaperWrapper>
                <div className={classes.projectTopFlex}>
                    <Typography variant="h6">
                        {dataOrganization.username.length < 21
                            ? `${ dataOrganization.username }`
                            : `${ dataOrganization.username.substring(0, 21) }...`}
                    </Typography>
                    {dataOrganization?.photo !== '' ? (
                        <img src={dataOrganization.photo} alt="icon" className={classes.cardIcon} />
                    ) : (
                        <CircleDiv className={classes.circleMd}>
                            <i className="bx bxs-face-mask" />
                        </CircleDiv>
                    )}
                </div>
                <div className={classes.descriptionWrapper}>
                    <Typography variant="caption">

                        {dataOrganization.firstName + dataOrganization.lastName}

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
                            Last modified: {moment.utc(dataOrganization.updatedAt ? dataOrganization.updatedAt : dataOrganization.updatedAt).format('MMMM Do YYYY, hh:mm a')}
                        </Typography>
                    </div>
                </div>
                <IconButton onClick={() => toggleDltWarningModal(true)} className={classes.dltBtnWrapper} size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
                <div className={classes.btnWrapper}>
                    <OpenStackButton theme_color={currentTheme} onClick={handleStack}>
                        Open Admin
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
                    {dataOrganization.username.length < 21
                        ? `${ dataOrganization.username }`
                        : `${ dataOrganization.username.substring(0, 21) }...`}
                </span> organization?
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
                    Organization deleted successfully!
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default StackCardOrganization;
