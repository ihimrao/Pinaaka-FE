import React from 'react';
import Grid  from '@material-ui/core/Grid';
import Paper  from '@material-ui/core/Paper';
import Typography  from '@material-ui/core/Typography';
import { withStyles, makeStyles }  from '@material-ui/core/styles';
import Icon  from '@material-ui/core/Icon';
import moment from 'moment';
import * as colors from '@material-ui/core/colors';
import pickRandomFromObj from '../../../helpers/pickRandomFromObj';

const useStyles = makeStyles(() => ({
    cardTopFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardBottomFlex: {
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

const CardWrapper = withStyles(() => ({
    root: {
        boxShadow: '0px 9px 27px rgba(0, 0, 0, 0.07)',
        borderRadius: '20px',
        padding: '15px 20px',
    },
}))(Paper);

const LetterProfileWrapper = withStyles((theme) => ({
    root: {
        boxShadow: 'unset',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35px',
        height: '35px',
        color: theme.palette.primaryText,
        backgroundColor: (props) => props.theme_color[ 100 ],
    },
}))(Paper);

const RecentSingleCard = () => {
    const classes = useStyles();
    const desc = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt expedita at illo. Dignissimos hic, ab eos totam nisi quam expedita?';
    const color =  pickRandomFromObj(colors);
    return (
        <Grid item xs={12} sm={6} md={4}>
            <CardWrapper>
                <div className={classes.cardTopFlex}>
                    <LetterProfileWrapper theme_color={color}>
                        J
                    </LetterProfileWrapper>
                    <Typography variant="caption">
                        {moment(new Date()).format('MMMM Do, LT')}
                    </Typography>
                </div>
                <div className={classes.cardBottomFlex}>
                    <div style={{ width: '100%' }}>
                        <Typography variant="subtitle2">
                            James Robinson
                        </Typography>
                        <Typography variant="caption">
                            {desc.length > 25 ? `${ desc.substring(0, 25) }...` : desc}
                        </Typography>
                    </div>
                    <Icon>
                        <i className="bx bx-chevron-right" />
                    </Icon>
                </div>
            </CardWrapper>
        </Grid>
    );
};

export default RecentSingleCard;
