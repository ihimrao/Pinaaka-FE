import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    IconButton, Paper, TablePagination, Typography,
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import moment from 'moment';
import Table from '../../components/Table/Table';

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
        justifyContent: 'space-between',
    },
});

const columns = [
    {
        id: 'name',
        label: 'TOKEN NAME',
        minWidth: 100,
        sortable: true,
    },
    {
        id: 'environment',
        label: 'ENVIRONMENT',
        minWidth: 100,
    },
    {
        id: 'created_by',
        label: 'CREATED BY',
        minWidth: 100,
        renderMultipleValue: true,
        format: (row) => (
            <>
                <Typography variant="subtitle2">
                    {row.name}
                </Typography>
                <Typography variant="p">
                    {moment(row.created_at).format('dddd, MMMM Do YYYY')}
                </Typography>
            </>
        ),
    },
];
const DeliveryTokenContainer = ({
    deliveryTokenData, setDeliveryTokenData, fetchData, loading,
}) => {
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ currentSortBy, setCurrentSortBy ] = React.useState('name');
    const [ currentSortOrder, setCurrentSortOrder ] = React.useState('asc');

    const classes = useStyles();
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const sortData = (sortBy, sortOrder, key) => {
        const itemsToSort = deliveryTokenData;
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
            setDeliveryTokenData(sortedItems);
        };
    };

    return (
        <Paper className={classes.root}>
            <div className={classes.tableFilterWrapper}>
                <div className={classes.rightFilterWrapper}>
                    <IconButton>
                        <CachedIcon onClick={fetchData} />
                    </IconButton>
                    <TablePagination
                        rowsPerPageOptions={[ 10, 25, 100 ]}
                        component="div"
                        count={deliveryTokenData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            </div>

            <Table
                loading={loading}
                columns={columns}
                rows={deliveryTokenData}
                page={page}
                rowsPerPage={rowsPerPage}
                currentSortBy={currentSortBy}
                sortOrder={currentSortOrder}
                handleSort={handleSort}
                noOfRow={5}
            />

        </Paper>
    );
};

export default DeliveryTokenContainer;
