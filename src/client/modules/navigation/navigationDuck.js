import { call, put, takeLatest } from 'redux-saga/effects';
import { pagesService } from '../../services/pagesService';

const NAVIGATION_PAGES_READ_REQUESTED = 'NAVIGATION_PAGES_READ_REQUESTED';
const NAVIGATION_PAGES_READ_SUCCEEDED = 'NAVIGATION_PAGES_READ_SUCCEEDED';
const NAVIGATION_PAGES_READ_FAILED = 'NAVIGATION_PAGES_READ_FAILED';

const initialState = {
  loading: false,
  error: false,
  pages: [],
};

export const navigationReducer = {
  navigation: (state = initialState, action) => {
    switch (action.type) {
      case NAVIGATION_PAGES_READ_REQUESTED:
        return {
          ...initialState,
          loading: true,
        };
      case NAVIGATION_PAGES_READ_SUCCEEDED:
        return {
          ...initialState,
          pages: action.payload.pages,
        };
      case NAVIGATION_PAGES_READ_FAILED:
        return {
          ...initialState,
          error: true,
          errorMsg: action.payload.errorMsg,
        };
      default:
        return state;
    }
  },
};

export function readPages() {
  return { type: NAVIGATION_PAGES_READ_REQUESTED };
}

function readPagesSuccess(pages) {
  return { type: NAVIGATION_PAGES_READ_SUCCEEDED, payload: { pages } };
}

function readPagesError(errorMsg) {
  return { type: NAVIGATION_PAGES_READ_FAILED, payload: { errorMsg } };
}

function* readPagesAsync() {
  try {
    const pages = yield call(pagesService.readAll);
    yield put(readPagesSuccess(pages));
  } catch (e) {
    yield put(readPagesError(e.message));
  }
}

export function* navigationSaga() {
  yield takeLatest(NAVIGATION_PAGES_READ_REQUESTED, readPagesAsync);
}

export function selectPages(state) {
  return state.navigation.pages;
}

export default {
  navigationReducer,
  navigationSaga,
  readPages,
  selectPages,
};
