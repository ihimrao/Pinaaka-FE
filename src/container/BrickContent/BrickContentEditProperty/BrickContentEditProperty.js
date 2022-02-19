import React, { useEffect, useState } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion, AccordionDetails, AccordionSummary, Checkbox, fade, IconButton, Typography,
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '../../../components/FormFields/TextFieldWithLabel';
import { containerWrapper, sectionWrapperCardStyles } from '../../../views/Content/BrickContent/brickContent.styles';
import NoPropertySelectWrapper from './NoPropertySelectWrapper';
import { updateCreateContentStack } from '../../../redux/states/brickContent/brickContentAction';

const useStyles = makeStyles((theme) => ({
    containerWrapper: {
        ...containerWrapper(),
    },
    sectionWrapperCard: {
        ...sectionWrapperCardStyles(theme),
    },
    editPropertyWrapper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        border: `1px solid ${ theme.palette.fade.fadeBorderColor }`,
        marginTop: '10px',
        flexGrow: '1',
        padding: '10px 20px',
    },
    fieldWrapper: {
        margin: '10px 0px',
        '& .MuiFormControl-marginNormal': {
            marginTop: '8px',
        },
    },
    textFieldWrapper: {
        paddingRight: '10px',
        '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
        },
    },
    choiceFieldWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    boxFieldWrapper: {
        borderRadius: '10px',
        border: `1px solid ${ theme.palette.fade.fadeBorderColor }`,
        marginTop: '10px',
        flexGrow: '1',
        padding: '4px 4px',
    },
    subFieldWrapper: {
        borderRadius: '10px',
        flexGrow: '1',
        padding: '20px 20px',
        background: fade(theme.palette.fade.fadeBorderColor, 0.2),
    },
    btnStyles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: '6px',
        gap: '10px',
    },
    accordionMainHeader: {
        width: '100%',
    },
    accordionHeaderStyles: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        justifyContent: 'space-between',
        background: fade(theme.palette.fade.fadeBorderColor, 0.2),
    },
}));

