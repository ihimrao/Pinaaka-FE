import types from '../../types';

const INIT_STATE = {
    organizationState: {},
    projectState: {},
    error: '',
};

const projectReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.organization.SET_ORGANIZATION_DATA:
            return {
                ...state,
                organizationState: action.payload.organizationData,
            };
        case types.project.SET_PROJECT_DATA:
            return {
                ...state,
                projectState: action.payload.projectData,
                error: '',
            };
        case types.project.SET_PROJECT_ERROR:
            return {
                ...state,
                error: action.payload.error,
            };

        case types.project.SET_PROJECT_LOADING:
            return {
                ...state,
                projectLoading: action.payload.projectLoading,
            };
        case types.project.CLEAR_PROJECT_DATA:
            return {
                ...state,
                projectState: {},

            };
        default:
            return state;
    }
};

export default projectReducer;
