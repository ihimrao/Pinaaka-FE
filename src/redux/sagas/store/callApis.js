import Axios from 'axios';

export const getDefaultHeaders = () => ({
    Authorization: `${ JSON.parse(JSON.parse(localStorage.getItem('persist:user'))?.userState)?.access_token }`,
});

export const callApi = ({
    uriEndPoint = {
        uri: '', method: 'GET', headerProps: {},
    },
    body,
}) => Axios({
    method: uriEndPoint.method || 'POST',
    url: uriEndPoint.uri || '',
    headers: {
        ...uriEndPoint.headerProps,
        ...getDefaultHeaders(),
    },
    data: body || undefined,
});
