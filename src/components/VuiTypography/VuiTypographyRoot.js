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
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export default styled(Typography)(({ theme, ownerState }) => {
    const { palette, typography } = theme;
    const {
        color, textTransform, verticalAlign, fontWeight, opacity, textGradient,
    } = ownerState;
    const {  transparent } = palette;
    const {
        fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold,
    } = typography;

    // fontWeight styles
    const fontWeights = {
        light: fontWeightLight,
        regular: fontWeightRegular,
        medium: fontWeightMedium,
        bold: fontWeightBold,
    };

    // styles for the typography with textGradient={true}
    const gradientStyles = () => ({
        backgroundImage:
      color !== 'inherit' && color !== 'text' && color !== 'white' && '#ffffff'
          ? '#ffffff'
          : '#ffffff',
        display: 'inline-block',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: transparent.main,
        position: 'relative',
        zIndex: 1,
    });

    return {
        opacity,
        textTransform,
        verticalAlign,
        textDecoration: 'none',
        color: '#ffffff',
        fontWeight: fontWeights[ fontWeight ] && fontWeights[ fontWeight ],
        ...(textGradient && gradientStyles()),
    };
});
