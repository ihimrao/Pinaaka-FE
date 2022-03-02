/* eslint-disable no-unused-vars */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as colors from '@material-ui/core/colors';
import { useHistory, useParams } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Card, Stack } from '@mui/material';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import Loop from '@material-ui/icons/Loop';
import IconButton from '@material-ui/core/IconButton';
import { FaEllipsisH } from 'react-icons/fa';
import { MdOutlineDomain } from 'react-icons/md';
import VuiBox from '../../components/VuiBox';
import VuiTypography from '../../components/VuiTypography';
import Graph from '../../assets/images/shapes/graph-billing.svg';
import balance from '../../assets/images/billing-background-balance.png';
import CircleDiv from '../../components/CircleDiv/CircleDiv';
import pickRandomFromObj from '../../helpers/pickRandomFromObj';
import { WarningModal } from '../../components/CustomModal/CustomModal';
import { deleteProjectById, resetKeyById } from '../../redux/states/project/projectActions';

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
    const [ isRstWarningModal, setIsRstWarningModal ] = React.useState(false);
    const [ isDeleteSuccess, setIsDeleteSuccess ] = React.useState(false);
    const [ isDeleteInProgress, setIsDeleteInProgress ] = React.useState(false);

    const toggleDltWarningModal = (bool) => {
        setIsDltWarningModal(bool);
    };
    const toggleRstWarningModal = (bool) => {
        setIsRstWarningModal(bool);
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

    const handleDeleteKey = async () => {
        setIsDeleteInProgress(true);
        const response = await deleteProjectById({
            key: dataProject.key, token,
        });
        if (response?.status === 200) {
            toggleDltSuccessToast(true);
            toggleDltWarningModal(false);
            reduxDispatch(getProjectData(token, orgId));
            setIsDeleteInProgress(false);
        }
    };
    const handleResetKey = async () => {
        setIsDeleteInProgress(true);
        const response = await resetKeyById({
            key: dataProject.key, token,
        });
        if (response?.status === 200) {
            toggleDltSuccessToast(true);
            toggleRstWarningModal(false);
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
        <Grid style={{ marginBottom: '10px', position: 'relative' }} sm={4} md={4} xl={3} item>

            <Card sx={{ padding: '30px', borderRadius: '30px', background: '#09112c' }}>
                <VuiBox display="flex" flexDirection="column">
                    <VuiBox
                        mb="32px"
                        p="20px"
                        display="flex"
                        flexDirection="column"
                        sx={{ backgroundImage: `url(${ balance })`, backgroundSize: 'cover', borderRadius: '28px' }}
                    >
                        <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
                            <VuiTypography variant="caption" fontWeight="medium" mr="auto">
                                Key Details
                            </VuiTypography>
                            <IconButton style={{ color: '#FF0000' }} onClick={() => toggleDltWarningModal(true)} size="small">
                                <DeleteIcon fontSize="small" color="#ffffff" />
                            </IconButton>
                            {/* <FaEllipsisH color="white" size="18px" sx={{ cursor: 'pointer' }} /> */}
                        </VuiBox>
                        <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
                            <VuiTypography variant="h6" fontWeight="bold" mr="auto">
                                {dataProject.key.length < 21
                                    ? `${ dataProject.key }`
                                    : `${ dataProject.key.substring(0, 21) }...`}:{dataProject.password.length < 21
                                    ? `${ dataProject.password }`
                                    : `${ dataProject.password.substring(0, 21) }...`}
                            </VuiTypography>
                            <IconButton style={{ color: '#ffffff' }} onClick={() => toggleRstWarningModal(true)} size="small">
                                <Loop fontSize="small" color="#ffffff"  />
                            </IconButton>
                        </VuiBox>
                    </VuiBox>

                    <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
                        <Stack direction="row" spacing="10px" mr="auto">
                            <VuiBox
                                display="flex"
                                mr="10px"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    background: 'rgba(34, 41, 78, 0.7)',
                                    borderRadius: '50%',
                                    width: '42px',
                                    height: '42px',
                                }}
                            >
                                <MdOutlineDomain color="#01b574" size="20px" />
                            </VuiBox>
                            <VuiBox display="flex" flexDirection="column" style={{ marginTop: '0px' }}>

                                <VuiTypography variant="button" fontWeight="medium">
                                    Expire on: {dataProject?.expireAt ? moment(dataProject?.expireAt ? dataProject?.expireAt : 'Not Logged In').format('MMMM DD YYYY HH:MM') : 'Not Logged In'}

                                </VuiTypography>
                                <VuiTypography variant="button" fontWeight="medium">
                                    Device: {dataProject?.deviceId}

                                </VuiTypography>
                            </VuiBox>
                        </Stack>
                        <VuiTypography
                            variant="button"
                            fontWeight="bold"
                            style={{ color: '#ffffff' }}
                        >
                            {dataProject.days} Days
                        </VuiTypography>
                    </VuiBox>
                </VuiBox>
            </Card>

            <WarningModal
                isLoading={isDeleteInProgress}
                handleAgree={handleDeleteKey}
                isOpen={isDltWarningModal}
                title="Delete Key"
                handleClose={() => {
                    toggleDltWarningModal(false);
                }}
            >
                Are you sure you want to delete &nbsp;
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {dataProject.key}
                </span> Key?
            </WarningModal>
            <WarningModal
                isLoading={isDeleteInProgress}
                handleAgree={handleResetKey}
                isOpen={isRstWarningModal}
                title="Reset Key"
                handleClose={() => {
                    toggleRstWarningModal(false);
                }}
            >
                Are you sure you want to Reset &nbsp;
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {dataProject.key}
                </span> Key?
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
                    Key deleted successfully!
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default StackCard;
