import types from '../../types';

export const intiCreateContentMetadata = {
    name: '',
    description: '',
    structure: 'webpage',
    type: 'single',
    uniqueId: '',
};

const INIT_STATE = {
    hello: 'hello',
    stack: [],
    currentWidgetSelected: null,
    contentStackMetadata: intiCreateContentMetadata,
    nativeFields: null,
};

const brickContentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.brickContent.SET_INIT_CREATE_CONTENT_FORM:
            return {
                ...state,
                hello: 'world',
            };
        case types.brickContent.UPDATE_STACK:
            return {
                ...state,
                stack: action.payload,
            };
        case types.brickContent.SET_SELECTED_WIDGET_KEY:
            return {
                ...state,
                currentWidgetSelected: action.payload,
            };
        case types.brickContent.UPDATE_CREATE_CONTENT_META_DATA:
            return {
                ...state,
                contentStackMetadata: action.payload,
            };
        case types.brickContent.SET_NATIVE_FIELDS:
            return {
                ...state,
                nativeFields: action.payload,
            };
        default:
            return state;
    }
};

export default brickContentReducer;
