import { call, put, takeLatest } from 'redux-saga/effects';
import { pagesService } from '../../services/pagesService';

export const NAVIGATION_PAGES_READ_REQUESTED = 'NAVIGATION_PAGES_READ_REQUESTED';
export const NAVIGATION_PAGES_READ_SUCCEEDED = 'NAVIGATION_PAGES_READ_SUCCEEDED';
export const NAVIGATION_PAGES_READ_FAILED = 'NAVIGATION_PAGES_READ_FAILED';

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
          loading: true,
          error: false,
          pages: [],
        };
      case NAVIGATION_PAGES_READ_SUCCEEDED:
        return {
          loading: false,
          error: false,
          pages: action.payload,
        };
      case NAVIGATION_PAGES_READ_FAILED:
        return {
          loading: false,
          error: true,
          pages: [],
        };
      default:
        return state;
    }
  },
};

export function readNavigationPages() {
  return { type: NAVIGATION_PAGES_READ_REQUESTED };
}

function readNavigationPagesSuccess(payload) {
  return { type: NAVIGATION_PAGES_READ_SUCCEEDED, payload };
}

function readNavigationPagesError() {
  return { type: NAVIGATION_PAGES_READ_FAILED };
}

function* readNavigationPagesAsync() {
  try {
    const pages = yield call(pagesService.readAll);
    yield put(readNavigationPagesSuccess(pages));
  } catch (e) {
    yield put(readNavigationPagesError(e.message));
  }
}

export function* navigationSaga() {
  yield takeLatest(NAVIGATION_PAGES_READ_REQUESTED, readNavigationPagesAsync);
}

export function selectNavigationPages(state) {
  return state.navigation.pages;
}

export default {
  navigationReducer,
  navigationSaga,
  readNavigationPages,
  selectNavigationPages,
};
