import axios from 'axios';
import apiUrls from './apiUrls';

// fetch flags for the application
export const fetchApplicationFlags = () => {
    const currentOrigin = window?.location?.origin;
    return  axios.request({
        method: 'post',
        url: apiUrls.fetchFlags,
        data: {
            url: currentOrigin,
        },
    });
};

export default fetchApplicationFlags;
