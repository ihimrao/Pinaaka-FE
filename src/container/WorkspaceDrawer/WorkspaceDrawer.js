import React from 'react';
import { makeStyles, alpha, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import StatusTab from './TabsContent/StatusTab';
import EntryInfoTab from './TabsContent/EntryInfoTab';

const useStyles = makeStyles((theme) => ({
    gridWrapper: {
        minHeight: 'inherit',
    },
    drawerWrapper: {
        position: 'sticky',
        top: 10,
        minHeight: '80vh',
        borderRadius: '10px',
        backgroundColor: alpha(theme.palette.background.paper, 0.2),
        boxShadow: theme.palette.boxShadow,
        padding: '15px',
    },
    drawerCollapseBtnWrapper: {
        position: 'absolute',
        top: '10px',
        left: '-10%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.boxShadow,
        borderRadius: '5px',
        padding: '5px',
    },
    drawerExpandBtnWrapper: {
        position: 'absolute',
        top: '25px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.palette.boxShadow,
        borderRadius: '5px',
        padding: '2px 5px',
        right: '30px',
        paddingRight: '10px',
    },
    tabRoot: {
        flexGrow: 1,
    },
    fab: {
        height: 'unset',
        width: 'unset',
        position: 'fixed',
        top: '220px',
    },
    tabContentWrapper: {
        padding: theme.spacing(2),
    },
}));

const TabsWrapper = withStyles(() => ({
    root: {
        '& .MuiTab-root': {
            minWidth: 'unset',
        },
        '& .MuiTab-wrapper': {
            fontSize: '.7rem',
        },
    },
}))(Tabs);

const WorkspaceDrawer = (props) => {
    const classes = useStyles();

    const { isDrawerCollapsed, handleToggleDrawerCollapse } = props;

    const [ currentTabIndex, setCurrentTabIndex ] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setCurrentTabIndex(newValue);
    };
    const tabContentStructure = [
        { id: 0, label: 'Status', component: <StatusTab data={props.data}  /> },
        { id: 1, label: 'Entry Information', component: <EntryInfoTab data={props?.data} /> },
        { id: 2, label: 'Discussion', component: <div>Discussion</div> },
    ];

    const renderTabContent = (index) => {
        const currentTabContent = tabContentStructure.find((tab) => tab.id === index);

        return currentTabContent.component;
    };

    return (
        <>
            {isDrawerCollapsed ? (
                <Tooltip title="Drawer expand" aria-label="Drawer expand">
                    <Fab color="secondary" onClick={() => handleToggleDrawerCollapse(false)} className={clsx(classes.fab, classes.drawerExpandBtnWrapper)}>
                        {/* <IconButton onClick={() => handleToggleDrawerCollapse(false)} > */}
                        <NavigateBeforeIcon fontSize="small" />
                        <Typography variant="caption" style={{ minWidth: '70px' }}>Show More</Typography>
                        {/* </IconButton> */}
                    </Fab>
                </Tooltip>
            ) : (
                <Grid className={classes.gridWrapper} item xs={3}>
                    <div className={classes.drawerWrapper}>
                        <Tooltip title="Drawer expand" aria-label="Drawer collapse">
                            <IconButton onClick={() => handleToggleDrawerCollapse(true)} className={classes.drawerCollapseBtnWrapper}>
                                <NavigateNextIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <div className={classes.tabRoot}>
                            <TabsWrapper
                                value={currentTabIndex}
                                onChange={handleChangeTab}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="standard"
                                centered
                            >
                                {tabContentStructure?.map((tabs) => (
                                    <Tab key={tabs.id} label={tabs.label} />
                                ))}
                            </TabsWrapper>
                        </div>
                        <div className={classes.tabContentWrapper}>

                            {renderTabContent(currentTabIndex)}
                        </div>
                    </div>
                </Grid>
            )}
        </>
    );
};

export default WorkspaceDrawer;
