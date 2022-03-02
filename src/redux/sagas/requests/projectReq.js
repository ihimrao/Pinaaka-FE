import axios from 'axios';
import apiUrls from './apiUrls';

export const fetchProjectsFromServer = (token) =>  axios.request({
    method: 'GET',
    url: apiUrls.users.fetchUsers,
    headers: {
        Authorization: `${ token }`,
    },
});

export const createProject = (accessToken, values, orgId) =>  axios.request({
    method: 'POST',
    url: apiUrls.users.createKey,
    headers: {
        Authorization: `${ accessToken }`,
    },
    data: {
        key: values.keys,
        password: values.password,
        email: orgId,
        expireAt: values.days,
        isSingleDevice: values?.keyType || true,

    },
});

export const deleteProject = ({ token, key }) => axios.request({
    method: 'POST',
    url: apiUrls.users.deleteProject,
    headers: {
        Authorization: `${ token }`,
    },
    data: { key },
});
export const resetKey = ({ token, key }) => axios.request({
    method: 'POST',
    url: apiUrls.users.resetKey,
    headers: {
        Authorization: `${ token }`,
    },
    data: { key },
});

export const editProject = (accessToken, nameProject, projectId, orgId) => axios.request({
    method: 'PUT',
    url: `${ apiUrls.users.fetchProjects }/${ orgId }/${ projectId }`,
    headers: {
        Authorization: `${ accessToken }`,
    },
    data: {
        name: `${ nameProject }`,
    },
});

export default { fetchProjectsFromServer };
