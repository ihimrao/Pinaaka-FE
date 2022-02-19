import types from '../../types';

const localStorageTheme = localStorage.getItem('APP_THEME');

if (!localStorageTheme) {
    localStorage.setItem('APP_THEME', 'light');
}

const INIT_STATE = {
    theme: localStorageTheme || 'light',
    isSidebarCollapsed: true,
};

const appStateReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.appState.SET_SIDEBAR_COLLAPSE:
            return {
                ...state,
                isSidebarCollapsed: action.payload,
            };
        case types.appState.SET_APP_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        default:
            return state;
    }
};

export default appStateReducer;
