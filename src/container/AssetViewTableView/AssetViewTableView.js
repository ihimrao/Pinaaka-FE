import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, yellow } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Table from '../../components/Table/Table';

const SuccessChip = withStyles(() => ({
    root: {
        backgroundColor: green[ 400 ],
        color: 'white',
        borderRadius: 5,
        fontSize: '0.6rem',
        height: 'unset',
        padding: '5px 8px',
        margin: '5px 0px',
        textTransform: 'capitalize',
    },
}))(Chip);

const WarningChip = withStyles(() => ({
    root: {
        fontSize: '0.6rem',
        borderRadius: 5,
        backgroundColor: yellow[ 700 ],
        color: 'white',
        height: 'unset',
        padding: '5px 8px',
        margin: '5px 0px',
        textTransform: 'capitalize',
    },
}))(Chip);

const columns = [
    {
        id: 'name',
        label: 'Name',
        minWidth: 100,
        sortable: true,
        renderMultipleValue: true,
        format: (row) => (
            <>
                <Typography variant="subtitle2">
                    {row.name}
                </Typography>
                <WarningChip
                    label={row.assetType}
                />
            </>
        ),
    },
    {
        id: 'id',
        label: 'Unique Id',
        minWidth: 50,
        maxWidth: 100,
    },
    {
        id: 'date',
        label: 'Last Modified',
        minWidth: 80,
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
    {
        id: 'publishStatus',
        label: 'Publish Status',
        minWidth: 50,
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
];

function createData(id, name, publishStatus, date, assetType) {
    return {
        id, name, publishStatus, date, assetType,
    };
}

const rows = [
    createData('8i82hdhdbydh9927db22ed', 'Tesco Market', 1, new Date(), 'folder'),
    createData('8i82hdhdbydh9927db22ea', 'Aesco Market', 2, new Date(), 'folder'),
    createData('8i82hdhdbydh9927db22er', 'Zesco Market', 0, new Date(), 'folder'),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: '100%',
        boxShadow: '5px 10px 20px -5px #00000030',
        border: '1px solid #00000010',
        marginBottom: '30px',
    },
    tableFilterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
    },
    rightFilterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AssetViewTableView = () => {
    const classes = useStyles();
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
    const [ currentSortBy, setCurrentSortBy ] = React.useState('name');
    const [ currentSortOrder, setCurrentSortOrder ] = React.useState('asc');
    const [ dataRow, setDataRow ] = React.useState([]);
    const [ loading, setLoading ] = useState(true);

    React.useEffect(() => {
        setDataRow(rows);
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

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [ 2000 ]);
    });
    return (
        <>
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
        </>
    );
};

export default AssetViewTableView;
