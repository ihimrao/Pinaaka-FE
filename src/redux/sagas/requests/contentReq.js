import { callApi } from '../store/callApis';
import endPoints from '../store/endPoints';
import apiUrls from './apiUrls';

export const fetchContentList = ({ projectId }) => callApi({
    uriEndPoint: {
        ...endPoints.content.fetchContentList,
        uri: apiUrls.content.fetchContentList(projectId),
    },
});

export const fetchBrickDetails = ({ projectId, brickId }) => callApi({
    uriEndPoint: {
        ...endPoints.content.fetchBrickDetails,
        uri: apiUrls.content.fetchBrickDetails(projectId, brickId),
    },
});

export const editBrickContent = ({ pathParams, body }) => callApi({
    uriEndPoint: {
        ...endPoints.content.editBrickContent,
        uri: apiUrls.content.editBrickDetails(pathParams),
    },
    body,
});
