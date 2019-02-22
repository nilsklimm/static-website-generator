//import "regenerator-runtime/runtime";
import { all, call, put, takeLatest } from 'redux-saga/effects';

export const PAGE_FETCH_REQUESTED = 'PAGE_FETCH_REQUESTED';
export const PAGE_FETCH_SUCCEEDED = 'PAGE_FETCH_SUCCEEDED';
export const PAGE_FETCH_FAILED = 'PAGE_FETCH_FAILED';

export const PAGE_PERSIST_REQUESTED = 'PAGE_PERSIST_REQUESTED';
export const PAGE_PERSIST_SUCCEEDED = 'PAGE_PERSIST_SUCCEEDED';
export const PAGE_PERSIST_FAILED = 'PAGE_PERSIST_FAILED';

const Api = {
  fetchPage: async (pageId) => {
    switch (pageId) {
      case 'page1':
        return {
          title: 'My first Page',
          content: [
            { type: 'p', text: 'First textbock' },
            { type: 'p', text: 'Second textbock' },
          ]
        };
      case 'page2':
        return {
          title: 'My second Page',
          content: [
            { type: 'p', text: 'First textbock' },
            { type: 'p', text: 'Second textbock' },
          ]
        };
      default:
        throw new Error(`Page ${pageId} not found`);
    }
  },
  persistPage: async () => ({
    message: 'persisting page was successful',
  }),
}

const initialState = {
  loading: false,
  error: false,
  page: null,
}

export const pageReducer = {
  page: (state = initialState, action) => {
    switch (action.type) {
      case PAGE_FETCH_REQUESTED:
        return {
          loading: true,
          error: false,
          page: null,
        };
      case PAGE_FETCH_SUCCEEDED:
        return {
          loading: false,
          error: false,
          page: action.payload,
        };
      case PAGE_FETCH_FAILED:
        return {
          loading: false,
          error: true,
          page: null,
        };
      default:
        return state;
    }
  },
};

export function fetchPage(pageId) {
  return { type: PAGE_FETCH_REQUESTED, payload: { pageId } };
}

function fetchPageSuccess(payload) {
  return { type: PAGE_FETCH_SUCCEEDED, payload };
}

function fetchPageError() {
  return { type: PAGE_FETCH_FAILED };
}

function* fetchPageAsync(action) {
  try {
    const page = yield call(Api.fetchPage, action.payload.pageId);
    yield put(fetchPageSuccess(page));
  } catch (e) {
    yield put(fetchPageError(e.message));
  }
}

function* persistPageAsync(action) {
  try {
    yield call(Api.persistPage, action.payload.page);
    yield put({ type: PAGE_PERSIST_SUCCEEDED });
  } catch (e) {
    yield put({ type: PAGE_PERSIST_FAILED, message: e.message });
  }
}

export function* pageSaga() {
  yield all([
    yield takeLatest(PAGE_FETCH_REQUESTED, fetchPageAsync),
    yield takeLatest(PAGE_PERSIST_REQUESTED, persistPageAsync),
  ]);
}

export default {
  pageReducer,
  pageSaga,
  fetchPage
};
