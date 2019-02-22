// import "regenerator-runtime/runtime";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { settingsSaga, settingsReducer } from './modules/settings/settingsDuck';
import { pageSaga, pageReducer } from './modules/page/pageDuck';
import { pagesSaga, pagesReducer } from './modules/pages/pagesDuck';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    ...settingsReducer,
    ...pageReducer,
    ...pagesReducer,
  }),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ),
);

sagaMiddleware.run(function* rootSaga() {
  yield* settingsSaga();
  yield* pageSaga();
  yield* pagesSaga();
});
