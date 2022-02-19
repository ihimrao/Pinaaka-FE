import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles }  from '@material-ui/core/styles';
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import DialogActions  from '@material-ui/core/DialogActions';
import Button  from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import Typography  from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextFieldWithLabel from '../../components/FormFields/TextFieldWithLabel';
import { editProject } from '../../redux/sagas/requests/projectReq';
import userSelectors from '../../redux/states/user/userSelector';

const useStyles = makeStyles(() => ({
    modalTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    radioLabelWrapper: {
        margin: '10px 0px',
    },
    spaceWrapper: {
        marginBottom: '20px',
    },
}));

const ProjectEditModal = (props) => {
    const classes = useStyles();
    const { handleClose = () => {}, open } = props;

    const [ data, setData ] = React.useState({
        type1: 'webpage',
        type2: 'webpage',
    });

    const handleChangeData = (obj) => {
        const { key, value } = obj;

        setData({
            ...data,
            [ key ]: value,
        });
    };

    const accessToken = useSelector(userSelectors.getUserToken);
    const routerHistory = useHistory();
    const { orgId, projectId } = useParams();
    const projectName = routerHistory.location.name;
    const [ nameProject, setNameProject ] = useState(projectName);
    const [ inputDisable ] = useState(true);

    const handleChangeNameProject = (e) => {
        setNameProject(e.target.value);
    };

    const handleSaveChange = () => {
        if (nameProject.length !== 0) {
            editProject(accessToken, nameProject, projectId, orgId).then((response) => {
                setData(response.data);
            }).catch((error) => {
                console.error(error);
            });
            routerHistory.push(`/${ orgId }/projects`);
            setNameProject('');
            handleClose();
        }
    };

    return (
        <Dialog fullWidth maxWidth="md" className={classes.root} onClose={handleClose} open={open}>
            <DialogTitle onClose={handleClose}>
                <div className={classes.modalTitleWrapper}>
                    Edit Project Name
                    <Button autoFocus onClick={handleClose} color="inherit">
                        Close
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    onChange={(e) => {
                        handleChangeData({ key: 'type1', value: e.target.value });
                    }}
                    className={classes.spaceWrapper}
                    name="type"
                    value={data.type1}
                >
                    <FormControlLabel
                        value="webpage"
                        control={<Radio />}
                        disabled={inputDisable}
                        label={(
                            <div className={classes.radioLabelWrapper}>
                                <Typography variant="body1">
                                    Webpage
                                </Typography>
                                <Typography variant="caption">
                                    (Let&apos;s you create webpage eg, Homepage, Contact Page)
                                </Typography>
                            </div>
                        )}
                    />
                    <FormControlLabel
                        value="contentBlock"
                        control={<Radio />}
                        disabled={inputDisable}
                        label={(
                            <div className={classes.radioLabelWrapper}>
                                <Typography variant="body1">
                                    Content Block
                                </Typography>
                                <Typography variant="caption">
                                    (Let&apos;s you create webpage eg, Homepage, Contact Page)
                                </Typography>
                            </div>
                        )}
                    />
                </RadioGroup>
                <Grid className={classes.spaceWrapper} container spacing={2}>
                    <Grid item xs={6}>
                        <TextFieldWithLabel
                            variant="outlined"
                            value={nameProject}
                            onChange={handleChangeNameProject}
                            name="name"
                            type="text"
                            is_required={1}
                            label="Enter Name"
                            placeholder="Enter Release Name"
                            // error={errors.email}
                            // helperText={errors.email ? 'Invalid email' : ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldWithLabel
                            variant="outlined"
                            value=""
                            // onChange={handleChange}
                            name="uniqueId"
                            type="text"
                            is_required={1}
                            label="Unique ID"
                            disabled={inputDisable}
                            // error={errors.email}
                            // helperText={errors.email ? 'Invalid email' : ''}
                        />
                    </Grid>
                </Grid>
                <RadioGroup
                    onChange={(e) => {
                        handleChangeData({ key: 'type2', value: e.target.value });
                    }}
                    className={classes.spaceWrapper}
                    name="type"
                    value={data.type2}
                >
                    <FormControlLabel
                        value="webpage"
                        control={<Radio />}
                        disabled={inputDisable}
                        label={(
                            <div className={classes.radioLabelWrapper}>
                                <Typography variant="body1">
                                    Webpage
                                </Typography>
                                <Typography variant="caption">
                                    (Let&apos;s you create webpage eg, Homepage, Contact Page)
                                </Typography>
                            </div>
                        )}
                    />
                    <FormControlLabel
                        value="contentBlock"
                        control={<Radio />}
                        disabled={inputDisable}
                        label={(
                            <div className={classes.radioLabelWrapper}>
                                <Typography variant="body1">
                                    Content Block
                                </Typography>
                                <Typography variant="caption">
                                    (Let&apos;s you create webpage eg, Homepage, Contact Page)
                                </Typography>
                            </div>
                        )}
                    />
                </RadioGroup>
                <Grid className={classes.spaceWrapper} container spacing={2}>
                    <Grid item xs={12}>
                        <TextFieldWithLabel
                            variant="outlined"
                            value=""
                            // onChange={handleChange}
                            name="name"
                            type="text"
                            is_required={1}
                            label=" Description"
                            placeholder="Enter Description"
                            rows={5}
                            multiline
                            disabled={inputDisable}
                            // error={errors.email}
                            // helperText={errors.email ? 'Invalid email' : ''}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="inherit">
                    Close
                </Button>
                <Button autoFocus onClick={handleSaveChange} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectEditModal;
