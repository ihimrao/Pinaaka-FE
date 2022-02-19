import React from 'react';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import { BlockPicker } from 'react-color';
import { useStyles, PickerButton } from './colorPicker.styles';

const BlockPickerDiv = (props) => {
    const { value, handleChange } = props;
    const keyName = React.useMemo(() => 'color', []);
    const classes = useStyles({
        currentColorPickerColor: value[ keyName ],
    });
    const [ colorPickerEl, setColorPickerEl ] = React.useState(null);

    const handleToggleColorPickerEl = (event) => {
        setColorPickerEl(event.currentTarget);
    };

    const handleClearColorPickerEl = () => {
        setColorPickerEl(null);
    };

    const handleChangeColor = (color) => {
        handleChange({
            key: keyName,
            value: color.hex,
        });
        handleClearColorPickerEl();
    };

    return (
        <>
            <Typography variant="subtitle1">Color</Typography>
            <div className={classes.pickerWrapper}>
                <PickerButton
                    startIcon={<div className={classes.blockPickerPreviewDiv} />}
                    onClick={handleToggleColorPickerEl}
                >
                    {value[ keyName ]}
                </PickerButton>
                <Menu
                    anchorEl={colorPickerEl}
                    keepMounted
                    open={Boolean(colorPickerEl)}
                    onClose={handleClearColorPickerEl}
                >
                    <BlockPicker
                        className={classes.custom_block_picker}
                        color={value[ keyName ]}
                        onChange={handleChangeColor}
                        triangle="hide"
                    />
                </Menu>
            </div>
        </>
    );
};

export default BlockPickerDiv;