const CreateContentEditProperty = () => {
    const classes = useStyles();

    const [ selectedWidgetObj, setSelectedWidgetObj ] = React.useState(null);
    const [ choices, setChoices ] = useState('');
    const [ accordionVisibility, setAccordionVisibility ] = useState({});
    const [ updatedChoices, setUpdatedChoices ] = useState({ label: '', value: '' });
    const [ choiceError, setChoiceError ] = useState({
        visible: false,
        msg: '',
    });
    const reduxDispatch = useDispatch();
    const widgetStack = useSelector((state) => state.brickContent.stack);
    const currentSelectedWidgetKey = useSelector((state) => state.brickContent.currentWidgetSelected);

    React.useEffect(() => {
        setSelectedWidgetObj(widgetStack[ currentSelectedWidgetKey ]);
    }, [ currentSelectedWidgetKey, widgetStack ]);

    useEffect(() => {
        setChoiceError({
            visible: false,
            msg: '',
        });
        setChoices('');
        setAccordionVisibility({});
        setUpdatedChoices({ label: '', value: '' });
    }, [ currentSelectedWidgetKey ]);
    const handleChangeBlur = (e, fieldIndex, label = '') => {
        let { value } = e.target;

        if (e.target.type === 'checkbox') {
            value = !(value === 'true');
        }
        const secondPart = {
            ...widgetStack[ currentSelectedWidgetKey ],
            name: label &&  label?.includes('Display') ? value : widgetStack[ currentSelectedWidgetKey ]?.name,
            field_config: {
                ...widgetStack[ currentSelectedWidgetKey ].field_config,
                fields: widgetStack[ currentSelectedWidgetKey ].field_config.fields.map((key) => ({ ...key })),
            },
        };

        const secObj = [ ...widgetStack ];
        secObj[ currentSelectedWidgetKey ] = secondPart;
        secObj[ currentSelectedWidgetKey ].field_config.fields[ fieldIndex ].value = value;
        if (label && label?.includes('Name')) {
            const uniqueIdField =  secObj[ currentSelectedWidgetKey ].field_config.fields?.find((item) => item?.name?.includes('Unique'));
            const uniqueIdFieldIndex = secObj[ currentSelectedWidgetKey ].field_config.fields?.indexOf(uniqueIdField);
            secObj[ currentSelectedWidgetKey ].field_config.fields[ uniqueIdFieldIndex ].value = value?.toLowerCase().replace(/[^A-Z0-9]+/ig, '_').trim();
        }
        reduxDispatch(updateCreateContentStack([ ...secObj ]));
    };

    const handleRemoveClick = (id, fieldIndex) => {
        const secObj = [ ...widgetStack ];
        secObj[ currentSelectedWidgetKey ].field_config.fields[ fieldIndex ].value = widgetStack?.find((item) => item?.uniqueId === selectedWidgetObj?.uniqueId)?.field_config?.fields?.find((data) => data?.name?.includes('Choices')).value.filter((el, index) => index !== id);
        reduxDispatch(updateCreateContentStack([ ...secObj ]));
        setUpdatedChoices({ label: '', value: '' });
    };

    const storeBrickChoices = (inputDataIndex, fieldIndex) => {
        const secObj = [ ...widgetStack ];
        secObj[ currentSelectedWidgetKey ].field_config.fields[ fieldIndex ].value[ inputDataIndex ] = { label: updatedChoices?.label || secObj[ currentSelectedWidgetKey ].field_config.fields[ fieldIndex ].value[ inputDataIndex ]?.label, value: updatedChoices?.value?.toLowerCase().replace(/[^A-Z0-9]+/ig, '_') || secObj[ currentSelectedWidgetKey ].field_config.fields[ fieldIndex ].value[ inputDataIndex ]?.value };
        reduxDispatch(updateCreateContentStack([ ...secObj ]));
        setUpdatedChoices({ label: '', value: '' });
        setAccordionVisibility({
            [ selectedWidgetObj?.uniqueId ]: {
                [ inputDataIndex ]: false,
            },
        });
    };

    const storeChoices = (fieldIndex) => {
        if (choices?.match(/([a-zA-Z0-9 ]* : [a-zA-Z0-9\- :]*)/g)) {
            const choiceArr = choices?.split(':')?.map((item) =>  (item?.trim()));
            const secObj = [ ...widgetStack ];
            secObj[ currentSelectedWidgetKey ].field_config.fields[ fieldIndex ].value.unshift({ label: choiceArr[ 0 ], value: choiceArr[ 1 ].toLowerCase().replace(/[^A-Z0-9]+/ig, '_') });
            reduxDispatch(updateCreateContentStack([ ...secObj ]));
            setChoices('');
            setAccordionVisibility({});
        } else {
            setChoiceError({
                visible: true,
                msg: choices === '' ? 'Please enter a label : value pair' : 'Please enter correct pattern, label : value',
            });
        }
    };
    return (
        <div className={classes.containerWrapper}>
            <div className={`${ classes.sectionWrapperCard }`}>
                Edit Properties
            </div>
            <div className={classes.editPropertyWrapper}>
                { (selectedWidgetObj?.uniqueId) ? (
                    <>
                        {selectedWidgetObj?.field_config?.fields?.map((field, fieldIndex) => {
                            switch (field.type) {
                                case 'text':
                                    return (
                                        <div className={classes.fieldWrapper} key={selectedWidgetObj?.uniqueId.concat(field?.name?.split(' ').join('_').concat(fieldIndex))}>
                                            <TextField
                                                fullWidth
                                                autoComplete="false"
                                                color="secondary"
                                                margin="normal"
                                                variant="outlined"
                                                className={classes.textFieldWrapper}
                                                label={field.name}
                                                name={field.name}
                                                onChange={(e) => handleChangeBlur(e, fieldIndex, field.name)}
                                                value={field?.value}
                                            />
                                        </div>
                                    );

                                case 'checkbox':
                                    return (
                                        <div className={classes.fieldWrapper} key={selectedWidgetObj?.uniqueId.concat(field?.name?.split(' ').join('_').concat(fieldIndex))}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={(
                                                        <Checkbox
                                                            onChange={(e) => handleChangeBlur(e, fieldIndex)}
                                                            color="primary"
                                                            checked={field?.value}
                                                            name={field.name}
                                                            value={field.value}
                                                        />
                                                    )}
                                                    label={field.name}
                                                />
                                            </FormGroup>
                                        </div>
                                    );

                                case 'dropdown':
                                    return (
                                        <div key={selectedWidgetObj?.uniqueId.concat(field?.name?.split(' ').join('_').concat(fieldIndex))}>
                                            <FormControl fullWidth className={classes.fieldWrapper}>
                                                <TextField
                                                    variant="outlined"
                                                    label={field.name}
                                                    value={field.value}
                                                    onChange={(e) => handleChangeBlur(e, fieldIndex)}
                                                    select
                                                    fullWidth
                                                >
                                                    {field.options.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                                                </TextField>
                                            </FormControl>
                                        </div>
                                    );

                                case 'radio':
                                    return (
                                        <div className={classes.fieldWrapper} key={selectedWidgetObj?.uniqueId.concat(field?.name?.split(' ').join('_').concat(fieldIndex))}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">{field.name}</FormLabel>
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="radio-buttons-group"
                                                    defaultValue={field.value}
                                                    onChange={(e) => handleChangeBlur(e, fieldIndex)}
                                                >
                                                    {field.options.map((option) => <FormControlLabel value={option.toLowerCase()} control={<Radio />} label={option} />)}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    );

                                case 'textarea':
                                    return (
                                        <div className={classes.fieldWrapper} key={selectedWidgetObj?.uniqueId.concat(field?.name?.split(' ').join('_').concat(fieldIndex))}>
                                            <TextField
                                                error={choiceError?.visible}
                                                onChange={(e) => {
                                                    setChoiceError({
                                                        visible: false,
                                                        msg: '',
                                                    });
                                                    setChoices(e.target.value);
                                                }}
                                                variant="outlined"
                                                label={field.name}
                                                multiline
                                                rows={3}
                                                value={choices}
                                                helperText={!choiceError?.visible ? 'Enter label-value pair choices, where label and value pair are seprated by colon and spaces before and after the colon ( : )' : choiceError?.msg}
                                            />
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.textFieldWrapper}
                                                onClick={() => storeChoices(fieldIndex)}
                                            >
                                                Add
                                            </Button>

                                            {Array.isArray(field?.value) && field?.value?.map((val, inputDataIndex) => (
                                                <div>{val?.value && (
                                                    <Accordion
                                                        expanded={Boolean(accordionVisibility && accordionVisibility[ selectedWidgetObj?.uniqueId ] && accordionVisibility[ selectedWidgetObj?.uniqueId ][ inputDataIndex ])}
                                                        onClick={() => {
                                                            setAccordionVisibility({
                                                                [ selectedWidgetObj?.uniqueId ]: {
                                                                    [ inputDataIndex ]: true,
                                                                },
                                                            });
                                                            setUpdatedChoices({ label: val?.label, value: val?.value });
                                                        }}
                                                        style={{ marginTop: '20px', paddingTop: '6px' }}
                                                    >
                                                        {!(accordionVisibility && accordionVisibility[ selectedWidgetObj?.uniqueId ] && accordionVisibility[ selectedWidgetObj?.uniqueId ][ inputDataIndex ]) &&  (
                                                            <AccordionSummary
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <div className={classes.accordionMainHeader}>
                                                                    <div className={classes.accordionHeaderStyles}>
                                                                        <Typography>{val?.label}</Typography>
                                                                        <IconButton
                                                                            size="small"
                                                                            type="button"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleRemoveClick(inputDataIndex, fieldIndex);
                                                                            }}
                                                                        >
                                                                            <DeleteIcon  />
                                                                        </IconButton>
                                                                    </div>
                                                                </div>
                                                            </AccordionSummary>
                                                        )}
                                                        <AccordionDetails>
                                                            <div className={classes.subFieldWrapper}>
                                                                <TextField
                                                                    label="Label"
                                                                    fullWidth
                                                                    autoComplete="false"
                                                                    color="secondary"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    className={classes.textFieldWrapper}
                                                                    name="textarea"
                                                                    value={updatedChoices?.label}
                                                                    onChange={(e) => setUpdatedChoices({
                                                                        ...updatedChoices,
                                                                        label: e.target.value,
                                                                    })}
                                                                    style={{ marginBottom: '20px' }}
                                                                />
                                                                <TextField
                                                                    label="Value"
                                                                    fullWidth
                                                                    autoComplete="false"
                                                                    color="secondary"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    className={classes.textFieldWrapper}
                                                                    name="textarea"
                                                                    value={updatedChoices?.value}
                                                                    onChange={(e) => setUpdatedChoices({
                                                                        ...updatedChoices,
                                                                        value: e.target.value,
                                                                    })}
                                                                    style={{ marginBottom: '20px' }}
                                                                />
                                                                <div className={classes.btnStyles}>
                                                                    <Button
                                                                        variant="outlined"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setUpdatedChoices({ label: '', value: '' });
                                                                            setAccordionVisibility({
                                                                                [ selectedWidgetObj?.uniqueId ]: {
                                                                                    [ inputDataIndex ]: false,
                                                                                },
                                                                            });
                                                                        }}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            storeBrickChoices(inputDataIndex, fieldIndex);
                                                                        }}
                                                                    >
                                                                        Save
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )}
                                                </div>
                                            ))}
                                        </div>
                                    );

                                default:
                                    return '';
                            }
                        })}
                    </>
                ) : <NoPropertySelectWrapper />}
            </div>
        </div>
    );
};

export default CreateContentEditProperty;
