import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import {  useParams } from 'react-router-dom';
import TextFieldWithLabel from '../../components/FormFields/TextFieldWithLabel';

const useStyles = makeStyles(() => ({
    radioLabelWrapper: {
        margin: '10px 0px',
    },
    spaceWrapper: {
        marginBottom: '20px',
    },
}));

const ContentCreateFormObj = (props) => {
    const {
        formObj, setFormObj,
        handleCheckValidation,
        errorObj,
    } = props;
    const classes = useStyles();
    const params = useParams();
    const handleChange = (e) => {
        e.preventDefault();
        handleCheckValidation();
        const name = e.target.name;
        let newFormObj;
        if (name === 'name') {
            newFormObj = {
                ...formObj,
                [ e.target.name ]: e.target.value,
                uniqueId: params?.brickId ? formObj.uniqueId : e.target.value?.toLowerCase()?.split(' ').join('_'),
            };
        } else {
            newFormObj = { ...formObj, [ e.target.name ]: e.target.value  };
        }
        setFormObj(newFormObj);
    };

    return (
        <div>
            <RadioGroup
                onChange={handleChange}
                className={classes.spaceWrapper}
                name="structure"
                value={formObj?.structure}
            >
                <FormControlLabel
                    value="webpage"
                    control={<Radio />}
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
                        value={formObj?.name}
                        onChange={handleChange}
                        name="name"
                        type="text"
                        is_required={1}
                        label="Enter Name"
                        placeholder="Enter Release Name"
                        error={errorObj.nameErr}
                        helperText={errorObj.nameErr ? 'Name Should Be Atleast 3-60 Length' : ''}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextFieldWithLabel
                        variant="outlined"
                        value={formObj?.uniqueId}
                        onChange={handleChange}
                        name="uniqueId"
                        disabled
                        type="text"
                        is_required={0}
                        label="Unique ID"
                    />
                </Grid>
            </Grid>

            <Grid className={classes.spaceWrapper} container spacing={2}>
                <Grid item xs={12}>
                    <TextFieldWithLabel
                        variant="outlined"
                        value={formObj?.description}
                        name="description"
                        onChange={handleChange}
                        type="text"
                        is_required={1}
                        label="Description"
                        placeholder="Enter Description"
                        rows={5}
                        multiline
                        error={errorObj.descriptionErr}
                        helperText={errorObj.descriptionErr ? 'Description should be 10-600 of length' : ''}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default ContentCreateFormObj;
