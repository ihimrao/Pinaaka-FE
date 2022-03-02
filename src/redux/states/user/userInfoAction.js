import types from '../../types';

export const getUserinfo = (auth) => ({
    type: types.user.GET_USER_INFO,
    auth,
});

export const setUserinfo = (user) => ({
    type: types.user.SET_USER_INFO,
    payload: {
        user,
    },

});

export const setGlobalinfo = (user) => ({
    type: types.user.SET_GLOBAL_INFO,
    payload: {
        user,
    },

});
