import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { pagesService } from '../../services/pagesService';
import { readNavigationPages } from '../navigation/navigationDuck';

const PAGE_READ_REQUESTED = 'PAGE_READ_REQUESTED';
const PAGE_READ_SUCCEEDED = 'PAGE_READ_SUCCEEDED';
const PAGE_READ_FAILED = 'PAGE_READ_FAILED';

const PAGE_UPDATE_REQUESTED = 'PAGE_UPDATE_REQUESTED';
const PAGE_UPDATE_SUCCEEDED = 'PAGE_UPDATE_SUCCEEDED';
const PAGE_UPDATE_FAILED = 'PAGE_UPDATE_FAILED';

const PAGE_REVERT = 'PAGE_REVERT';
const PAGE_TEMP_FIELD_VALUE_CHANGE = 'PAGE_TEMP_FIELD_VALUE_CHANGE';

const initialState = {
  loading: false,
  error: false,
  modified: false,
  page: undefined,
  tempPage: undefined,
};

export const pageReducer = {
  page: (state = initialState, action) => {
    switch (action.type) {
      case PAGE_READ_REQUESTED:
        return {
          ...initialState,
          loading: true,
        };
      case PAGE_READ_SUCCEEDED:
        return {
          ...initialState,
          page: action.payload,
          tempPage: action.payload,
        };
      case PAGE_READ_FAILED:
        return {
          ...initialState,
          error: true,
        };
      case PAGE_UPDATE_SUCCEEDED:
        return {
          ...state,
          page: state.tempPage,
        };
      case PAGE_REVERT:
        return {
          ...state,
          tempPage: state.page,
        };
      case PAGE_TEMP_FIELD_VALUE_CHANGE:
        return {
          ...state,
          modified: true,
          tempPage: {
            ...state.tempPage,
            [action.payload.fieldName]: action.payload.value,
          },
        };
      default:
        return state;
    }
  },
};

export function readPage(pageId) {
  return { type: PAGE_READ_REQUESTED, payload: { pageId } };
}

function readPageSuccess(payload) {
  return { type: PAGE_READ_SUCCEEDED, payload };
}

function readPageError() {
  return { type: PAGE_READ_FAILED };
}

function* readPageAsync(action) {
  try {
    const page = yield call(pagesService.read, action.payload.pageId);
    yield put(readPageSuccess(page));
  } catch (e) {
    yield put(readPageError(e.message));
  }
}

export function updatePage() {
  return { type: PAGE_UPDATE_REQUESTED };
}

function updatePageSuccess() {
  return { type: PAGE_UPDATE_SUCCEEDED };
}

function updatePageError() {
  return { type: PAGE_UPDATE_FAILED };
}

function* updatePageAsync() {
  try {
    const page = yield select(selectPage);
    yield call(pagesService.update, page.id, page);
    yield put(updatePageSuccess());
    yield put(readNavigationPages());
  } catch (e) {
    yield put(updatePageError(e.message));
  }
}

export function revertPage() {
  return { type: PAGE_REVERT };
}

export function changeTempFieldValue(fieldName, value) {
  return { type: PAGE_TEMP_FIELD_VALUE_CHANGE, payload: { fieldName, value } };
}

export function* pageSaga() {
  yield all([
    yield takeLatest(PAGE_READ_REQUESTED, readPageAsync),
    yield takeLatest(PAGE_UPDATE_REQUESTED, updatePageAsync),
  ]);
}

export function selectPage(state) {
  return state.page.tempPage;
}

export default {
  pageReducer,
  pageSaga,
  readPage,
  updatePage,
  selectPage,
};
