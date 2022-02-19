import React from 'react';
import MDEditor, {
    commands,
} from '@uiw/react-md-editor';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

const mkdStr = '';
const editorHeight = 300;

const useStyles = makeStyles((theme) => ({
    markdownContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),

        '& .w-md-editor': {
            // background: theme.palette.background.paper,
            border: `1px solid ${ theme.palette.divider }`,
            color: theme.palette.text.primary,
        },
    },
    previewWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    viewWrapper: {
        minHeight: `${ editorHeight }px`,
        maxHeight: `${ editorHeight }px`,
        overflowY: 'scroll',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        border: `1px solid ${ theme.palette.divider }`,
        padding: theme.spacing(2),
        borderRadius: '10px',
    },
    editViewer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const ActionButton = withStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        border: (props) => (props.is_active ? `1px solid ${ theme.palette.primary.main }` : `1px solid ${ theme.palette.divider }`),
        borderBottom: '1px solid transparent',
        color: theme.palette.primary.main,
        '& .MuiSvgIcon-root MuiSvgIcon-fontSizeSmall': {
            fontSize: '.8rem',
        },
    },
}))(Button);

const MarkdownEditor = (props) => {
    const classes = useStyles();

    const [ value, setValue ] = React.useState(mkdStr);

    const [ currentPreview, setCurrentPreview ] = React.useState('edit');

    const toggleCurrentPreview = (type) => {
        setCurrentPreview(type);
    };

    const handleBlur = () => {
        props.handleChangeState(value);
    };

    return (
        <div className={classes.markdownContainer}>
            <div className={classes.previewWrapper}>
                <ActionButton
                    is_active={currentPreview === 'edit' ? 1 : 0}
                    endIcon={<VisibilityIcon fontSize="small" />}
                    onClick={() => toggleCurrentPreview('edit')}
                >Edit
                </ActionButton>
                <ActionButton
                    is_active={currentPreview === 'preview' ? 1 : 0}
                    endIcon={<EditIcon fontSize="small" />}
                    onClick={() => toggleCurrentPreview('preview')}
                >Preview
                </ActionButton>
            </div>
            {currentPreview === 'edit' ? (
                <div className={classes.editViewer}>
                    <MDEditor
                        preview="edit"
                        extraCommands={[ commands.fullscreen ]}
                        height={editorHeight}
                        value={value}
                        onChange={setValue}
                        onBlur={handleBlur}
                    />
                </div>
            ) : (
                <div className={classes.viewWrapper}>
                    <MDEditor.Markdown source={value} />
                </div>
            )}
        </div>
    );
};

export default MarkdownEditor;
