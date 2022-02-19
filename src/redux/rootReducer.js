import { combineReducers } from 'redux';
import {  persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appStateReducer from './states/appState/appStateReducer';
import brickContentReducer from './states/brickContent/brickContentReducer';
import flagReducer from './states/flag/flagReducer';
import userReducer from './states/user/userReducer';
import contentReducer from './states/content/contentReducer';
import projectReducer from './states/project/projectReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'user', 'appState' ],
};
const userPersistConfig = {
    key: 'user',
    storage,
    blacklist: [ 'error' ],
};

const rootReducer = combineReducers({
    flags: flagReducer,
    user: persistReducer(userPersistConfig, userReducer),
    appState: appStateReducer,
    brickContent: brickContentReducer,
    content: contentReducer,
    project: projectReducer,
});

export default persistReducer(persistConfig, rootReducer);
