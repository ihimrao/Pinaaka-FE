import React, {  useEffect, useState } from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import DialogActions  from '@material-ui/core/DialogActions';
import Button  from '@material-ui/core/Button';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userSelectors from '../../redux/states/user/userSelector';
import { intiCreateContentMetadata } from '../../redux/states/brickContent/brickContentReducer';
import { createBricks, updateCreateContentMetadata } from '../../redux/states/brickContent/brickContentAction';
import ContentCreateFormObj from './ContentCreateFormObj';
import { storeBrickBasicDetails } from '../../redux/states/content/contentAction';

const useStyles = makeStyles(() => ({
    modalTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

const ContentCreateModal = (props) => {
    const {
        handleClose = () => {}, open, isMetadataModal = false, data = {},
    } = props;

    const classes = useStyles();
    const history = useHistory();
    const reduxDispatch = useDispatch();

    const userToken = useSelector(userSelectors.getUserToken);
    const routerParams = useRouteMatch('/:orgId/:projectId/:activeNavItem');
    const params = useParams();
    const [ formObj, setFormObj ] = useState(intiCreateContentMetadata);
    const [ errorObj, setErrorObj ] = useState({
        nameErr: false,
        descriptionErr: false,
    });
    const [ isBrickResponseLoading, setIsBrickResponseLoading ] = useState(false);
    const {  brickBasicDetails } = useSelector(({
        content,
    }) => ({
        brickBasicDetails: content.brickBasicDetails,
    }));
    const handleCheckValidation = () => {
        let isValid = false;
        if (formObj?.name?.length < 3 || formObj?.description?.length < 10) {
            let newErrorObj = {
                nameErr: false,
                descriptionErr: false,
                uniqueIdErr: false,
            };
            if (formObj?.name?.length < 3 || formObj?.name?.length > 60) {
                newErrorObj = { ...newErrorObj, nameErr: true };
            }
            if (formObj?.description?.length < 10 || formObj?.description?.length > 600) {
                newErrorObj = { ...newErrorObj, descriptionErr: true };
            }
            setErrorObj(newErrorObj);
        } else {
            setErrorObj({
                nameErr: false,
                descriptionErr: false,
            });
            isValid = true;
        }

        return isValid;
    };

    React.useEffect(() => {
        if (open && !isMetadataModal) {
            reduxDispatch(updateCreateContentMetadata(intiCreateContentMetadata));
        }
    }, [ open ]);

    useEffect(() => {
        if (open && isMetadataModal && data?.id) {
            setFormObj({
                ...formObj,
                name: data?.name,
                description: data?.description,
                uniqueId: data?.machine_name,
                type: data?.multiple_entries ? 'multiple' : 'single',
            });
        }
    }, [ open, isMetadataModal, data ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleCheckValidation()) {
            if (params?.brickId) {
                const res = brickBasicDetails;
                res.data[ 0 ].name = formObj.name;
                res.data[ 0 ].description = formObj.description;
                res.data[ 0 ].machine_name = formObj.uniqueId;
                res.data[ 0 ].multiple_entries = true;
                reduxDispatch(storeBrickBasicDetails({ ...res }));
                handleClose();
            } else {
                setIsBrickResponseLoading(true);
                // create brick obj
                const sendObj = {
                    name: formObj.name,
                    description: formObj.description,
                    multiple: true,
                    unique_id: formObj.uniqueId,
                    structure: {
                        fields: [],
                    },
                };
                // obj for function
                const funcObj = { auth: userToken, formObj: sendObj, projectId: routerParams?.params?.projectId };
                const response = await createBricks(funcObj);
                if (response.status === 200) {
                    setIsBrickResponseLoading(false);
                    history.push(`${ response.data.id }/edit-content`, formObj);
                }
            }
        }
    };

    return (
        <Dialog fullWidth maxWidth="md" className={classes.root} onClose={handleClose} open={open}>
            <form data-testid="login-form" onSubmit={handleSubmit}>
                <DialogTitle onClose={handleClose}>
                    <div className={classes.modalTitleWrapper}>
                        { params?.brickId ? 'Edit Brick Details' : 'Create New Brick'}
                        <Button
                            onClick={() => {
                                handleClose();
                                setErrorObj({});
                            }}
                            color="inherit"
                        >
                            Close
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <ContentCreateFormObj
                        isMetadataModal={isMetadataModal}
                        formObj={formObj}
                        setFormObj={setFormObj}
                        handleCheckValidation={handleCheckValidation}
                        errorObj={errorObj}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={isBrickResponseLoading}
                        onClick={() => {
                            handleClose();
                            setErrorObj({});
                        }}
                        color="inherit"
                    >
                        Close
                    </Button>
                    <Button disabled={isBrickResponseLoading} type="submit" color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ContentCreateModal;
