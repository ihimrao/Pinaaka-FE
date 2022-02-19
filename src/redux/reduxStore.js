import { compose, applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import { watcherSaga } from './sagas/watcherSaga';

// react saga setup
const sagaMiddleware =  createSagaMiddleware();

// redux setup
const initMiddleware = [ sagaMiddleware ];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancer(applyMiddleware(...initMiddleware));

const store = createStore(rootReducer, middleware);
const persistor = persistStore(store);

// start watcher for redux saga
sagaMiddleware.run(watcherSaga);

export default { store, persistor };
