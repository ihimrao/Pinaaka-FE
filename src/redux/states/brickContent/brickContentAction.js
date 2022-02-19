import { useHistory } from 'react-router-dom';
import { createBricksInServer, deleteBricksFromServer } from '../../sagas/requests/brickContentReq';
import types from '../../types';
import { signoutUser } from '../user/userActions';

export const setInitState = () => ({
    type: types.brickContent.SET_INIT_CREATE_CONTENT_FORM,
});

export const updateCreateContentStack = (updatedStack = []) => ({
    type: types.brickContent.UPDATE_STACK,
    payload: updatedStack,
});

export const updateCurrentWidgetKey = (currentWidgetKey = null) => ({
    type: types.brickContent.SET_SELECTED_WIDGET_KEY,
    payload: currentWidgetKey,
});

export const updateCreateContentMetadata = (updatedObj) => ({
    type: types.brickContent.UPDATE_CREATE_CONTENT_META_DATA,
    payload: updatedObj,
});

export const getNativeFields = (auth) => ({
    type: types.brickContent.GET_NATIVE_FIELDS,
    auth,
});

export const setNativeFields = (fields) => ({
    type: types.brickContent.SET_NATIVE_FIELDS,
    payload: fields,
});

// create bricks
export const createBricks = (obj) => createBricksInServer(obj?.auth, obj.formObj, obj.projectId)
    .then((response) => ({
        status: response.status,
        data: response.data.data,
    }))
    .catch((error) => {
        const history = useHistory();
        const resp = JSON.stringify(error.response.data);
        const parseResp = JSON.parse(resp);
        if (parseResp.status === 401) {
            signoutUser();
            history.push('/');
        }
    });

export const deleteBrick = (obj) => deleteBricksFromServer(obj?.token, obj.projectId, obj.brickId)
    .then((response) => ({
        status: response.status,
        data: response.data.data,
    }))
    .catch((error) => {
        if (error.response.status === 401) {
            return { error: 'unauthorized' };
        } if (error.response.data.message) {
            return { error: error.response.data.message };
        }
        return { error: 'Please try again later.' };
    });

export default {
    setInitState,
    updateCreateContentStack,
};
