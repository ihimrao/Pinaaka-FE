import { put, call } from 'redux-saga/effects';
import { setUserData, setLoginError } from '../../states/user/userActions';
import { fetchUserDataFromServer } from '../requests/userReq';

export function* handleFetchUserData(action) {
    try {
        yield put(setLoginError(''));
        const response = yield call(() => fetchUserDataFromServer(action?.sendData || {}));
        console.log('data => ', action?.sendData);

        const { data } = response;
        console.log('response => ', response);
        yield put(setUserData(data));
    } catch (err) {
        yield put(setLoginError(err.response));
    }
}

export default { handleFetchUserData };
