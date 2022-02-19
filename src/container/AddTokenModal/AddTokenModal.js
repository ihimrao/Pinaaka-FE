import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
    Button, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddTokenForm from './AddTokenForm';
import { createProjectToken, getProjectEnv } from '../../redux/sagas/requests/projectTokenReq';
import userSelector from '../../redux/states/user/userSelector';

const AddTokenModal = ({
    open, handleClose = () => { }, setAddedTokenMessage, setTokenCreated,
}) => {
    const [ formValues, setFormValues ] = useState({
        name: '',
        description: '',
        apiKey: '',
        environment: '',
    });

    const [ envData, setEnvData ] = useState({});

    const [ formErrors, setFormErrors ] = useState({
        name: '',
        description: '',
        apiKey: '',
        environment: '',
    });

    const accessToken = useSelector(userSelector.getUserToken);
    const { projectId } = useParams();

    const fetchEnvData = async () => {
        await getProjectEnv(projectId, accessToken)
            .then((res) => {
                if (res?.data) {
                    setEnvData(res.data);
                }
            })
            .catch(() => {
                setEnvData((prevState) => ({ ...prevState, environment: {} }));
            });
    };

    useEffect(() => {
        fetchEnvData();
    }, []);

    useEffect(() => {
        if (envData?.data?.[ 0 ]) {
            setFormValues((prevState) => ({ ...prevState, environment: envData.data[ 0 ].id }));
        }
    }, [ envData ]);

    const handleFormValues = (e) => {
        setFormValues({ ...formValues, [ e.target.name ]: e.target.value });
    };

    const validateValues = () => {
        let validate = true;
        const errorsObj = {
            name: '',
            description: '',
            apiKey: '',
            enviornment: '',
        };
        if (formValues.description === '' || formValues.description?.length < 3 || formValues.description?.length > 60) {
            errorsObj.description = 'Description should Be atleast 3-60 Length';
            validate = false;
        }
        if (formValues.apiKey === '' || formValues.apiKey?.length < 3 || formValues.apiKey?.length > 60) {
            errorsObj.apiKey = 'API Key should Be atleast 3-60 Length';
            validate = false;
        }
        if (formValues.name === '' || formValues.name?.length < 3 || formValues.name?.length > 60) {
            errorsObj.name = 'Name should Be atleast 3-60 Length';
            validate = false;
        }
        setFormErrors(errorsObj);
        return validate;
    };

    const handleSubmitForm = async () => {
        if (validateValues()) {
            const response = await createProjectToken(projectId, accessToken, formValues);
            if (response) {
                setTokenCreated(true);
                setAddedTokenMessage({
                    success: response,
                    message: response ? 'TOKEN CREATED SUCCESSFULLY' : 'FAILED TO CREATE TOKEN',
                    showSnackbar: true,
                });
                handleClose();
            }
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Create New Token</DialogTitle>
            <DialogContent dividers>
                <AddTokenForm formValues={formValues} handleFormValues={handleFormValues} formErrors={formErrors} envData={envData} />
            </DialogContent>
            <DialogActions>
                <Button disabled={false} autoFocus onClick={handleClose} color="inherit">
                    Close
                </Button>
                <Button disabled={false} autoFocus type="submit" color="primary" onClick={handleSubmitForm}>
                    Generate
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTokenModal;
