import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFormikContext } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import { WarningModal } from '../../CustomModal/CustomModal';
import resolvePath from '../../../helpers/resolvePathObj';
import randomId from '../../../helpers/randomIdGenerator';

const useStyles = makeStyles(() => ({
    rightSideWrapper: {},
}));

const BlockRightMultipleOptions = (props) => {
    const classes = useStyles();

    const { setFieldValue, values } = useFormikContext();

    const [ isDltWarningModalOpen, setIsDltWarningModalOpen ] = React.useState(false);

    // handle delete block from index and set in formik state
    const handleDeleteBlock = () => {
        let arr = resolvePath(values, `data.${ props.currentKey }`);
        arr = arr.filter(((item, index) => index !== props.currentIndex));
        setFieldValue(`data.${ props.currentKey }`, arr);
    };

    const handleToggleWarningModal = (bool) => {
        if (bool !== isDltWarningModalOpen) {
            setIsDltWarningModalOpen(bool);
        }
    };
    const handleRemoveBlock = () => {
        handleDeleteBlock();
        handleToggleWarningModal(false);
    };

    const handleCreateNewGroup = () => {
        const newGroup = {
            value: props.schema,
            data_type: 'group',
            display_name: props.display_name + (props.value?.length + 1),
            nested_multiple_group: true,
            id: randomId(),
        };

        const newValue = [ ...props.value, newGroup ];
        // setFieldValue(`data.${ props.currentParentKey }`, newValue);
        console.log(newValue, props);
    };

    return (
        <div className={classes.rightSideWrapper}>
            <Tooltip title="Remove this block">
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWarningModal(true);
                    }}
                    className={classes.accordionRightBtnWrapper}
                    size="small"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add another block">
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCreateNewGroup();
                    }}
                    className={classes.accordionRightBtnWrapper}
                    size="small"
                >
                    <AddIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <WarningModal
                isOpen={isDltWarningModalOpen}
                handleClose={() => handleToggleWarningModal(false)}
                handleAgree={handleRemoveBlock}
            >
                Are you sure you want to remove the block?
            </WarningModal>
        </div>
    );
};

export default BlockRightMultipleOptions;
