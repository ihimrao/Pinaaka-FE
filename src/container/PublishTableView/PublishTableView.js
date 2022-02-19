import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Table from '../../components/Table/Table';

const StatusChip = withStyles(() => ({
    root: {
        backgroundColor: blue[ 400 ],
        color: 'white',
        borderRadius: 5,
        fontSize: '0.7rem',
    },
}))(Chip);

const columns = [
    {
        id: 'time',
        label: 'Time',
        minWidth: 100,
        format: (value) => (
            <>
                <Typography variant="subtitle2">
                    {moment(value).format('MMMM Do, YYYY')}
                </Typography>
                <Typography variant="caption">
                    {moment(value).format('LT')}
                </Typography>
            </>
        ),
    },
    {
        id: 'entry', label: 'Entry', minWidth: 100,
    },
    {
        id: 'contentType', label: 'Content Type', minWidth: 100,
    },
    {
        id: 'version', label: 'Version', minWidth: 100,
    },
    {
        id: 'type', label: 'Type', minWidth: 100,
    },
    {
        id: 'language', label: 'Language', minWidth: 100,
    },
    {
        id: 'user', label: 'User', minWidth: 100,
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        format: (value) => (
            <StatusChip
                label={value}
            />
        ),
    },
];

function createData(id, time, entry, contentType, version, type, language, user, status) {
    return {
        id, time, entry, contentType, version, type, language, user, status,
    };
}

const rows = [
    createData(0, new Date(), '8i82hdhdbydh9927db22ed', 'Standrad Collection 01', 40, 'entry', 'English - United State', 'Rachiy Bhaat', 'Publish'),
    createData(1, new Date(), '8i82hdhdbydh9927db22ed', 'Standrad Collection', 40, 'entry', 'English - United State', 'Rachiy Bhaat', 'Publish'),
    createData(2, new Date(), '8i82hdhdbydh9927db22ed', 'Standrad Collection', 40, 'entry', 'English - United State', 'Rachiy Bhaat', 'Publish'),
    createData(3, new Date(), '8i82hdhdbydh9927db22ed', 'Standrad Collection', 40, 'entry', 'English - United State', 'Rachiy Bhaat', 'Publish'),
];

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        boxShadow: '5px 10px 20px -5px #00000030',
        border: '1px solid #00000010',
        marginBottom: '30px',
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

const PublishTableView = () => {
    const classes = useStyles();
    const [ loading, setLoading ] = useState(true);
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
    const [ currentSortBy, setCurrentSortBy ] = React.useState('name');
    const [ currentSortOrder, setCurrentSortOrder ] = React.useState('asc');

    const [ dataRow, setDataRow ] = React.useState([]);

    useEffect(() => {
        setDataRow(rows);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [ 2000 ]);
    });

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
            <div className={classes.tableFilterWrapper}>
                <div />
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
                loading={loading}
                noOfRow={5}
            />

        </Paper>
    );
};

export default PublishTableView;
