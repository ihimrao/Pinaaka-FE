import {  call, put } from 'redux-saga/effects';
import {
    setContentError, setContentListLoading, setEditBrickContentLoading, storeBrickDetails, storeContentList, storeUpdatedBrickContent,
} from '../../states/content/contentAction';
import { editBrickContent, fetchBrickDetails, fetchContentList } from '../requests/contentReq';

export function* handleContentList({ payload }) {
    const { contentInfo } = payload;
    try {
        const response = yield call(() => fetchContentList(contentInfo));
        const { data } = response;
        yield put(storeContentList(data));
        if (Array.isArray(data.data) && data.data.length > 0) {
            yield put(setContentError({}));
            yield put(setContentListLoading(false));
        }
    } catch (err) {
        yield put(setContentListLoading(false));
        const resp = JSON.stringify(err.response);
        const parseResp = JSON.parse(resp);
        yield put(setContentError(parseResp));
    }
}

export function* handleBrickDetails({ payload }) {
    const { brickInfo } = payload;
    try {
        const response = yield call(() => fetchBrickDetails(brickInfo));
        const { data } = response;
        if (Array.isArray(data.data) && data.data.length > 0) {
            yield put(setContentError({}));
        }
        yield put(storeBrickDetails(data));
    } catch (err) {
        const resp = JSON.stringify(err.response);
        const parseResp = JSON.parse(resp);
        yield put(setContentError(parseResp));
    }
}

export function* handleEditBrickContent({ payload }) {
    const { pathParams, body } = payload.data;
    try {
        yield put(setEditBrickContentLoading(true));
        const response = yield call(() => editBrickContent({ pathParams, body }));
        const { data } = response;
        if (data?.message?.includes('SUCCESS')) {
            yield put(setContentError({}));
        }
        yield put(storeUpdatedBrickContent(data));
        yield put(setEditBrickContentLoading(false));
    } catch (err) {
        const resp = JSON.stringify(err.response);
        const parseResp = JSON.parse(resp);
        yield put(setEditBrickContentLoading(false));
        yield put(setContentError(parseResp));
    }
    return true;
}
