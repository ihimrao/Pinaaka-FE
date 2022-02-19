import axios from 'axios';
import apiUrls from './apiUrls';

// fetch flags for the application
export const fetchNativeFieldsFromServer = (auth) => axios.request({
    method: 'get',
    url: apiUrls.createContent.fetchNativeFields,
    headers: {
        Authorization: `${ auth }`,
    },
});

// fetch flags for the application
export const createBricksInServer = (auth, formObj, projectId) => axios.request({
    method: 'POST',
    url: apiUrls.createContent.createBrick(projectId),
    data: formObj,
    headers: {
        Authorization: `${ auth }`,
    },
});

export const deleteBricksFromServer = (auth, projectId, brickId) => axios.request({
    method: 'DELETE',
    url: apiUrls.content.fetchBrickDetails(projectId, brickId),
    headers: {
        Authorization: `${ auth }`,
    },
});

export default fetchNativeFieldsFromServer;
