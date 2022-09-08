import React from 'react';
import ReactDOM from 'react-dom';
// import {
//     HashRouter,
//     Route,
//     Switch
// } from 'react-router-dom';

import App from './Front/containers/App/App';
import AdminApp from './Admin/containers/App/App';

// import indexRoutes from './Front/routes/index.jsx';
// import adminRoutes from './Admin/routes/index.jsx';

// import registerServiceWorker from './registerServiceWorker';

import './Front/assets/css/bootstrap.min.css';
import './Front/assets/sass/light-bootstrap-dashboard.css';
import './Front/assets/css/demo.css';
import './Front/assets/css/pe-icon-7-stroke.css';
import './Front/assets/css/custom.css';

import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware} from 'react-router-redux';
import history from './Front/routes/history';
import adminHistory from './Admin/routes/history';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './Front/reducers';
import adminReducer from './Admin/reducers';
/*
ReactDOM.render((
    <HashRouter>
        <Switch>
            {
                indexRoutes.map((prop,key) => {
                    return (
                        <Route path={prop.path} component={prop.component}  key={key}/>
                    );
                })
            }
        </Switch>
    </HashRouter>
), document.getElementById('root'));
registerServiceWorker();*/

let userType = localStorage.getItem('userType');

let historyMiddleware = null;

let realReducer = reducer;

if(userType === 'admin'){
    historyMiddleware = routerMiddleware(adminHistory);
    realReducer = adminReducer;
}
else{
    historyMiddleware = routerMiddleware(history);
    realReducer = reducer;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    realReducer,
    composeEnhancers(
        applyMiddleware(historyMiddleware, thunk)
    )
)

if(userType === 'admin'){
    ReactDOM.render(
        <Provider store={store}>
        <ConnectedRouter store={store} history={history}>
            <AdminApp />
        </ConnectedRouter>
        </Provider>

        , document.getElementById('root')
    )
}
else{
    ReactDOM.render(
        <Provider store={store}>
        <ConnectedRouter store={store} history={history}>
            <App />
        </ConnectedRouter>
        </Provider>

        , document.getElementById('root')
    )
}