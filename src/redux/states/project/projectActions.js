import { useHistory } from 'react-router-dom';
import types from '../../types';
import {
    configUpdate, configFetch, createBricks, insertEnv,
} from '../../sagas/requests/userReq';
import { createProject, deleteProject } from '../../sagas/requests/projectReq';
import { signoutUser } from '../user/userActions';
import {
    createOrganization,
    deleteOrganization,
} from '../../sagas/requests/organizationReq';

export const getOrganizationData = (auth) => ({
    type: types.organization.GET_ORGANIZATION_DATA,
    auth,
});
export const setOrganizationData = (organizationData) => ({
    type: types.organization.SET_ORGANIZATION_DATA,
    payload: {
        organizationData,
    },
});
export const createOrganizationData = (values, auth) => createOrganization(values, auth).then((response) => response)
    .catch((error) => {
        const history = useHistory();
        const resp = JSON.stringify(error.response.data);
        const parseResp = JSON.parse(resp);
        if (parseResp.status === 401) {
            signoutUser();
            history.push('/');
        }
    });

export const deleteOrganizationById = (obj) => deleteOrganization(obj)
    .then((response) => response.status)
    .catch((error) => {
        const history = useHistory();
        const resp = JSON.stringify(error.response.data);
        const parseResp = JSON.parse(resp);
        if (parseResp.status === 401) {
            signoutUser();
            history.push('/');
        }
    });

export const getProjectData = (auth, orgId) => ({
    type: types.project.GET_PROJECT_DATA,
    payload: {
        auth, orgId,
    },
});

export const setProjectData = (projectData) => ({
    type: types.project.SET_PROJECT_DATA,
    payload: {
        projectData,
    },
});

export const setProjectError = (error) => ({
    type: types.project.SET_PROJECT_ERROR,
    payload: {
        error,
    },
});
export const setProjectLoading = (projectLoading) => ({
    type: types.project.SET_PROJECT_LOADING,
    payload: {
        projectLoading,
    },
});
export const clearProjects = (projectLoading) => ({
    type: types.project.CLEAR_PROJECT_DATA,
    payload: {
        projectLoading,
    },
});

export const createcontent = (accessToken, nameBrick, projectId) => createBricks(accessToken, nameBrick, projectId).then((response) => response.data).catch((error) => {
    const history = useHistory();
    const resp = JSON.stringify(error.response.data);
    const parseResp = JSON.parse(resp);
    if (parseResp.status === 401) {
        signoutUser();
        history.push('/');
    }

    console.error(error);
});

export const contentData = (accessToken, brickId, projectId) => configFetch(accessToken, brickId, projectId).then((response) => response.data.data).catch((error) => {
    const history = useHistory();
    const resp = JSON.stringify(error.response.data);
    const parseResp = JSON.parse(resp);
    if (parseResp.status === 401) {
        signoutUser();
        history.push('/');
    }
});

export const contentUpdate = (accessToken, formData, brickId, projectId) => configUpdate(accessToken, formData, brickId, projectId).then((response) => response).catch((error) => {
    const history = useHistory();
    const resp = JSON.stringify(error.response.data);
    const parseResp = JSON.parse(resp);
    if (parseResp.status === 401) {
        signoutUser();
        history.push('/');
    }
});

export const createnewproject = (accessToken, nameProject, orgId) => createProject(accessToken, nameProject, orgId).then((response) => {
    insertEnv(accessToken, nameProject, response.data.data.id).then(() => {
    }).catch((error) => {
        console.error(error);
    });
}).catch((error) => {
    const history = useHistory();
    const resp = JSON.stringify(error.response.data);
    const parseResp = JSON.parse(resp);
    if (parseResp.status === 401) {
        signoutUser();
        history.push('/');
    }
});

export const createProjectData = (auth, values, orgId) => createProject(auth, values, orgId).then((response) => response)
    .catch((error) => {
        const history = useHistory();
        const resp = JSON.stringify(error.response.data);
        const parseResp = JSON.parse(resp);
        if (parseResp.status === 401) {
            signoutUser();
            history.push('/');
        }
    });

export const deleteProjectById = (obj) => deleteProject(obj)
    .then((response) => response)
    .catch((error) => {
        const history = useHistory();
        const resp = JSON.stringify(error.response.data);
        const parseResp = JSON.parse(resp);
        if (parseResp.status === 401) {
            signoutUser();
            history.push('/');
        }
    });

export const setLoginError = (error) => ({
    type: types.user.SET_LOGIN_ERROR,
    error,
});
