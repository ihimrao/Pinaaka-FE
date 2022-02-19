import {
    uploadImage,
} from '../../sagas/requests/organizationReq';

const uploadImages = (data) => uploadImage(data)
    .then((response) => response?.data?.data[ 0 ])
    .catch((error) => {
        const errorObj = {};
        if (error?.response?.status === 401) {
            errorObj.message = 'UNAUTHORISED';
        } else if (error?.response?.data?.message) {
            errorObj.message = error.response.data.message;
        } else {
            errorObj.message = 'Please Try again Later';
        }
        return errorObj;
    });

export default { uploadImages };
