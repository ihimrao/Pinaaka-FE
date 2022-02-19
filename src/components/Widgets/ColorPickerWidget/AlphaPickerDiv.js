import React from 'react';
import Typography  from '@material-ui/core/Typography';
import Menu  from '@material-ui/core/Menu';
import { AlphaPicker } from 'react-color';
import { useStyles, PickerButton } from './colorPicker.styles';
import hexToRGB from '../../../helpers/hexToRGBAColor';

const AlphaPickerDiv = (props) => {
    const { value, handleChange } = props;
    const keyName = 'colorTransparency';
    const classes = useStyles();
    const [ alphaPickerEl, setAlphaPickerEl ] = React.useState(null);

    const handleToggleAlphaPickerEl = (event) => {
        setAlphaPickerEl(event.currentTarget);
    };

    const handleClearAlphaPickerEl = () => {
        setAlphaPickerEl(null);
    };

    const handleChangeAlpha = (color) => {
        handleChange({
            key: keyName,
            value: parseFloat((color.rgb.a * 100).toFixed(2)),
        });
        handleClearAlphaPickerEl();
    };

    return (
        <>
            <Typography variant="subtitle1">Transparency</Typography>
            <div className={classes.pickerWrapper}>
                <PickerButton
                    endIcon="%"
                    onClick={handleToggleAlphaPickerEl}
                >
                    {value[ keyName ]}
                </PickerButton>
                <Menu
                    anchorEl={alphaPickerEl}
                    keepMounted
                    open={Boolean(alphaPickerEl)}
                    onClose={handleClearAlphaPickerEl}
                >
                    <div className={classes.alphaPickerWrapper}>
                        <AlphaPicker
                            color={{
                                ...hexToRGB(value?.color, value[ keyName ] / 100),
                            }}
                            onChangeComplete={handleChangeAlpha}
                        />
                    </div>
                </Menu>
            </div>
        </>
    );
};

export default AlphaPickerDiv;
