import React from 'react';
import {
    Divider,
    FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import TextFieldWithLabel from '../../components/FormFields/TextFieldWithLabel';

const useStyles = makeStyles(() => ({
    root: {
        padding: '10px 0',
    },
    spaceWrapper: {
        marginBottom: '20px',
    },
    divider: {
        margin: '0 0 20px',
    },
}));

const AddTokenForm = ({
    formValues, handleFormValues, formErrors, envData,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl fullWidth>
                <Alert severity="info" className={classes.spaceWrapper}>
                    To fetch content using the Content Delivery APIs, you need to authenticate with Stack API key and Delivery Token.
                </Alert>
                <Grid container spacing={2} className={classes.spaceWrapper}>
                    <Grid item xs={6}>
                        <TextFieldWithLabel
                            value={formValues.name}
                            name="name"
                            type="text"
                            is_required={1}
                            label="Name"
                            onChange={handleFormValues}
                            error={formErrors.name}
                            helperText={formErrors.name}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={classes.spaceWrapper}>
                    <Grid item xs={6}>
                        <TextFieldWithLabel
                            value={formValues.description}
                            name="description"
                            type="text"
                            is_required={1}
                            label="Description"
                            onChange={handleFormValues}
                            error={formErrors.description}
                            helperText={formErrors.description}
                        />
                    </Grid>
                </Grid>
                <div className={classes.spaceWrapper}>
                    <div className={classes.spaceWrapper}>
                        <Typography variant="p">Scope</Typography>
                    </div>
                    <div>
                        <Typography variant="p">Publishing Environments (required)</Typography>
                    </div>
                    <div className={classes.spaceWrapper}>
                        <Typography variant="p">
                            Select a publishing environment. The Delivery Token will be able to fetch content of only
                            the environment that you select here.
                        </Typography>
                    </div>
                    <RadioGroup
                        className={classes.spaceWrapper}
                        name="environment"
                        value={formValues.environment}
                        row
                        onChange={handleFormValues}
                    >
                        {envData?.data?.length && envData.data?.map((env) => (
                            <FormControlLabel
                                value={env.id}
                                control={<Radio />}
                                key={env.id}
                                label={(
                                    <div className={classes.radioLabelWrapper}>
                                        <Typography variant="body1">
                                            {env.name}
                                        </Typography>
                                    </div>
                                )}
                            />
                        ))}
                    </RadioGroup>
                </div>
                <Divider variant="middle" className={`${ classes.divider }`} />
                <Grid container spacing={2} className={classes.spaceWrapper}>
                    <Grid item xs={6}>
                        <TextFieldWithLabel
                            value={formValues.apiKey}
                            name="apiKey"
                            type="text"
                            is_required={1}
                            label="API Key"
                            onChange={handleFormValues}
                            error={formErrors.apiKey}
                            helperText={formErrors.apiKey}
                        />
                    </Grid>
                </Grid>
                <div>
                    <div className={classes.spaceWrapper}>
                        <Typography variant="p">Delivery Token</Typography>
                    </div>
                    <Alert severity="info" className={classes.spaceWrapper}>
                        Click &quot;Generate Token&quot; below to generate a delivery token.
                    </Alert>
                </div>

            </FormControl>
        </div>
    );
};

export default AddTokenForm;
