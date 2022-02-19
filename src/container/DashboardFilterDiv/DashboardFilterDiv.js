import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FilterDiv from './FilterDiv/FilterDiv';

const useStyles = makeStyles((theme) => ({
    filterDiv: {
    },
    formControl: {
        padding: '15px 20px 5px 20px',
        width: '100%',
    },
    listWrapper: {
        padding: '10px 20px',
    },
    stickyTop: {
        position: 'sticky',
        top: 0,
        background: theme.palette.background.paper,
        // background:
    },
}));

const CardWrapper = withStyles(() => ({
    root: {
        boxShadow: '0px 10px 37px rgba(0, 0, 0, 0.03), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
        borderRadius: '10px',
        // padding: '25px 20px',
        // height: '100%',
        overflowY: 'scroll',
        height: '60vh',
    },
}))(Paper);

const DashboardFilterDiv = () => {
    const classes = useStyles();
    return (
        <div className={classes.filterDiv}>
            <CardWrapper>
                <div className={classes.stickyTop}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            value="quickEntries"
                        >
                            <MenuItem value="quickEntries">Quick Entries</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.listWrapper}>
                    {[ 1, 2, 3, 4, 5, 6, 7 ].map((item) => (
                        <FilterDiv key={item} />
                    ))}
                </div>
            </CardWrapper>
        </div>
    );
};

export default DashboardFilterDiv;
