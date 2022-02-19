import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import PublicIcon from '@material-ui/icons/Public';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import * as FooterButton from './ButtonComponents';
import { deleteBricks } from '../../redux/sagas/requests/userReq';
import { signoutUser } from '../../redux/states/user/userActions';
import userSelectors from '../../redux/states/user/userSelector';

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

const WorkspaceFooterDiv = ({ onChildClick }) => {
    const classes = useStyles();
    const tokenAccess = useSelector(userSelectors.getUserToken);

    const {
        orgId, projectId, brickId,
    } = useParams();
    const routerHistory = useHistory();
    const reduxDispatch = useDispatch();
    const handleDelete = () => {
        deleteBricks(brickId, tokenAccess, projectId).then(() => {
            routerHistory.push(`/${ orgId }/projects/${ projectId }/content`);
        }).catch((error) => {
            reduxDispatch(signoutUser());
            routerHistory.push('/');
            console.error(error);
        });
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
                onClick={handleDelete}
            >
                Delete
            </FooterButton.DropDownButton>
            <FooterButton.DropDownButton
                color="primary"
                endIcon={<CheckIcon fontSize="small" />}
                onClick={onChildClick}
            >
                Save
            </FooterButton.DropDownButton>
            <FooterButton.DropDownButton
                color="primary"
                endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                startIcon={<VpnLockIcon fontSize="small" />}
            >
                Unpublish
            </FooterButton.DropDownButton>
            <FooterButton.SubmitButton
                color="primary"
                onClick={onChildClick}
                endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                startIcon={<PublicIcon fontSize="small" />}
            >
                Publish
            </FooterButton.SubmitButton>
        </div>

    );
};

export default WorkspaceFooterDiv;
