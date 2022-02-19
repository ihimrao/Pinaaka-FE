import types from '../../types';

export const getApplicationFlags = () => ({
    type: types.flags.GET_ALL_FLAGS,
});

export const setApplicationFlags = (flagObjArr) => ({
    type: types.flags.SET_ALL_FLAGS,
    payload: {
        flagObjArr,
    },
});
