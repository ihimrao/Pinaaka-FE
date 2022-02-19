import types from '../../types';

const INIT_STATE = {
    flags: undefined,
};

const flagReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.flags.SET_ALL_FLAGS:
            return {
                ...state,
                flags: action.payload?.flagObjArr,
            };
        default:
            return state;
    }
};

export default flagReducer;
