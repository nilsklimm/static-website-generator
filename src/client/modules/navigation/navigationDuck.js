import { call, put, takeLatest } from 'redux-saga/effects';
import { pagesService } from '../../services/pagesService';

export const NAVIGATION_PAGES_FETCH_REQUESTED = 'NAVIGATION_PAGES_FETCH_REQUESTED';
export const NAVIGATION_PAGES_FETCH_SUCCEEDED = 'NAVIGATION_PAGES_FETCH_SUCCEEDED';
export const NAVIGATION_PAGES_FETCH_FAILED = 'NAVIGATION_PAGES_FETCH_FAILED';

/*
const pagesService = {
  read: async () => ([
    { id: 'page1', title: 'My first Page' },
    { id: 'page2', title: 'My second Page' },
  ]),
}
*/

const initialState = {
  loading: false,
  error: false,
  pages: [],
}

export const navigationReducer = {
  navigation: (state = initialState, action) => {
    switch (action.type) {
      case NAVIGATION_PAGES_FETCH_REQUESTED:
        return {
          loading: true,
          error: false,
          pages: [],
        };
      case NAVIGATION_PAGES_FETCH_SUCCEEDED:
        return {
          loading: false,
          error: false,
          pages: action.payload,
        };
      case NAVIGATION_PAGES_FETCH_FAILED:
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

export function fetchNavigationPages(pageId) {
  return { type: NAVIGATION_PAGES_FETCH_REQUESTED, payload: { pageId } };
}

function fetchNavigationPagesSuccess(payload) {
  return { type: NAVIGATION_PAGES_FETCH_SUCCEEDED, payload };
}

function fetchNavigationPagesError() {
  return { type: NAVIGATION_PAGES_FETCH_FAILED };
}

function* fetchNavigationPagesAsync() {
  try {
    const pages = yield call(pagesService.read);
    yield put(fetchNavigationPagesSuccess(pages));
  } catch (e) {
    yield put(fetchNavigationPagesError(e.message));
  }
}

export function* navigationSaga() {
  yield takeLatest(NAVIGATION_PAGES_FETCH_REQUESTED, fetchNavigationPagesAsync);
}

export function selectNavigationPages(state) {
  return state.navigation.pages;
}

export default {
  navigationReducer,
  navigationSaga,
  fetchNavigationPages,
  selectNavigationPages,
};
