import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { containerWrapper, sectionWrapperCardStyles } from '../../../views/Content/BrickContent/brickContent.styles';
import NoWidgetTextWrapper from './NoWidgetTextWrapper';
import {
    updateCreateContentStack,
    updateCurrentWidgetKey,
} from '../../../redux/states/brickContent/brickContentAction';
import ContentCreateModal from '../../ContentCreateModal/ContentCreateModal';
import { storeBrickBasicDetails } from '../../../redux/states/content/contentAction';
import BrickContentModal from '../../../views/Content/BrickContent/BrickContentModal';

const useStyles = makeStyles((theme) => ({
    containerWrapper: {
        ...containerWrapper(),
        maxHeight: 'inherit',
    },
    sectionWrapperCard: {
        ...sectionWrapperCardStyles(theme),
        padding: '10px 20px 10px 20px',
    },
    droppableDivWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    headingWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    createIcon: {
        fontSize: '22px',
        paddingLeft: '5px',
    },
    headingInfoContainer: {
        display: 'flex',
        fontSize: '12px',
        gap: '10px',
    },
    colorPrimary: {
        color: theme.palette.primary.main,
    },
    homepageBodyWrapper: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        border: `1px solid ${ theme.palette.fade.fadeBorderColor }`,
        marginTop: '10px',
        padding: '15px',
    },
    widgetWrapper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        border: `1px solid ${ theme.palette.fade.fadeBorderColorDarker }`,
        marginTop: '10px',
        width: '100%',
        padding: '15px',
        cursor: 'pointer',
        transition: 'all .3s ease-out',
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        fontSize: '16px',
        '&:hover': {
            backgroundColor: theme.palette.fade.fadePrimaryBackgroundColor,
        },
    },
    selectedWidget: {
        backgroundColor: theme.palette.fade.fadeContrastBackgroundColor,
        border: `2px solid ${ theme.palette.primary.main }`,
        color: theme.palette.primary.main,
        transform: 'scale(1.02)',
    },
    subWrapper: {
        flexGrow: 1,
        marginTop: '60px',
        borderRadius: '10px',
        padding: '1px',
        marginLeft: -38,
        marginRight: -25,
    },
}));

