import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography';
import images from '../../assets/images/images';

const useStyles = makeStyles((theme) => ({
    dashboardNewsSectionWrapper: {
        marginTop: '20px',
        background: theme.palette.background.paper,
        boxShadow: theme.palette.boxShadow,
        borderRadius: '20px',
        padding: '25px 0px 25px 25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textHighlight: {
        color: '#F8A591',
    },
}));

const DashboardNewsSection = () => {
    const classes = useStyles();
    return (
        <div className={classes.dashboardNewsSectionWrapper}>
            <div>
                <Typography variant="h5">
                    Today&apos;s Event
                </Typography>
                <Typography variant="h6">
                    You have 9 new Modified
                    File <span className={classes.textHighlight}>Review it!</span>
                </Typography>
            </div>
            <img src={images.dashboard_news_section_art} alt="Dashboard news section art" />
        </div>
    );
};

export default DashboardNewsSection;
