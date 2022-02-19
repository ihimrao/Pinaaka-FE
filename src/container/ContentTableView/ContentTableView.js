import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import { useHistory, useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { green, yellow } from '@material-ui/core/colors';
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
        id: 'name', label: 'Name', minWidth: 100, sortable: true,
    },
    {
        id: 'description',
        label: 'Description',
        minWidth: 50,
        maxWidth: 100,
        format: (value) => (
            <>
                <Typography style={{ color: '#0D7DE4' }} variant="subtitle2">
                    {value?.length > 40 ? `${ value.substring(0, 40)  }...` : value}
                </Typography>
            </>
        ),
    },
    {
        id: 'multiple_entries',
        label: 'Entries Allowed',
        minWidth: 50,
        format: (value) => (
            <>
                {value ?  (
                    <SuccessChip
                        label="Multiple"
                    />

                ) :  (
                    <WarningChip
                        label="Single"
                    />
                )}
            </>
        ),
    },
    {
        id: 'created_at',
        label: 'Created At',
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
        id: 'updated_at',
        label: 'Modified At',
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
];

const useStyles = makeStyles({
    root: {
        width: '100%',
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

const ContentTableView = (props) => {
    const classes = useStyles();
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
    const [ currentSortBy, setCurrentSortBy ] = React.useState('name');
    const [ currentSortOrder, setCurrentSortOrder ] = React.useState('asc');

    const [ dataRow, setDataRow ] = React.useState([]);

    const routerHistory = useHistory();
    const { orgId, projectId } = useParams();

    React.useEffect(() => {
        setDataRow(props.data.data || []);
    }, [ props ]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const sortData = (sortBy, sortOrder, key) => {
        const itemsToSort = dataRow;
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

    const handleTableRowClick = (clickedRowData) => {
        routerHistory.push({
            pathname: `/${ orgId }/${ projectId }/${ clickedRowData.id }/workspace`,
        });
    };

    return (
        <>
            <Paper className={classes.root}>
                <div className={classes.tableFilterWrapper}>
                    <div className={classes.rightFilterWrapper}>
                        <IconButton>
                            <CachedIcon />
                        </IconButton>
                        <TablePagination
                            rowsPerPageOptions={[ 10, 25, 100 ]}
                            component="div"
                            count={dataRow?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
                <Table
                    hasTableRowClickEvent
                    onTableRowClick={handleTableRowClick}
                    columns={columns}
                    rows={dataRow}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    currentSortBy={currentSortBy}
                    sortOrder={currentSortOrder}
                    handleSort={handleSort}
                    loading={props.isLoading}
                    noOfRow={4}
                />
            </Paper>
        </>
    );
};
export default ContentTableView;
