import { put, call } from 'redux-saga/effects';
import { setOrganizationData } from '../../states/project/projectActions';

import { setUserData } from '../../states/user/userActions';
import { fetchOrganizationFromServer } from '../requests/organizationReq';

export function* handleFetchOrganization(action) {
    try {
        const response = yield call(() => fetchOrganizationFromServer(action?.auth || {}));
        const { data: { list } } = response;
        console.log(list);
        yield put(setOrganizationData(list));
    } catch (err) {
        const resp = JSON.stringify(err.response.data);
        const parseResp = JSON.parse(resp);
        console.error(resp);
        if (parseResp?.code === 401) {
            yield put(setUserData({}));
        } else {
            yield put(setOrganizationData({ error: parseResp?.msg }));
        }
    }
}

export default { handleFetchOrganization };
