import { put, call } from 'redux-saga/effects';
import { setApplicationFlags } from '../../states/flag/flagActions';
import { fetchApplicationFlags } from '../requests/flagReq';

export function* handleFetchFlags() {
    try {
        const response = yield call(fetchApplicationFlags);
        const { data } = response;
        yield put(setApplicationFlags(data));
    } catch (err) {
        console.log(err);
    }
}

export default handleFetchFlags;
