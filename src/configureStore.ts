import { createStore, applyMiddleware, combineReducers, ReducersMapObject } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Redux from 'redux';
import thunk from 'redux-thunk';
// import { logger } from 'redux-logger';
import StoreReducers, { ApplicationState } from './store';

export default function configureStore(initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    // const windowIfDefined = typeof window === 'undefined' ? null : window as {};
    // If devTools is installed, connect to it
    // const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;
    const createStoreWithMiddleware = composeWithDevTools(
        applyMiddleware(thunk),
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(StoreReducers);
    const store = createStoreWithMiddleware(allReducers, initialState,
    ) as Redux.Store<ApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store/index', () => {
            const nextReducers = buildRootReducer(StoreReducers);
            store.replaceReducer(nextReducers);
        });
    }

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers));
}