import React from 'react';
import { Table as MuiTable } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, withStyles, alpha } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.text.primary,
        backgroundColor: alpha(theme.palette.divider, 0.1),
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const useStyles = makeStyles(() => ({
    tableItemContainer: {
    },
}));
const Table = (props) => {
    const classes = useStyles();
    const {
        columns = [], rows = [], page = 0, rowsPerPage = 0,
        currentSortBy, sortOrder, handleSort,
        hasTableRowClickEvent = false,
    } = props;
    const tableData =  rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <TableRow style={{ cursor: 'pointer' }} onClick={() => hasTableRowClickEvent && props.onTableRowClick(row)} hover role="checkbox" tabIndex={-1} key={row.id} className={classes.tableItemContainer}>
            {columns?.map((column) => {
                const value = row[ column.id ];
                return (
                    <TableCell key={column.id} align={column.align}>
                        {column.format  ? column.format(column?.renderMultipleValue ? row : value) : value}
                    </TableCell>
                );
            })}
        </TableRow>
    ));

    const getDisplayData = () => {
        if (Array.isArray(rows) && rows?.length > 0) {
            return tableData;
        } return (
            <TableRow className={classes.tableItemContainer}>
                <TableCell colSpan={columns.length || 5}>
                    <div style={{ height: '4rem', marginTop: '40px', textAlign: 'center' }}>
                        <p className={classes.headingResult}> No results found!</p>
                    </div>
                </TableCell>
            </TableRow>
        );
    };
    return (
        <>
            <TableContainer>
                <MuiTable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow className={classes.tableItemContainer}>
                            {columns?.map((column) => (column.sortable ? (
                                <>
                                    {column?.label && (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, maxWidth: column.maxWidth, textAlign: 'left' }}
                                        >
                                            <TableSortLabel
                                                active={currentSortBy === column.id}
                                                direction={sortOrder}
                                                onClick={handleSort(column.id)}
                                                IconComponent={ImportExportIcon}
                                            >
                                                {column.label}
                                            </TableSortLabel>
                                        </StyledTableCell>
                                    )}
                                </>
                            ) : (
                                <>
                                    {column.label &&  (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, maxWidth: column.maxWidth, textAlign: 'left' }}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    )}
                                </>
                            )))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { props.loading ? Array(props.noOfRow).fill().map(() => (
                            <TableRow key={uuid()}>
                                {Array(columns.length).fill().map(() => (
                                    <TableCell key={uuid()}>
                                        <Skeleton />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                            : getDisplayData() }
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </>
    );
};
Table.prototype = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    currentSortBy: PropTypes.string,
    sortOrder: PropTypes.string,
    handleSort: PropTypes.func,
};
export default Table;
