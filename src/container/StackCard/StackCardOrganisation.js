import React from 'react';
import Grid  from '@material-ui/core/Grid';
import Paper  from '@material-ui/core/Paper';
import * as colors from '@material-ui/core/colors';
import {  useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import CircleDiv from '../../components/CircleDiv/CircleDiv';
import pickRandomFromObj from '../../helpers/pickRandomFromObj';

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
        // top: 0,
        left: '50%',
        borderRadius: '10px',
        transform: 'translateX(-50%)',
        height: '5px',
        position: 'absolute',
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

const StackCardOrganisation = ({ dataOrganization }) => {
    const [ currentTheme, setCurrentTheme ] = React.useState(colors.blue);
    const history = useHistory();
    React.useEffect(() => {
        setCurrentTheme(pickRandomFromObj(colors));
    }, []);

    const handleStack = () => {
        history.push({
            pathname: `/${ dataOrganization._id }/projects`,
        });
    };

    const classes  = useStyle({ themeColor: currentTheme  });

    return (
        <Grid style={{ marginBottom: '30px', position: 'relative' }} sm={6} md={4} xl={3} item>
            <div className={classes.topBar} />
            <ProjectPaperWrapper>
                <div className={classes.projectTopFlex}>
                    <Typography variant="h6">
                        {dataOrganization.name.length < 21
                            ? `${ dataOrganization.name }`
                            : `${ dataOrganization.name.substring(0, 21) }...`}
                    </Typography>
                    <CircleDiv className={classes.circleMd}>
                        <i className="bx bxs-face-mask" />
                    </CircleDiv>
                </div>
                <Typography variant="caption">
                    {dataOrganization.description}
                </Typography>
                <div className={classes.bottomWrapper}>
                    <div className={classes.contributorWrapper}>
                        <CircleDiv>
                            {'hel'.slice(0, 2)}
                        </CircleDiv>
                        <CircleDiv>
                            {'hel'.slice(0, 2)}
                        </CircleDiv>
                        <CircleDiv>
                            {'hel'.slice(0, 2)}
                        </CircleDiv>
                    </div>
                    <div className={classes.timeModifiedWrapper}>
                        <Typography variant="caption">
                            Last modified:{moment(dataOrganization.updated_at ? dataOrganization.updated_at : dataOrganization.created_at).format('MMMM Do YYYY HH:MM')}
                        </Typography>
                    </div>
                </div>
                <div className={classes.btnWrapper}>
                    <OpenStackButton theme_color={currentTheme} onClick={handleStack}>
                        Open Stack
                    </OpenStackButton>

                </div>
            </ProjectPaperWrapper>
        </Grid>
    );
};

export default StackCardOrganisation;
