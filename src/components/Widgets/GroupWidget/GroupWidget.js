import React from 'react';
import {
    makeStyles, withStyles,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import { useFormikContext } from 'formik';
import BlockRightOptions from './BlockRightOptions';
import randomId from '../../../helpers/randomIdGenerator';
import BlockRightMultipleOptions from './BlockRightMultipleOptions';

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        maxWidth: theme.palette.maxWrapperWidgetWidth,
        width: '100%',
        margin: '20px 0px',
    },
    accordionWrapper: {
        background: theme.palette.background.default,
    },
    heading: {
        boxShadow: theme.palette.boxShadow,
        background: theme.palette.background.paper,
        borderRadius: '4px',
        borderBottom: `1px solid ${ theme.palette.divider }`,
        '& .MuiAccordionSummary-expandIcon': {
            display: 'none',
        },
        '& .MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        '& .Mui-expanded': {
            margin: '10px 0px',
        },
        '&.Mui-expanded': {
            minHeight: 'unset',
            height: '49px',
        },
    },

    accordionDetailsWrapper: {
        boxShadow: theme.palette.boxShadow,
        border: `1px solid ${ theme.palette.divider }`,
        borderRadius: '0px 0px 4px 4px',
    },
    contentWrapper: {
        padding: '20px 10px',
        width: '100%',
    },
}));

const AddMoreGroupBtn = withStyles((theme) => ({
    root: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `1px solid ${ theme.palette.divider }`,
        textTransform: 'capitalize',
        padding: '5px 20px',
        '&:hover': {
            background: theme.palette.buttonColors.primaryBtnHoverBgColor,
        },
        '&.Mui-disabled': {
            background: theme.palette.buttonColors.primaryBtnHoverBgColor,
            color: theme.palette.buttonColors.primaryBtnTextColor,
        },
    },
}))(Button);

const GroupWidget = (props) => {
    const classes = useStyles();

    const { parentKey, index } = props;
    const { setFieldValue } = useFormikContext();

    const currentParentKey = parentKey.length > 0 ? `${ parentKey }.${ index }.value` : `${ index }.value`;

    const handleCreateNewGroup = () => {
        const newGroup = {
            value: props.schema,
            data_type: 'group',
            display_name: props.display_name + (props.value.length + 1),
            nested_multiple_group: true,
            id: randomId(),
        };

        const newValue = [ ...props.value, newGroup ];
        setFieldValue(`data.${ currentParentKey }`, newValue);
    };

    const blockName = props.nested_multiple_group ? (props?.value[ 0 ]?.value || props.display_name) : props.display_name;

    return (
        <Box className={classes.boxWrapper}>
            <Accordion className={classes.accordionWrapper} elevation={0}>
                <AccordionSummary
                    expandIcon={<></>}
                    aria-controls={`${ props.display_name  }_control`}
                    id={`${ props.display_name  }_header`}
                    className={classes.heading}
                >
                    <div style={{ display: 'flex' }}>
                        <Typography>{blockName}</Typography>
                    </div>
                    {props?.isBlock ? (
                        <BlockRightOptions blocks={props?.blocks} currentKey={`${ parentKey }`} currentIndex={index} />
                    ) : <></>}
                    {props.nested_multiple_group ? (
                        <BlockRightMultipleOptions
                            schema={props.schema}
                            display_name={props.display_name}
                            value={props.value}
                            currentParentKey={currentParentKey}
                            currentKey={`${ parentKey }`}
                            currentIndex={index}
                        />
                    ) : <></>}
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetailsWrapper}>
                    <Box className={classes.contentWrapper}>
                        {props?.value?.map((widget, i) => (
                            <div key={widget.uid + widget?.display_name + widget.id}>
                                {props.widgetsMapping({ widget, parentKey: currentParentKey, index: i })}
                            </div>
                        ))}
                        {props.multiple ? (
                            <AddMoreGroupBtn color="primary" onClick={handleCreateNewGroup}>Add Group</AddMoreGroupBtn>
                        ) : <></>}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default GroupWidget;
