import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import {
    useSelector,
    useDispatch,
} from 'react-redux';
import * as FooterButton from './BrickContentButtonComponents';
import { editBrickContent } from '../../../redux/states/content/contentAction';

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

const CreateContentFooterDiv = ({ setIsClose, setIsDisabled, isDisabled }) => {
    const classes = useStyles();
    const reduxDispatch = useDispatch();
    const { brickDetails, stack } = useSelector(({
        content, brickContent,
    }) => ({
        brickDetails: content.brickDetails,
        stack: brickContent.stack,
    }));

    const {
        projectId,
        brickId,
    } = useParams();
    const history = useHistory();
    const fetchPayload = (item) => {
        const options = item?.field_config?.fields?.find((list) => list?.name?.includes('Choices'))?.value.filter((n) => typeof n === 'object');
        const arr = options?.map((data) => ({
            value: data?.value.toLowerCase().replace(/[^A-Z0-9]+/ig, '_').trim(),
            label: data?.label.trim(),
        }));
        return arr;
    };
    const updateBrickContent = () => {
        setIsDisabled(true);
        const { name, description } =  brickDetails?.data[ 0 ];
        const data = {
            name,
            description,
            multiple: true,
            structure: {},
        };
        const init = stack?.map((item) => ({
            name: item?.field_config?.fields?.find((list) => list?.name?.includes('Display'))?.value || '',
            unique_id: item?.field_config?.fields?.find((list) => list?.name?.includes('Unique'))?.value || '',
            required: Boolean(item?.field_config?.fields?.find((list) => list?.name?.includes('Mandatory'))?.value),
            multiple: Boolean(item?.field_config?.fields?.find((list) => list?.name?.includes('Multiple'))?.value),
            type: item?.machine_name || '',
            options: item?.machine_name === 'select' ? fetchPayload(item) : [],
        })).map((e) => {
            if (e.type === 'text' || e.type === 'textarea') { delete e.options; }
            return e;
        });
        data.structure.fields = init;
        reduxDispatch(editBrickContent({
            pathParams: {
                projectId, brickId,
            },
            body: data,
        }));
        setIsDisabled(false);
    };

    return (
        <div className={classes.bottomWrapper}>
            <FooterButton.DropDownButton color="inherit" onClick={() => history.goBack()}>Cancel</FooterButton.DropDownButton>
            <FooterButton.SubmitButton
                color="primary"
                endIcon={<CheckIcon fontSize="small" />}
                onClick={() => {
                    if (brickId) { updateBrickContent(); }
                }}
                disabled={isDisabled}
            >
                Save
            </FooterButton.SubmitButton>
            <FooterButton.SubmitButton
                color="primary"
                startIcon={<VpnLockIcon fontSize="small" />}
                onClick={() => {
                    if (brickId) {
                        setIsClose(true);
                        updateBrickContent();
                    }
                }}
                disabled={isDisabled}
            >
                Save and close
            </FooterButton.SubmitButton>
        </div>

    );
};

export default CreateContentFooterDiv;
