import types from '../../types';

export const setSidebarCollapse = (bool) => ({
    type: types.appState.SET_SIDEBAR_COLLAPSE,
    payload: bool,
});

export const setAppTheme = (theme) => {
    localStorage.setItem('APP_THEME', theme);
    return ({
        type: types.appState.SET_APP_THEME,
        payload: theme,
    });
};

export default setSidebarCollapse;
