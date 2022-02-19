import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from 'react-loading-skeleton';
import { v4 as uuidV4 } from 'uuid';

const useStyles = makeStyles(() => ({
    skeletonDivWrapper: {
        margin: '10px 0px',
    },
    skeletonStyleWrapper: {
        margin: '5px 0px',
    },
}));

const ContentCreateWidgetLoading = () => {
    const classes = useStyles();
    return (
        <div className={classes.skeletonDivWrapper}>
            {new Array(4).fill().map(() => (
                <Skeleton key={uuidV4()} className={classes.skeletonStyleWrapper} height="60px" />
            ))}
        </div>
    );
};

export default ContentCreateWidgetLoading;