const CreateContentMainContainer = () => {
    const classes = useStyles();
    const widgetStack = useSelector((state) => state.brickContent.stack);
    const createContentMetadata = useSelector((state) => state.brickContent.contentStackMetadata);
    const currentSelectedWidgetKey = useSelector((state) => state.brickContent.currentWidgetSelected);
    const reduxDispatch = useDispatch();
    const { brickDetails, brickBasicDetails } = useSelector(({
        content,
    }) => ({
        brickDetails: content.brickDetails,
        brickBasicDetails: content.brickBasicDetails,
    }));
    const [ isCreateContentMetadataModalOpen, setIsCreateContentMetadataModalOpen ] = React.useState(false);

    const handleSetSelectedKey = (key) => {
        if (key === currentSelectedWidgetKey) {
            reduxDispatch(updateCurrentWidgetKey(null));
            return;
        }
        reduxDispatch(updateCurrentWidgetKey(key));
    };

    const handleToggleCreateContentMetadataModal = (bool) => {
        setIsCreateContentMetadataModalOpen(bool);
    };
    useEffect(() => {
        if (brickDetails && Array.isArray(brickDetails?.data)) {
            reduxDispatch(storeBrickBasicDetails({
                ...brickDetails,
            }));
        }
    }, [ brickDetails ]);

    const handleNestedDelete = (index, subIndex) => {
        widgetStack[ index ]?.value.splice(subIndex, 1);
        reduxDispatch(updateCreateContentStack(widgetStack));
    };
    return (
        <div className={classes.containerWrapper}>
            <Droppable
                droppableId="main-container"
                key="anotherUnique"
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={classes.droppableDivWrapper}
                    >
                        <div className={classes.sectionWrapperCard}>
                            <div className={classes.headingWrapper}>
                                {(Array.isArray(brickBasicDetails?.data) && brickBasicDetails?.data[ 0 ]?.name) || createContentMetadata?.name || ''}
                                <CreateOutlined onClick={() => handleToggleCreateContentMetadataModal(true)} className={classes.createIcon} />
                            </div>
                            <div className={classes.headingInfoContainer}>
                                <Typography variant="body1" className={classes.colorPrimary}>Field visibility rules: 0</Typography>
                                <Typography variant="body1">Field count: {widgetStack.length}</Typography>
                            </div>
                        </div>
                        <div className={classes.homepageBodyWrapper}>
                            {widgetStack.length ? (
                                <>
                                    {widgetStack.map((widget, index) => (
                                        <Draggable
                                            key={widget.uniqueId}
                                            draggableId={widget.uniqueId}
                                            index={index}
                                            isDragDisabled={widget?.machine_name === 'section'}
                                        >
                                            {(dragProvided) => (
                                                <div>
                                                    <div
                                                        aria-hidden="true"
                                                        ref={dragProvided.innerRef}
                                                        {...dragProvided.draggableProps}
                                                        {...dragProvided.dragHandleProps}
                                                        onClick={() => handleSetSelectedKey(index)}
                                                        className={`
                                                            ${ classes.widgetWrapper }
                                                            ${ index === currentSelectedWidgetKey ? classes.selectedWidget : {} }`}
                                                    >
                                                        <div style={{ marginTop: '6px' }}>{widget.name}</div>

                                                        {widget?.machine_name === 'section' && (
                                                            <Droppable
                                                                droppableId={widget?.uniqueId}
                                                                key="droppableSubItem"
                                                                renderClone={(provider, snapshot, rubric) => (
                                                                    <div
                                                                        ref={provider.innerRef}
                                                                        {...provider.draggableProps}
                                                                        {...provider.dragHandleProps}
                                                                        className={` ${ classes.widgetWrapper }`}
                                                                    >

                                                                        <div style={{ marginTop: '6px' }}>{widget?.value[ rubric.source.index ].name}</div>
                                                                        <IconButton
                                                                            size="small"
                                                                            type="button"
                                                                        >
                                                                            <BrickContentModal widgetStack={widget?.value} index={rubric.source.index} />

                                                                        </IconButton>

                                                                    </div>
                                                                )}
                                                            >
                                                                {(provider) => (
                                                                    <div  className={`
                                                                ${ classes.subWrapper }
                                                                ${ classes.droppableDivWrapper }`}
                                                                    >
                                                                        <div
                                                                            {...provider.droppableProps}
                                                                            ref={provider.innerRef}
                                                                        >
                                                                            {Array.isArray(widget.value) && widget.value.length > 0  ? (
                                                                                <div style={{ padding: '2px' }}>
                                                                                    {widget.value.map((item, i) => (
                                                                                        <Draggable
                                                                                            key={item.uniqueId}
                                                                                            draggableId={item.uniqueId}
                                                                                            index={i}
                                                                                        >
                                                                                            {(dragProvider) => (
                                                                                                <div>
                                                                                                    <div
                                                                                                        aria-hidden="true"
                                                                                                        ref={dragProvider.innerRef}
                                                                                                        {...dragProvider.draggableProps}
                                                                                                        {...dragProvider.dragHandleProps}
                                                                                                        onClick={(e) => {
                                                                                                            e.stopPropagation();
                                                                                                        }}
                                                                                                        className={` ${ classes.widgetWrapper }`}
                                                                                                    >

                                                                                                        <div style={{ marginTop: '6px' }}>{item.name}</div>
                                                                                                        <IconButton
                                                                                                            size="small"
                                                                                                            type="button"
                                                                                                        >
                                                                                                            <BrickContentModal widgetStack={widget?.value} index={index} handleNestedDelete={handleNestedDelete} type="nested" subIndex={i} />

                                                                                                        </IconButton>

                                                                                                    </div>
                                                                                                    {dragProvider.placeholder}
                                                                                                </div>
                                                                                            )}
                                                                                        </Draggable>
                                                                                    ))}

                                                                                </div>
                                                                            ) :  <NoWidgetTextWrapper />}
                                                                        </div>
                                                                        {provider.placeholder}
                                                                    </div>
                                                                )}
                                                            </Droppable>
                                                        )}
                                                        <IconButton
                                                            size="small"
                                                            type="button"
                                                        >
                                                            <BrickContentModal widgetStack={widgetStack} index={index} />

                                                        </IconButton>
                                                    </div>
                                                    {dragProvided.placeholder}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                </>
                            ) :  <NoWidgetTextWrapper />}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <ContentCreateModal
                isMetadataModal
                open={isCreateContentMetadataModalOpen}
                handleClose={() => handleToggleCreateContentMetadataModal(false)}
                data={Array.isArray(brickBasicDetails?.data) && brickBasicDetails?.data?.length > 0 ? brickBasicDetails?.data[ 0 ] : {}}
            />
        </div>
    );
};

export default CreateContentMainContainer;
