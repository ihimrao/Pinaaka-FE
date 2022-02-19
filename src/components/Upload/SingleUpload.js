import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: { width: '100%' },
    dropZone: {
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        textAlign: 'center',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3, 0),
        margin: '20px 0px',
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create('padding'),
        backgroundColor: theme.palette.background.paper,
        border: `1px dashed ${ theme.palette.divider }`,
        '&:hover': {
            opacity: 0.72,
            cursor: 'pointer',
        },
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
    },
    uploadIconWrapper: {
        fontSize: '5rem',
        color: theme.palette.action.disabled,
    },
    disabled: {
        opacity: '0.2',
        '&:hover': {
            opacity: 0.2,
            cursor: 'not-allowed',
        },
    },
    hasFile: {
        padding: '15% 0',
    },
    isDragActive: {
        opacity: 0.72,
    },
    isDragReject: {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.light,
        backgroundColor: theme.palette.error.lighter,
    },
    isDragAccept: {},
    removeIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}));

// ----------------------------------------------------------------------

function UploadSingleFile({
    disabled = false,
    caption,
    maxFileSize,
    accept,
    onDropError: handleRejected,
    error = false,
    value: file,
    onChange: setFile,
    className,
    ...other
}) {
    const classes = useStyles();
    const [ logo, setLogo ] = React.useState('');

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const currentFile = acceptedFiles[ 0 ];
            if (currentFile) {
                const formData = new FormData();
                formData.append('app_folder', 'bricks-collection');
                formData.append('assets[]', currentFile);
                setFile(formData);
                const reader = new FileReader();
                reader.onload = (e) => {
                    setLogo(e.target.result);
                };
                reader.readAsDataURL(currentFile);
            }
        },
        [ setFile ],
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        isDragAccept,
    } = useDropzone({
        onDrop: handleDrop,
        onDropRejected: handleRejected,
        multiple: false,
        maxSize: maxFileSize ? maxFileSize * 1000 : maxFileSize,
        accept,
    });

    useEffect(
        () => () => {
            if (file) {
                URL.revokeObjectURL(file.preview);
            }
        },
        [ file ],
    );

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <div
                className={clsx(
                    classes.dropZone,
                    {
                        [ classes.isDragActive ]: isDragActive,
                        [ classes.isDragAccept ]: isDragAccept,
                        [ classes.isDragReject ]: isDragReject || error,
                        [ classes.hasFile ]: file,
                    },
                    disabled ? classes.disabled : '',
                )}
                {...getRootProps()}
            >

                {file ? (
                    <>
                        <Box
                            component="img"
                            alt="file preview"
                            src={logo || ''}
                            sx={{
                                top: '50%',
                                borderRadius: 1,
                                objectFit: 'cover',
                                position: 'absolute',
                                height: 'auto',
                                width: '100%',
                                minHeight: '70px',
                                transform: 'translateY(-50%)',
                            }}
                        />

                        <IconButton
                            className={classes.removeIcon}
                            onClick={handleRemoveFile}
                        >
                            <CloseIcon />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <input disabled={disabled} {...getInputProps()} />
                        <Icon
                            className={classes.uploadIconWrapper}
                        >
                            <i className="bx bx-cloud-upload" />
                        </Icon>

                        <Box sx={{ ml: { md: 5 } }}>
                            <Typography variant="h6">
                                Drop or Select file
                            </Typography>

                            {caption ? (
                                <Typography color="textSecondary" variant="caption">
                                    {caption}
                                </Typography>
                            ) : (
                                <Typography color="textSecondary" variant="caption">
                                    Drop files here or click&nbsp;
                                    <Typography color="primary" variant="caption" component="span">
                                        browse
                                    </Typography>
                                    &nbsp;thorough your machine
                                </Typography>
                            )}
                        </Box>
                    </>

                )}
            </div>
        </div>
    );
}

export default UploadSingleFile;
