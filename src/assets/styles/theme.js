// colors
/*
    *note
    always use hex color for theme colors eg: for red use `#ff0000`
*/

import { createTheme, ThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { alpha, darken } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

export const themeColor = {
    primaryColor: '#BDE5E4',
    primaryText: '#1F3F4F',
    lightColor: '#e5dada',
    darkColor: '#02040f',
    lineColor: '#E3E0E0',
    activeBlue: '#0D7DE4',
    selectActiveColor: '#EF4B5A',
    whiteColor: '#000000',
    lightGrey: '#E5E5E5',
};

const themeAssets = {
    boxShadow: '0px 10px 37px rgba(0, 0, 0, 0.03), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
    maxWrapperWidgetWidth: '700px',
    tableBorder: '1px solid rgba(0,0,0,0.1)',
    tableBoxShadow: '5px 10px 20px -5px rgba(0,0,0,0.3)',
};

// material ui theme wrapper obj

const ThemeWrapper = (props) => {
    const currentTheme = useSelector((state) => state.appState?.theme);
    const defaultTheme = createTheme();

    const primaryMainColor = currentTheme === 'light' ? themeColor.primaryText : themeColor.primaryColor;
    const primaryContrastTextColor = currentTheme === 'light' ? themeColor.primaryColor : themeColor.primaryText;
    const primaryReverseTextMainColor = currentTheme === 'light' ? grey[ 900 ] : grey[ 900 ];

    const globalTheme = React.useMemo(
        () => createTheme({
            palette: {
                type: currentTheme,
                primary: {
                    main: primaryMainColor,
                    contrastText: primaryContrastTextColor,
                },
                secondary: {
                    main: themeColor.lightColor,
                },
                ...themeColor,
                textReverseColor: primaryReverseTextMainColor,
                loginInputBg: '#266798',
                fade: {
                    fadePaperBackgroundColor: alpha(defaultTheme.palette.background.paper, 0.5),
                    fadePrimaryBackgroundColor: alpha(primaryMainColor, 0.06),
                    fadeContrastBackgroundColor: alpha(primaryContrastTextColor, 0.3),
                    fadeBorderColor: alpha(defaultTheme.palette.grey[ 400 ], 0.3),
                    fadeBorderColorDarker: alpha(defaultTheme.palette.grey[ 400 ], 0.3),
                    fadelightGrey: alpha(themeColor.lightGrey, 1),
                    fadegrey: alpha(themeColor.lightGrey, 0.1),
                },
                buttonColors: {
                    primaryBtnHoverBgColor: darken(primaryMainColor, 0.3),
                    primaryBtnTextColor: alpha(primaryContrastTextColor, 0.6),
                },
                ...themeAssets,
                toggledPrimaryColor: primaryContrastTextColor,
            },
            breakpoints: {
                custom: {
                    mobile: '650px',
                },
            },
            overrides: {
                // MuiRadio-colorSecondary.Mui-checked
                MuiRadio: {
                    colorSecondary: {
                        '&.Mui-checked': {
                            color: themeColor.selectActiveColor,
                        },
                    },
                },
                MuiDialogTitle: {
                    root: {
                        backgroundColor: themeColor.primaryColor,
                        color: themeColor.primaryText,
                    },
                },
                MuiPaper: {
                    rounded: {
                        borderRadius: '10px',
                    },
                },
            },
        }),
        [ currentTheme ],
    );
    return (
        <ThemeProvider theme={globalTheme}>
            <div className={`theme-${ currentTheme }`}>
                {props.children}
            </div>
        </ThemeProvider>

    );
};

export default ThemeWrapper;
