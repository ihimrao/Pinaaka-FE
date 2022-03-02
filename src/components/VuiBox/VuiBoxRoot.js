/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default styled(Box)(({ theme, ownerState }) => {
    const {
        palette,   boxShadows,
    } = theme;
    const {
        variant, bgColor, color, opacity,  shadow,
    } = ownerState;

    const {  grey, white } = palette;
    const  borderRadius = '10px';

    const greyColors = {
        'grey-100': grey[ 100 ],
        'grey-200': grey[ 200 ],
        'grey-300': grey[ 300 ],
        'grey-400': grey[ 400 ],
        'grey-500': grey[ 500 ],
        'grey-600': grey[ 600 ],
        'grey-700': grey[ 700 ],
        'grey-800': grey[ 800 ],
        'grey-900': grey[ 900 ],
    };

    const validGradients = [
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
        'dark',
        'light',
    ];

    const validColors = [
        'transparent',
        'white',
        'black',
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
        'light',
        'dark',
        'text',
        'grey-100',
        'grey-200',
        'grey-300',
        'grey-400',
        'grey-500',
        'grey-600',
        'grey-700',
        'grey-800',
        'grey-900',
    ];

    const validBorderRadius = [ 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'section' ];
    const validBoxShadows = [ 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'inset' ];

    // background value
    let backgroundValue = bgColor;

    if (variant === 'gradient') {
        backgroundValue = validGradients.find((el) => el === bgColor)
            ? white.main
            : white.main;
    } else if (validColors.find((el) => el === bgColor)) {
        backgroundValue = palette[ bgColor ] ? palette[ bgColor ].main : greyColors[ bgColor ];
    } else {
        backgroundValue = bgColor;
    }

    // color value
    let colorValue = color;

    if (validColors.find((el) => el === color)) {
        colorValue = palette[ color ] ? palette[ color ].main : greyColors[ color ];
    }

    // borderRadius value
    let borderRadiusValue = borderRadius;

    if (validBorderRadius.find((el) => el === borderRadius)) {
        borderRadiusValue = '10px';
    }

    // boxShadow value
    let boxShadowValue = boxShadows;

    if (validBoxShadows.find((el) => el === shadow)) {
        boxShadowValue = boxShadows[ shadow ];
    }

    return {
        opacity,
        background: backgroundValue,
        color: colorValue,
        borderRadius: borderRadiusValue,
        boxShadow: boxShadowValue,
    };
});
