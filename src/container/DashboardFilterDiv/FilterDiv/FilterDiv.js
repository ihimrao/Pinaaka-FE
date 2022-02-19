import { makeStyles, withStyles } from '@material-ui/core/styles';
import  Typography  from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    singleDivWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '25px 0px',
    },
    cardTextWrapper: {
        gap: '10px',
        display: 'flex',
        alignItems: 'center',
    },
    iconActive: {
        fontSize: '.6rem',
        color: theme.palette.primaryColor,
    },
}));

const TextActiveBg = withStyles((theme) => ({
    root: {
        color: theme.palette.activeBlue,
    },
}))(Typography);

const FilterDiv = () => {
    const classes = useStyles();
    return (
        <div className={classes.singleDivWrapper}>
            <div>
                <div className={classes.cardTextWrapper}>
                    <div className={classes.iconActive}>
                        <i className="bx bxs-circle" />
                    </div>
                    <div>
                        <Typography variant="subtitle1">
                            Tesco Market
                        </Typography>
                        <Typography variant="caption">
                            Tesco Market
                        </Typography>
                    </div>
                </div>
            </div>
            <TextActiveBg variant="caption">
                {moment(new Date()).format('MMMM Do, LT')}
            </TextActiveBg>
        </div>
    );
};

export default FilterDiv;
