import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    breadcrumbWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    breadcrumbLinkText: {
        textTransform: 'capitalize',
    },
}));

const BreadCrumbWrapper = (props) => {
    const { breadcrumbList, breadcrumbTitle } = props;
    const classes = useStyles();

    const routerHistory = useHistory();

    return (
        <div className={classes.breadcrumbWrapper}>
            <IconButton
                onClick={() => routerHistory.goBack()}
                style={{ marginRight: '10px' }}
            >
                <NavigateBeforeIcon />
            </IconButton>
            <div>
                <Typography variant="h6">{breadcrumbTitle}</Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbList?.map((item) => {
                        if (item?.href) {
                            return (
                                <Link className={classes.breadcrumbLinkText} key={item.label} color="inherit" href={item.href}>
                                    {item.label}
                                </Link>
                            );
                        }
                        return <Typography key={item.label} color="textPrimary">{item.label}</Typography>;
                    })}
                </Breadcrumbs>
            </div>

        </div>
    );
};

export default BreadCrumbWrapper;
