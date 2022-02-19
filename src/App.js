import React from 'react';
import {
    BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLayout from './container/AppLayout/AppLayout';
import PrivateRoute from './helpers/PrivateRoute';
import MainLayout from './container/MainLayout/MainLayout';
import ThemeWrapper from './assets/styles/theme';
import reduxStore from  './redux/reduxStore';
import Loading from './views/Loading/Loading';
import 'react-loading-skeleton/dist/skeleton.css';

const Organization = React.lazy(() => import('./views/organisation/Organisation'));
const Homepage = React.lazy(() => import('./views/Homepage/Homepage'));
const Login = React.lazy(() => import('./views/Login/Login'));

const App = () => (
    <div className="app-container" data-testid="app-container">
        <Provider store={reduxStore.store}>
            <PersistGate persistor={reduxStore.persistor}>
                <ThemeWrapper>
                    <AppLayout>
                        <Router>
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route path="/" exact component={Login} />
                                    <MainLayout>
                                        <PrivateRoute exact path="/admins" component={Organization} />
                                        <PrivateRoute exact path="/:orgId/keys" component={Homepage} />

                                    </MainLayout>

                                </Switch>
                            </React.Suspense>
                        </Router>
                    </AppLayout>
                </ThemeWrapper>
            </PersistGate>
        </Provider>

    </div>
);

export default App;
