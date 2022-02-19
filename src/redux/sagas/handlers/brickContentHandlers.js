import { put, call } from 'redux-saga/effects';
import { setNativeFields } from '../../states/brickContent/brickContentAction';
import { setUserData } from '../../states/user/userActions';
import { fetchNativeFieldsFromServer } from '../requests/brickContentReq';

export function* handleFetchNativeFields(action) {
    try {
        const response = yield call(() => fetchNativeFieldsFromServer(action?.auth || {}));
        const { data: { data } } = response;
        yield put(setNativeFields(data));
    } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
            yield put(setUserData({}));
        } else if (err.response.status === 404) {
            yield put(setNativeFields({ error: 'Not Found' }));
        }
    }
}

export default { handleFetchNativeFields };
