import types from '../../types';

const INIT_STATE = {
    userState: {},
    organizationState: {},
    projectState: {},
    error: '',
};

const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.user.SET_USER_DATA:
            return {
                ...state,
                userState: action.payload.user,
                error: '',
            };
        case types.user.SET_USER_SIGNOUT:
            return {
                ...state,
                userState: {},
            };
        case types.user.SET_LOGIN_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default userReducer;
