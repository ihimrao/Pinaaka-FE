import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

const useStyles = makeStyles(() => ({
    EntryInfoTabWrapper: {},
    headWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    statusWrapper: {
        margin: '20px 0px',
    },
}));

const EntryInfoTab = ({ data }) => {
    const info = data.data[ 0 ];
    const classes = useStyles();

    return (
        <div className={classes.EntryInfoWrapper}>
            <div className={classes.statusWrapper}>
                <div className={classes.headWrapper}>
                    <Typography variant="subtitle1">Entry ID</Typography>
                </div>
                <Typography variant="caption">
                    {info.id}
                </Typography>
            </div>
            <Divider />

            <div className={classes.statusWrapper}>
                <div className={classes.headWrapper}>
                    <Typography variant="subtitle1">Content Type ID</Typography>
                </div>
                <Typography variant="caption">
                    {info.machine_name}
                </Typography>
            </div>
            <Divider />

            <div className={classes.statusWrapper}>
                <div className={classes.headWrapper}>
                    <Typography variant="subtitle1">Created</Typography>
                </div>
                <Typography variant="caption">
                    {moment.utc(info.created_at).format('MMMM Do YYYY, hh:mm a')}
                </Typography>
            </div>
            <Divider />
            <div className={classes.statusWrapper}>
                <div className={classes.headWrapper}>
                    <Typography variant="subtitle1">Modefied</Typography>
                </div>
                <Typography variant="caption">
                    {moment.utc(info.updated_at).format('MMMM Do YYYY, hh:mm a')}
                </Typography>
            </div>
            <Divider />
        </div>
    );
};

export default EntryInfoTab;
