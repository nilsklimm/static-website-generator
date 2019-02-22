//import "regenerator-runtime/runtime";
import { call, put, takeLatest } from 'redux-saga/effects';

export const PAGES_FETCH_REQUESTED = 'PAGES_FETCH_REQUESTED';
export const PAGES_FETCH_SUCCEEDED = 'PAGES_FETCH_SUCCEEDED';
export const PAGES_FETCH_FAILED = 'PAGES_FETCH_FAILED';

const Api = {
  fetchPages: async () => ([
    { id: 'page1', title: 'My first Page' },
    { id: 'page2', title: 'My second Page' },

  ]),
}

const initialState = {
  loading: false,
  error: false,
  pages: [],
}

export const pagesReducer = {
  pages: (state = initialState, action) => {
    switch (action.type) {
      case PAGES_FETCH_REQUESTED:
        return {
          loading: true,
          error: false,
          pages: null,
        };
      case PAGES_FETCH_SUCCEEDED:
        return {
          loading: false,
          error: false,
          pages: action.payload,
        };
      case PAGES_FETCH_FAILED:
        return {
          loading: false,
          error: true,
          pages: null,
        };
      default:
        return state;
    }
  },
};

export function fetchPages(pageId) {
  return { type: PAGES_FETCH_REQUESTED, payload: { pageId } };
}

function fetchPagesSuccess(payload) {
  return { type: PAGES_FETCH_SUCCEEDED, payload };
}

function fetchPagesError() {
  return { type: PAGES_FETCH_FAILED };
}

function* fetchPageAsync() {
  try {
    const pages = yield call(Api.fetchPages);
    yield put(fetchPagesSuccess(pages));
  } catch (e) {
    yield put(fetchPagesError(e.message));
  }
}

export function* pagesSaga() {
  yield takeLatest(PAGES_FETCH_REQUESTED, fetchPageAsync);
}

export default {
  pagesReducer,
  pagesSaga,
  fetchPages
};
