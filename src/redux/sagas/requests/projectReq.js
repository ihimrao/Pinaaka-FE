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
    url: apiUrls.users.fetchProjects(orgId),
    headers: {
        Authorization: `${ accessToken }`,
    },
    data: {
        name: `${ values.name }`,
        description: `${ values.description }`,
        icon: `${ values.icon }`,
    },
});

export const deleteProject = ({ token, orgId, projectId }) => axios.request({
    method: 'DELETE',
    url: apiUrls.users.deleteProject(orgId, projectId),
    headers: {
        Authorization: `${ token }`,
    },
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
