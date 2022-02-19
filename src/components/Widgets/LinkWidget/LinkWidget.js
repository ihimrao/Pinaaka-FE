import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import { useFormikContext } from 'formik';
import LinkFieldsWrapper from './LinkFieldsWrapper';

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        maxWidth: theme.palette.maxWrapperWidgetWidth,
        width: '100%',
        margin: '20px 0px',
    },
    valueWrapper: {
        margin: '20px 0px',
        padding: '20px',
        borderRadius: '10px',
        border: `1px solid ${ theme.palette.divider }`,
    },
    fieldWrapper: {
        margin: '10px 0px',
    },
    dividerStyles: {
        margin: '10px 0px',
    },
}));

export const TemplateButton = withStyles((theme) => ({
    root: {
        textTransform: 'capitalize',
        fontWeight: 'normal',
        padding: '5px 10px',
        justifyContent: 'flex-start',
        border: `1px solid ${ theme.palette.divider }`,

        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}))(Button);

const LinkWidget = (props) => {
    const classes = useStyles();

    const { parentKey, index } = props;

    const currentParentKey = parentKey.length > 0 ? `${ parentKey }.${ index }.value` : `${ index }.value`;

    const { setFieldValue } = useFormikContext();

    const handleChangeFormikValue = (data, i, oldData) => {
        setFieldValue(`data.${ currentParentKey }.${ i }`, { ...oldData, ...data });
    };

    const pushAnotherField = () => {
        const newArr = [ ...props.value, { ...props?.field_metadata?.default_value, id: props.value[ props.value.length - 1 ].id + 1 } ];
        setFieldValue(`data.${ currentParentKey }`, newArr);
    };

    const handleDelete = (dltIndex) => {
        const newArr = props.value?.filter((item, itemInd) => itemInd !== dltIndex);
        setFieldValue(`data.${ currentParentKey }`, newArr);
    };

    const handleChangeFormikValueSingle = (data, oldData) => {
        setFieldValue(`data.${ currentParentKey }`, { ...oldData, ...data });
    };

    return (
        <Box className={classes.linkWrapper}>
            <Divider className={classes.dividerStyles} />
            <Typography>{props.display_name}</Typography>

            {/* check if link is multiple or not */}
            {props?.multiple ? props?.value?.map((link, i) => (
                <React.Fragment key={link.id}>
                    <LinkFieldsWrapper
                        has_delete={props.value?.length > 1}
                        onDelete={() => handleDelete(i)}
                        onBlur={(data) => handleChangeFormikValue(data, i, link)}
                        {...link}
                    />
                </React.Fragment>
            )) : (
                <LinkFieldsWrapper
                    has_delete={false}
                    onDelete={() => {}}
                    onBlur={(data) => handleChangeFormikValueSingle(data, props.value)}
                    {...props.value}
                />
            )}

            {props?.multiple ? (
                <TemplateButton
                    onClick={pushAnotherField}
                    startIcon={<AddIcon fontSize="small" />}
                >
                    <Typography variant="caption">Add another field</Typography>
                </TemplateButton>
            ) : <></>}

            <Divider className={classes.dividerStyles} />
        </Box>
    );
};

export default LinkWidget;
