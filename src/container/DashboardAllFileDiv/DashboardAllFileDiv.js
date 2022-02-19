import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    allFileDivWrapper: {
        marginTop: '40px',
    },
    header: {
        borderRadius: '10px',
        gap: '30px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px',
        justifyContent: 'space-between',
    },
    line: {
        width: '60%',
        background: theme.palette.lineColor,
        height: '1px',
    },
    tableBodyRowIconWrapper: {
        width: '20px',
        height: '20px',
        background: '#FA7683',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        fontSize: '.8rem',
    },
    flexBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
}));

const TableHeadWrapper = withStyles((theme) => ({
    root: {
        background: theme.palette.background.paper,
        borderRadius: '10px',
        padding: '16px',
        position: 'sticky',
        top: 0,
    },
}))(Grid);

const TableBodyRowWrapper = withStyles((theme) => ({
    root: {
        border: `1px solid ${ theme.palette.divider }`,
        borderRadius: '10px',
        padding: '14px 16px',
        margin: '10px 0px',
    },
}))(Grid);

const DashboardAllFileDiv = () => {
    const classes = useStyles();
    return (
        <div className={classes.allFileDivWrapper}>
            <div className={classes.header}>
                <div>
                    <Typography variant="h6">
                        All Modified Files
                    </Typography>
                    <Typography variant="caption">
                        23 files found
                    </Typography>
                </div>
                <div className={classes.line} />
            </div>

            <TableHeadWrapper container>
                <Grid item xs={8}>
                    <Typography variant="subtitle2">
                        File Name
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle2">
                        Date and Time
                    </Typography>
                </Grid>
            </TableHeadWrapper>
            {[ 1, 2, 3, 4, 5, 6, 7, 8 ].map((item) => (
                <TableBodyRowWrapper key={item} container>
                    <Grid item xs={8}>
                        <div className={classes.flexBox}>

                            <div className={classes.tableBodyRowIconWrapper}>
                                <i className="bx bx-cart" />
                            </div>
                            <div>
                                <Typography variant="subtitle2">
                                    Tesco Market
                                </Typography>
                                <Typography variant="caption">
                                    Web page on demand
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2">
                            {moment(new Date()).format('dddd, MMMM Do YYYY')}
                        </Typography>
                        <Typography variant="caption">
                            {moment(new Date()).format('LT')}
                        </Typography>
                    </Grid>
                </TableBodyRowWrapper>
            ))}
        </div>
    );
};

export default DashboardAllFileDiv;
