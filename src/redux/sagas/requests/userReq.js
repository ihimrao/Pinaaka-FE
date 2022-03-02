import axios from 'axios';
import apiUrls from './apiUrls';

// fetch user data
export const fetchUserDataFromServer = ({ username, password }) => axios.request({
    method: 'POST',
    url: apiUrls.users.fetchUserData,
    data: {
        email: username,
        password,

    },
});

// fetch user data
export const fetchUserInfoFromServer = (auth) => axios.request({
    method: 'GET',
    url: apiUrls.users.fetchUserInfo,
    headers: {
        Authorization: `${ auth }`,
    },
});
export const fetchGlobalInfoFromServer = (auth) => axios.request({
    method: 'GET',
    url: apiUrls.users.fetchGlobalInfo,
    headers: {
        Authorization: `${ auth }`,
    },
});

const fetchContentData = (userToken, projectId) => axios.request({
    method: 'GET',
    url: `${ apiUrls.users.fetchContentData }/${ projectId }`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${ userToken }`,
    },
});

const insertEnv = (tokenAccess, nameProject, projectId) => axios.request({
    method: 'POST',
    url: `${ apiUrls.users.fetchEnvData }/${ projectId }`,
    headers: {
        Authorization: `${ tokenAccess }`,
    },
    data: {
        'machine_name:': 'test',
        name: `${ nameProject }`,
        base_url: 2,
    },
});

const createBricks = (accessToken, nameBrick, projectId) => axios.request({
    method: 'POST',
    url: `${ apiUrls.users.fetchContentData }/${ projectId }`,
    headers: {
        Authorization: `${ accessToken }`,
    },
    data: {
        name: `${ nameBrick }`,
        'machine_name:': 'test-machine',
        structure: '{"true": "fine"}',
        description: '1800f',
    },
});

const deleteBricks = (brickId, tokenAccess, projectId) => {
    axios.request({
        method: 'PUT',
        url: `${ apiUrls.users.fetchContentData }/${ projectId }/${ brickId }`,
        headers: {
            Authorization: `${ tokenAccess }`,
        },
        data: { deleted: 'True' },
    });
};

const configFetch = (userToken, projectId, brickId) => axios.request({
    method: 'GET',
    url: `${ apiUrls.users.fetchContentType }/${ projectId }/${ brickId }`,
    headers: {
        Authorization: `${ userToken }`,
    },
});

const configUpdate = (userToken, data, projectId, brickId) => axios.request({
    method: 'POST',
    url: `${ apiUrls.users.fetchContentType }/${ projectId }/${ brickId }`,
    headers: {
        Authorization: `${ userToken }`,
    },
    data,
});

export default { fetchUserDataFromServer };
export {
    fetchContentData, createBricks, deleteBricks, configFetch, configUpdate, insertEnv,
};
