// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { isDev, isBrowser } from 'config';
import middlewares from './middleware';
import reducer from './reducer';
import sagas from './saga';

const devtools =
  isDev && isBrowser && window.devToolsExtension ? window.devToolsExtension : () => fn => fn;

const configureStore = (initialState: Object, services: Object = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const enhancers = [applyMiddleware(...middlewares, sagaMiddleware), devtools()];

  const store = createStore(reducer, initialState, compose(...enhancers));
  let sagaTask = sagaMiddleware.run(sagas, services);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default;
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('./saga', () => {
      const nextSagas = require('./saga').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas, services);
      });
    });
  }

  return store;
};

export default configureStore;
