import types from '../../types';

const INIT_STATE = {
    contentList: {},
    contentListLoading: true,
    contentError: undefined,
    brickDetails: {},
};

const contentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.content.STORE_CONTENT_LIST:
            return {
                ...state,
                contentList: action.payload.response,
            };
        case types.content.SET_CONTENT_LIST_LOADING:
            return {
                ...state,
                contentListLoading: action.payload.booleanFlag,
            };
        case types.content.SET_CONTENT_ERROR:
            return {
                ...state,
                contentError: action.payload.errResponse,
            };
        case types.content.CLEAR_CONTENT_DATA:
            return {
                ...state,
                contentList: {},
            };
        case types.content.STORE_UPDATED_BRICK_CONTENT:
            return {
                ...state,
                updatedBrickContent: action.payload.res,
            };
        case types.content.SET_EDIT_BRICK_CONTENT_LOADING:
            return {
                ...state,
                editBrickContentLoading: action.payload.booleanFlag,
            };
        case types.content.STORE_BRICK_DETAILS:
            return {
                ...state,
                brickDetails: action.payload.response,
            };
        case types.content.STORE_BRICK_BASIC_DETAILS:
            return {
                ...state,
                brickBasicDetails: action.payload.data,
            };
        default:
            return state;
    }
};

export default contentReducer;
