import { put, call } from 'redux-saga/effects';
import { setProjectData, setProjectError, setProjectLoading } from '../../states/project/projectActions';
import { fetchProjectsFromServer } from '../requests/projectReq';
import { setUserData } from '../../states/user/userActions';

export function* handleFetchProjects(action) {
    try {
        yield put(setProjectLoading(true));
        const response = yield call(() => fetchProjectsFromServer(action?.payload?.auth || {}, action?.payload?.orgId));
        const { data } = response;
        yield put(setProjectData(data.list));
        yield put(setProjectLoading(false));
    } catch (err) {
        if (err.response.status === 4011) {
            yield put(setUserData({}));
        } else if (err.response.data.message) {
            yield put(setProjectLoading(false));
            yield put(setProjectError(err.response.data.message));
        } else {
            yield put(setProjectLoading(false));
            yield put(setProjectError('Please try again later.'));
        }
    }
}

export default { handleFetchProjects };
