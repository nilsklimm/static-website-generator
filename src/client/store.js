// import "regenerator-runtime/runtime";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { navigationSaga, navigationReducer } from './modules/navigation/navigationDuck';
import { settingsSaga, settingsReducer } from './modules/settings/settingsDuck';
import { pageSaga, pageReducer } from './modules/page/pageDuck';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    ...navigationReducer,
    ...settingsReducer,
    ...pageReducer,
  }),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ),
);

sagaMiddleware.run(function* rootSaga() {
  yield* navigationSaga();
  yield* settingsSaga();
  yield* pageSaga();
});
