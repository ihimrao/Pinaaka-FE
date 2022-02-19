import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { useFormikContext } from 'formik';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import structureTemplateObj from './structureTemplateObj_helper';

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        maxWidth: theme.palette.maxWrapperWidgetWidth,
        width: '100%',
        margin: '20px 0px',
    },
    templateGridWrapper: {
        margin: '10px 0px',
    },
    templateWrapper: {
        marginTop: '30px',
    },
    truncateText: {
        width: '150px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textAlign: 'left',
        textOverflow: 'ellipsis',
    },
}));

export const TemplateButton = withStyles((theme) => ({
    root: {
        textTransform: 'capitalize',
        fontWeight: 'normal',
        width: '100%',
        padding: '10px',
        justifyContent: 'flex-start',
        border: `1px solid ${ theme.palette.divider }`,

        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}))(Button);

const BlockWidget = (props) => {
    const classes = useStyles();
    const { parentKey, index } = props;

    const { setFieldValue } = useFormikContext();

    const currentParentKey = React.useMemo(() => (
        parentKey.length > 0 ? `${ parentKey }.${ index }.value` : `${ index }.value`
    ), [ parentKey, index ]);

    const handleAddTemplate = (template) => {
        const newGroup = structureTemplateObj(template);
        const newArrValue = [ ...props.value, newGroup ];
        setFieldValue(`data.${ currentParentKey }`, newArrValue);
        // setFieldValue();
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return true;
        }
        const newArrValue = props.value;
        const [ removed ] = newArrValue.splice(result.source.index, 1);
        newArrValue.splice(result.destination.index, 0, removed);
        setFieldValue(`data.${ currentParentKey }`, newArrValue);
        return true;
    };

    return (

        <Box className={classes.boxWrapper}>
            <Typography>{props.display_name}</Typography>
            {props?.value?.length > 1 ? (
                <Typography variant="caption">Start Dragging block to sort</Typography>
            ) : <></>}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={props.display_name}>
                    {(droppableProvided) => (
                        <div
                            {...droppableProvided.droppableProps}
                            ref={droppableProvided.innerRef}
                        >
                            <Box className={classes.contentWrapper}>
                                {props?.value?.map((widget, i) => (
                                    <Draggable key={widget.id} draggableId={widget.id} index={i}>
                                        {(draggableProvider) => (
                                            <div
                                                ref={draggableProvider.innerRef}
                                                {...draggableProvider.draggableProps}
                                                {...draggableProvider.dragHandleProps}
                                                style={{ ...draggableProvider.draggableProps.style }}
                                                key={widget.uid + widget?.display_name + widget?.id}
                                            >
                                                {props.widgetsMapping({
                                                    widget, parentKey: currentParentKey, index: i, isBlock: true, blocks: props?.blocks,
                                                })}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </Box>
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className={classes.templateWrapper}>
                <Typography variant="caption">Click on below template to add on blocks</Typography>
                <Grid className={classes.templateGridWrapper} container spacing={1}>
                    {props?.blocks?.map((template) => (
                        <Grid item xs={4} key={template.uid} className={classes.templateSingleBox}>
                            <TemplateButton
                                onClick={() => handleAddTemplate(template)}
                                startIcon={<AddIcon fontSize="small" />}
                            >
                                <Typography variant="caption" className={classes.truncateText}>{template?.title}</Typography>
                            </TemplateButton>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Box>
    );
};

export default BlockWidget;
