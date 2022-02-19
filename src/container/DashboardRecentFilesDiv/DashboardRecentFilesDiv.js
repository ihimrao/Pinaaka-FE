import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography  from '@material-ui/core/Typography';
import Grid  from '@material-ui/core/Grid';
import RecentSingleCard from './RecentSingleCard/RecentSingleCard';

const useStyles = makeStyles((theme) => ({
    recentFilesWrapper: {},
    header: {
        borderRadius: '10px',
        gap: '30px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40px',
        justifyContent: 'space-between',
    },
    line: {
        width: '60%',
        background: theme.palette.lineColor,
        height: '1px',
    },

}));

const DashboardRecentFilesDiv = () => {
    const classes = useStyles();
    return (
        <div className={classes.recentFilesWrapper}>
            <div className={classes.header}>
                <div>
                    <Typography variant="h6">
                        Recently Modified Files
                    </Typography>
                    <Typography variant="caption">
                        23 files found
                    </Typography>
                </div>
                <div className={classes.line} />
            </div>
            <Grid container direction="row" spacing={3}>
                {[ 0, 1, 2, 3, 4 ].map((value) => (
                    <RecentSingleCard key={value} />

                ))}

            </Grid>
        </div>
    );
};

export default DashboardRecentFilesDiv;
