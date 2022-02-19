import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { sectionWrapperCardStyles } from '../../../views/Content/BrickContent/brickContent.styles';
import {
    getNativeFields,
    updateCreateContentStack,
} from '../../../redux/states/brickContent/brickContentAction';
import ContentCreateWidgetLoading from './BrickCreateWidgetLoading';
import userSelectors from '../../../redux/states/user/userSelector';
import structureNewWidget from './brickContentStructureNewWidget';

const useStyles = makeStyles((theme) => ({
    widgetsWrapper: {
        maxHeight: 'inherit',
        overflowY: 'scroll',
        padding: '0px 10px',
    },
    stickyTop: {
        position: 'sticky',
        top: 0,
    },
    sectionWrapperCard: {
        ...sectionWrapperCardStyles(theme),
    },
    widgetContainer: {
        width: '100%',
        cursor: 'pointer',
        marginTop: '10px',
        background: theme.palette.background.paper,
        boxShadow: theme.palette.boxShadow,
        border: `1px solid ${ theme.palette.fade.fadeBorderColor }`,
        borderRadius: '5px',
        padding: '20px 0px 20px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 'inherit',
        fontSize: '12px',
        color: theme.palette.primary.light,
        transition: 'all .3s ease-out',
        '&:hover': {
            backgroundColor: theme.palette.fade.fadePrimaryBackgroundColor,
        },
        '@media (max-width: 800px)': {
            borderRadius: '7px',
            padding: '10px 0px 10px 10px',
        },
    },

    cloneWidget: {
        '& div': {
            transform: 'none !important',
        },
    },

}));

const WidgetContainer = ({ addNativeValues }) => {
    const classes = useStyles();
    const reduxDispatch = useDispatch();

    const widgetStack = useSelector((state) => state.brickContent.stack || []);
    const nativeFields = useSelector((state) => state.brickContent.nativeFields || []);
    const userToken = useSelector(userSelectors.getUserToken);

    const [ nativeFieldLoadingState, setNativeFieldLoadingState ] = React.useState();

    const toggleNativeFieldLoader = (type) => {
        setNativeFieldLoadingState(type);
    };

    React.useEffect(() => {
        if (nativeFields.length < 1) {
            // fetch native widgets
            toggleNativeFieldLoader('is-loading');
            reduxDispatch(getNativeFields(userToken));
        }
    }, []);

    React.useEffect(() => {
        if (nativeFields?.length > 0) {
            toggleNativeFieldLoader('loaded');
        }
    }, [ nativeFields ]);

    const handlePushToWidgetStack = (widget) => {
        const newWidgetToAdd = structureNewWidget(widget);
        const fieldArray =  newWidgetToAdd?.field_config?.fields?.map((item) => ({
            ...item,
            value: addNativeValues(newWidgetToAdd, item),
        }));
        newWidgetToAdd.field_config.fields = fieldArray;
        reduxDispatch(updateCreateContentStack([ ...widgetStack, newWidgetToAdd ]));
    };

    const getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: '0.001s',
        };
    };

    return (
        <>
            <div className={classes.widgetsWrapper}>
                <div className={`${ classes.sectionWrapperCard } ${ classes.stickyTop }`}>
                    Fields
                </div>
                {nativeFieldLoadingState === 'is-loading' ? (
                    <ContentCreateWidgetLoading />
                ) : (
                    <Droppable
                        isDropDisabled
                        droppableId="widget-container"
                    >
                        {(droppableProvider, droppableSnapshot) => (
                            <div>
                                <div
                                    ref={droppableProvider.innerRef}
                                    isDraggingOver={droppableSnapshot.isDraggingOver}
                                    {...droppableProvider.droppableProps}
                                >
                                    {nativeFields.map((fields, index) => (
                                        <Draggable
                                            key={fields.id}
                                            draggableId={fields.id}
                                            index={index}
                                        >
                                            {(draggableProvider, draggableSnapshot) => (
                                                <>
                                                    <div
                                                        aria-hidden="true"
                                                        ref={draggableProvider.innerRef}
                                                        {...draggableProvider.draggableProps}
                                                        {...draggableProvider.dragHandleProps}
                                                        onClick={() => handlePushToWidgetStack(fields)}
                                                        className={classes.widgetContainer}
                                                        isDragging={draggableSnapshot.isDragging && !draggableSnapshot.isDropAnimating}
                                                        style={getStyle(draggableProvider.draggableProps.style, draggableSnapshot)}
                                                    >
                                                        {fields.name}
                                                    </div>
                                                    {draggableSnapshot.isDragging && (
                                                        <div
                                                            className={`${ classes.widgetContainer } ${ classes.cloneWidget }`}
                                                        >
                                                            {fields.name}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                                {droppableProvider.placeholder}
                            </div>
                        )}
                    </Droppable>
                )}

            </div>
        </>
    );
};

export default WidgetContainer;
