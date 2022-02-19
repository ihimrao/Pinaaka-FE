import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

const useStyles = makeStyles(() => ({
    statusTabWrapper: {},
    headWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    statusWrapper: {
        margin: '20px 0px',
    },
}));

const StatusTab = ({ data }) => {
    const classes = useStyles();

    return (
        <div className={classes.statusTabWrapper}>
            <div className={classes.headWrapper}>
                <Typography variant="subtitle1">Publish Status</Typography>
                <IconButton size="small">
                    <CachedIcon fontSize="small" />
                </IconButton>
            </div>

            <div className={classes.statusWrapper}>
                <Typography variant="body1">{data[ data.length - 2 ]?.title}</Typography>
                <Typography variant="caption">
                    <Typography variant="caption" color="primary">Version</Typography>  {data[ data.length - 2 ]?.version} is publish, {data && Array.isArray(data?.data) && moment(data?.data[ 0 ]?.updated_at).fromNow()}
                </Typography>
                <br />
                <Typography variant="caption">
                    By {data[ data.length - 2 ]?.created_by}
                </Typography>
            </div>
            <Divider />
            <div className={classes.statusWrapper}>
                <Typography variant="body1">{data[ data.length - 3 ]?.title}</Typography>
                <Typography variant="caption">
                    <Typography variant="caption" color="primary">Version</Typography>  {data[ data.length - 3 ]?.version} is publish, {data && Array.isArray(data?.data) && moment(data?.data[ 0 ]?.updated_at).fromNow()}
                </Typography>
                <br />
                <Typography variant="caption">
                    By {data[ data.length - 3 ]?.created_by}
                </Typography>
            </div>
            <Divider />
        </div>
    );
};

export default StatusTab;
