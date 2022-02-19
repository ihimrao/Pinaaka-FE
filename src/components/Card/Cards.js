import React from 'react';
import Grid  from '@material-ui/core/Grid';
import * as colors from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import pickRandomFromObj from '../../helpers/pickRandomFromObj';

const useStyle = makeStyles((theme) => ({

    cardData: {
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '10px',
    },
    cardItemData: {
        width: '100%',

        [ theme.breakpoints.down('xs') ]: {
            width: '100%',
        },
    },
    cardRowData: {
        width: '48%',
        cursor: 'pointer',
        border: '1px solid #00000030',
        borderRadius: '10px',
        boxShadow: '5px 5px 15px -5px #D8D8D8;',
        paddingBottom: '12px',
        padding: '10px',
        marginBottom: '20px',
        fontSize: '15px',
        [ theme.breakpoints.down('sm') ]: {
            fontSize: '12px',
        },
        [ theme.breakpoints.down('xs') ]: {
            width: '100%',
            fontSize: '11px',
        },
    },
}));

const Cards = (props) => {
    const {
        columns = [], rows = [], page = 0, rowsPerPage = 0,
    } = props;
    const [ currentTheme, setCurrentTheme ] = React.useState(colors.blue);
    React.useEffect(() => {
        setCurrentTheme(pickRandomFromObj(colors));
    }, []);
    const classes  = useStyle({ themeColor: currentTheme  });

    return (
        <Grid
            style={{
                width: '100%', maxWidth: '100%', marginBottom: '30px', position: 'relative',
            }}
            sm={6}
            md={4}
            xl={3}
            item
        >

            <div className={classes.cardData}>
                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <div
                        className={classes.cardRowData}
                        hover
                        tabIndex={-1}
                        key={row.id}
                    >
                        {columns?.map((column) => {
                            const value = row[ column.id ];
                            return (
                                <div key={column.id} align={column.align} className={classes.cardItemData}>
                                    {column.format  ? column.format(column?.renderMultipleValue ? row : value) : value}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </Grid>
    );
};

export default Cards;
