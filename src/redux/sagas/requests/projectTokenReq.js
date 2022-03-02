import axios from 'axios';
import { signoutUser } from '../../states/user/userActions';
import apiUrls from './apiUrls';

export const getProjectEnv = async (projectId, accessToken) => axios.request({
    method: 'GET',
    url: apiUrls.token.fetchEnvironmentData(projectId),
    headers: {
        Authorization: `${ accessToken }`,
    },
});

export const createProjectToken = async (projectId, accessToken, tokenData) => {
    let success = false;
    if (tokenData?.environment) {
        await axios.request({
            method: 'POST',
            url: apiUrls.token.createProjectTokenData(projectId),
            headers: {
                Authorization: `${ accessToken }`,
            },
            data: {
                name: tokenData.name,
                description: tokenData.description,
                environment: tokenData.environment,
            },
        })
            .then(() => {
                success = true;
            })
            .catch(() => {
                success = false;
            });
    }
    return success;
};

export const getAllProjectToken = async (projectId, accessToken, history) => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: apiUrls.token.fetchAllProjectTokenData(projectId),
            headers: {
                Authorization: `${ accessToken }`,
            },
        });
        return { response: response?.data.data, error: 0 };
    } catch (error) {
        if (error.response.status === 401) {
            signoutUser();
            history.push('/');
        } else {
            return { errorMessage: error?.response?.statusText || 'please try again', error: 1 };
        }
    }
    return null;
};

export default {};
