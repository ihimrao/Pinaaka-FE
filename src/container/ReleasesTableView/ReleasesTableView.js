import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, yellow } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import 'react-loading-skeleton/dist/skeleton.css';
import tenthNumberConversion from '../../helpers/tenthNumberConversion';
import Table from '../../components/Table/Table';
import { themeColor } from '../../assets/styles/theme';

const SuccessChip = withStyles(() => ({
    root: {
        backgroundColor: green[ 400 ],
        color: themeColor.whiteColor,
        borderRadius: 5,
        fontSize: '0.7rem',
    },
}))(Chip);

const WarningChip = withStyles(() => ({
    root: {
        fontSize: '0.7rem',
        borderRadius: 5,
        backgroundColor: yellow[ 700 ],
        color: themeColor.whiteColor,
    },
}))(Chip);

const columns = [
    {
        id: 'name', label: 'Name', minWidth: 50, sortable: true,
    },
    {
        id: 'isLocked',
        label: ' ',
        minWidth: 100,
        align: 'left',
        format: (value) => (
            <>
                {value ?  (
                    <WarningChip
                        label="Item Locked"
                    />
                ) :  (
                    <SuccessChip
                        label="Item Unlocked"
                    />
                )}
            </>
        ),
    },
    {
        id: 'noOfItems',
        label: 'No of items',
        minWidth: 50,
        align: 'left',
        format: (value) => (
            <Typography style={{ color: themeColor.activeBlue }} variant="subtitle2">
                {tenthNumberConversion(value)}
            </Typography>

        ),
    },
    { id: 'status', label: 'Development Status', minWidth: 100 },
    {
        id: 'date',
        label: 'Modified At',
        minWidth: 100,
        format: (value) => (
            <>
                <Typography variant="subtitle2">
                    {moment(value).format('dddd, MMMM Do YYYY')}
                </Typography>
                <Typography variant="caption">
                    {moment(value).format('LT')}
                </Typography>
                <br />
                <Typography variant="caption">
                    {moment(value).fromNow()}
                </Typography>
            </>
        ),
    },
];

function createData(id, name, isLocked, noOfItems, status, date) {
    return {
        id, name, isLocked, noOfItems, status, date,
    };
}

const rows = [
    createData(0, '3D-banners', true, 1, 'Done by Joe', new Date()),
    createData(1, 'Banner code Bulk', true, 9, 'Code Merge Req by Austin', new Date()),
    createData(2, 'Alert Massage', false, 4, 'Testing Stage', new Date()),
    createData(3, 'blert Massage', false, 30, 'Testing Stage', new Date()),
    createData(4, 'clert Massage', false, 1000, 'Testing Stage', new Date()),
    createData(5, 'clert Massage', false, 1000, 'Testing Stage', new Date()),
    createData(6, 'clert Massage', false, 1000, 'Testing Stage', new Date()),
    createData(7, 'clert Massage', false, 1000, 'Testing Stage', new Date()),
    createData(8, 'clert Massage', false, 1000, 'Testing Stage', new Date()),

];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        boxShadow: theme.palette.tableBoxShadow,
        border: theme.palette.tableBorder,
        marginBottom: '30px',
        [ theme.breakpoints.down('l') ]: {
            flexgrow: 0,
            maxwidth: '10%',
            flexbasis: '100%',
        },
    },
    tableFilterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rightFilterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
}));

const ReleasesTableView = () => {
    const classes = useStyles();
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
    const [ currentSortBy, setCurrentSortBy ] = React.useState('name');
    const [ currentSortOrder, setCurrentSortOrder ] = React.useState('asc');
    const [ isLoading, setIsLoading ] = React.useState(false);

    const [ dataRow, setDataRow ] = React.useState([]);

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setDataRow(rows);
            setIsLoading(false);
        }, 5000);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const sortData = (sortBy, sortOrder, key) => {
        const itemsToSort = rows;
        let sortedItems = [];
        const compareFn = (i, j) => {
            if (i[ key ] < j[ key ]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (i[ key ] > j[ key ]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        };
        sortedItems = itemsToSort.sort(compareFn);
        return sortedItems;
    };

    const handleSort = (pSortBy) => {
        let sortBy = currentSortBy;
        let sortOrder = currentSortOrder;
        return () => {
            if (pSortBy === sortBy) {
                sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = pSortBy;
                sortOrder = 'asc';
            }
            const sortedItems = sortData(sortBy, sortOrder, pSortBy);

            setCurrentSortOrder(sortOrder);
            setCurrentSortBy(sortBy);
            setDataRow(sortedItems);
        };
    };

    return (
        <Paper className={classes.root}>
            <div className={classes.tableFilterWrapper}><div />
                <div className={classes.rightFilterWrapper}>
                    <IconButton>
                        <CachedIcon />
                    </IconButton>
                    <TablePagination
                        rowsPerPageOptions={[ 10, 25, 100 ]}
                        component="div"
                        count={dataRow.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>

            <Table
                columns={columns}
                rows={dataRow}
                page={page}
                rowsPerPage={rowsPerPage}
                currentSortBy={currentSortBy}
                sortOrder={currentSortOrder}
                handleSort={handleSort}
                isLoading={isLoading}
            />
        </Paper>
    );
};

export default ReleasesTableView;
