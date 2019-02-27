// import "regenerator-runtime/runtime";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { navigationSaga, navigationReducer } from './modules/navigation/navigationDuck';
import { settingsSaga, settingsReducer } from './modules/settings/settingsDuck';
import { pageSaga, pageReducer } from './modules/page/pageDuck';

export const history = createBrowserHistory();

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    ...navigationReducer,
    ...settingsReducer,
    ...pageReducer,
  });
}

export function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
      )
    ),
  );

  sagaMiddleware.run(function* rootSaga() {
    yield* navigationSaga();
    yield* settingsSaga();
    yield* pageSaga();
  });

  
  return store;
}
