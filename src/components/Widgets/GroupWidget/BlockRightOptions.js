import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { useFormikContext } from 'formik';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import resolvePath from '../../../helpers/resolvePathObj';
import { WarningModal } from '../../CustomModal/CustomModal';
import randomId from '../../../helpers/randomIdGenerator';
import structureTemplateObj from '../BlockWidget/structureTemplateObj_helper';

const useStyles = makeStyles(() => ({
    accordionRightBtnWrapper: {
        margin: '0px 5px',
    },
    blockNameSpan: {
        fontWeight: 'bold',
    },
}));

const BlockRightOptions = (props) => {
    const classes = useStyles();

    const { setFieldValue, values } = useFormikContext();
    const [ isDltWarningModalOpen, setIsDltWarningModalOpen ] = React.useState(false);
    const [ anchorEl, setAnchorEl ] = React.useState(null);

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

    const handleOpenAddBlockDropdown = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAddBlockDropdown = () => {
        setAnchorEl(null);
    };

    const handleAddTemplate = (template) => {
        const newGroup = structureTemplateObj(template);
        const arr = resolvePath(values, `data.${ props.currentKey }`);
        arr.splice(props.currentIndex + 1, 0, newGroup);
        setFieldValue(`data.${ props.currentKey }`, arr);
        handleCloseAddBlockDropdown();
    };

    const renderBlocksList = () => props?.blocks?.map((block) => (
        <MenuItem
            onClick={(e) => {
                e.stopPropagation();
                handleAddTemplate(block);
            }}
            key={randomId()}
        >{block.title}
        </MenuItem>
    ));

    return (
        <div>
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
            <Tooltip title="Add block below">
                <IconButton
                    onClick={handleOpenAddBlockDropdown}
                    className={classes.accordionRightBtnWrapper}
                    size="small"
                >
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseAddBlockDropdown}
                PaperProps={{
                    style: {
                        maxHeight: 100 * 2.5,
                    },
                }}
            >
                {renderBlocksList()}
            </Menu>
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

export default BlockRightOptions;
