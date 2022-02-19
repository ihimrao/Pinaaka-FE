import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { useHistory, useParams } from 'react-router-dom';
import * as FooterButton from '../WorkspaceFooterDiv/ButtonComponents';
import { deleteOrganisation } from '../../redux/sagas/requests/organizationReq';
import userSelectors from '../../redux/states/user/userSelector';
import ProjectEditModal from '../ProjectEditModal/ProjectEditModal';

const useStyles = makeStyles((theme) => ({
    bottomWrapper: {
        position: 'sticky',
        bottom: '10px',
        padding: '10px 20px',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.boxShadow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        zIndex: 999,
    },
}));

const OrganisationActions = () => {
    const classes = useStyles();
    const [ isContentCreateModalOpen, setIsContentCreateModalOpen ] = React.useState(false);
    const tokenAccess = useSelector(userSelectors.getUserToken);
    const routerHistory = useHistory();
    const { orgId } = useParams();

    const handleToggleCreateContentModal = (bool) => {
        setIsContentCreateModalOpen(bool);
    };

    const handleDeleteOrganisation = () => {
        deleteOrganisation(tokenAccess, orgId).then(() => {
            routerHistory.push('/organisation');
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleEditProject = () => {
        handleToggleCreateContentModal(true);
    };

    return (
        <div className={classes.bottomWrapper}>
            <FooterButton.TextMutedButton color="inherit">Cancel</FooterButton.TextMutedButton>
            <FooterButton.DropDownButton
                color="primary"
                endIcon={<KeyboardArrowDownIcon fontSize="small" />}
            >
                More
            </FooterButton.DropDownButton>
            <FooterButton.DropDownButton
                color="primary"
                startIcon={<DeleteIcon fontSize="small" />}
                onClick={handleDeleteOrganisation}
            >
                Delete
            </FooterButton.DropDownButton>
            <FooterButton.DropDownButton
                color="primary"
                startIcon={<EditIcon fontSize="small" />}
                onClick={handleEditProject}
            >
                Edit
            </FooterButton.DropDownButton>
            <FooterButton.DropDownButton
                color="primary"
                endIcon={<CheckIcon fontSize="small" />}
            >
                Save
            </FooterButton.DropDownButton>
            <ProjectEditModal open={isContentCreateModalOpen} handleClose={() => handleToggleCreateContentModal(false)} />
        </div>

    );
};

export default OrganisationActions;
