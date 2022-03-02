import { put, call } from 'redux-saga/effects';
import { setUserData, setLoginError } from '../../states/user/userActions';
import { setUserinfo, setGlobalinfo } from '../../states/user/userInfoAction';
import { fetchUserDataFromServer, fetchUserInfoFromServer, fetchGlobalInfoFromServer } from '../requests/userReq';

export function* handleFetchUserData(action) {
    try {
        yield put(setLoginError(''));
        const response = yield call(() => fetchUserDataFromServer(action?.sendData || {}));

        const { data } = response;

        yield put(setUserData(data));
    } catch (err) {
        yield put(setLoginError(err.response));
    }
}
export function* handleFetchUserInfo(action) {
    try {
        const response = yield call(() => fetchUserInfoFromServer(action?.auth || {}));
        const { data: daata } = yield call(() => fetchGlobalInfoFromServer(action?.auth || {}));
        console.log('=>', daata.data);
        const { data } = response;
        yield put(setUserinfo(data));
        yield put(setGlobalinfo(daata.data));
    } catch (err) {
        // yield put(setLoginError(err.response));
    }
}

export default { handleFetchUserData, handleFetchUserInfo };
