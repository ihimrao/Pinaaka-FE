import types from '../../types';

export const fetchContentList = (contentInfo) => ({
    type: types.content.FETCH_CONTENT_LIST,
    payload: {
        contentInfo,
    },
});

export const storeContentList = (response) => ({
    type: types.content.STORE_CONTENT_LIST,
    payload: {
        response,
    },
});

export const setContentListLoading = (booleanFlag) => ({
    type: types.content.SET_CONTENT_LIST_LOADING,
    payload: {
        booleanFlag,
    },
});

export const fetchBrickDetails = (brickInfo) => ({
    type: types.content.FETCH_BRICK_DETAILS,
    payload: {
        brickInfo,
    },
});

export const storeBrickDetails = (response) => ({
    type: types.content.STORE_BRICK_DETAILS,
    payload: {
        response,
    },
});

export const editBrickContent = (data) => ({
    type: types.content.EDIT_BRICK_CONTENT,
    payload: {
        data,
    },
});

export const setEditBrickContentLoading = (booleanFlag) => ({
    type: types.content.SET_EDIT_BRICK_CONTENT_LOADING,
    payload: {
        booleanFlag,
    },
});
export const storeUpdatedBrickContent = (res) => ({
    type: types.content.STORE_UPDATED_BRICK_CONTENT,
    payload: {
        res,
    },
});
export const storeBrickBasicDetails = (data) => ({
    type: types.content.STORE_BRICK_BASIC_DETAILS,
    payload: {
        data,
    },
});
export const setContentError = (errResponse) => ({
    type: types.content.SET_CONTENT_ERROR,
    payload: {
        errResponse,
    },
});

export const clearContent = () => ({
    type: types.content.CLEAR_CONTENT_DATA,

});
