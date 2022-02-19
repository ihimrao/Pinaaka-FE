import types from '../../types';

export const getUserData = (sendData) => ({
    type: types.user.GET_USER_DATA,
    sendData,
});

export const setUserData = (user) => ({
    type: types.user.SET_USER_DATA,
    payload: {
        user,
    },

});
export const signoutUser = () => ({
    type: types.user.SET_USER_SIGNOUT,
    payload: {

    },

});

export const setLoginError = (error) => ({
    type: types.user.SET_LOGIN_ERROR,
    error,
});
