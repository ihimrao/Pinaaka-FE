import { takeLatest } from 'redux-saga/effects';
import types from '../types';
import { handleFetchFlags } from './handlers/flagHandler';
import { handleFetchUserData } from './handlers/userHandler';
import { handleFetchProjects } from './handlers/projectHandler';
import { handleFetchOrganization } from './handlers/organizationHandler';
import { handleBrickDetails, handleContentList, handleEditBrickContent } from './handlers/contentHandler';
import { handleFetchNativeFields } from './handlers/brickContentHandlers';

export function* watcherSaga() {
    yield takeLatest(types.flags.GET_ALL_FLAGS, handleFetchFlags);
    yield takeLatest(types.user.GET_USER_DATA, handleFetchUserData);
    yield takeLatest(types.project.GET_PROJECT_DATA, handleFetchProjects);
    yield takeLatest(types.organization.GET_ORGANIZATION_DATA, handleFetchOrganization);
    yield takeLatest(types.brickContent.GET_NATIVE_FIELDS, handleFetchNativeFields);
    yield takeLatest(types.content.FETCH_CONTENT_LIST, handleContentList);
    yield takeLatest(types.content.FETCH_BRICK_DETAILS, handleBrickDetails);
    yield takeLatest(types.content.EDIT_BRICK_CONTENT, handleEditBrickContent);
}

export default watcherSaga;
