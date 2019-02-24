import { all, call, put, takeLatest } from 'redux-saga/effects';
import { pageService } from '../../services/pageService';

export const PAGE_FETCH_REQUESTED = 'PAGE_FETCH_REQUESTED';
export const PAGE_FETCH_SUCCEEDED = 'PAGE_FETCH_SUCCEEDED';
export const PAGE_FETCH_FAILED = 'PAGE_FETCH_FAILED';

export const PAGE_PERSIST_REQUESTED = 'PAGE_PERSIST_REQUESTED';
export const PAGE_PERSIST_SUCCEEDED = 'PAGE_PERSIST_SUCCEEDED';
export const PAGE_PERSIST_FAILED = 'PAGE_PERSIST_FAILED';

/*
const pageService = {
  read: async (pageId) => {
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
  update: async () => ({
    message: 'persisting page was successful',
  }),
}
*/

const initialState = {
  loading: false,
  error: false,
  page: undefined,
}

export const pageReducer = {
  page: (state = initialState, action) => {
    switch (action.type) {
      case PAGE_FETCH_REQUESTED:
        return {
          loading: true,
          error: false,
          page: undefined,
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
          page: undefined,
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
    const page = yield call(pageService.read, action.payload.pageId);
    yield put(fetchPageSuccess(page));
  } catch (e) {
    yield put(fetchPageError(e.message));
  }
}

function* persistPageAsync(action) {
  try {
    yield call(pageService.update, action.payload.page);
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

export function selectPage(state) {
  return state.page.page;
}

export default {
  pageReducer,
  pageSaga,
  fetchPage,
  selectPage,
};
