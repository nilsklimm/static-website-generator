import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { pagesService } from '../../services/pagesService';
import { readPages } from '../navigation/navigationDuck';

const PAGE_READ_REQUESTED = 'PAGE_READ_REQUESTED';
const PAGE_READ_SUCCEEDED = 'PAGE_READ_SUCCEEDED';
const PAGE_READ_FAILED = 'PAGE_READ_FAILED';

const PAGE_UPDATE_REQUESTED = 'PAGE_UPDATE_REQUESTED';
const PAGE_UPDATE_SUCCEEDED = 'PAGE_UPDATE_SUCCEEDED';
const PAGE_UPDATE_FAILED = 'PAGE_UPDATE_FAILED';

const PAGE_REVERT_TEMP_CHANGES = 'PAGE_REVERT_TEMP_CHANGES';
const PAGE_TEMP_FIELD_VALUE_CHANGE = 'PAGE_TEMP_FIELD_VALUE_CHANGE';

const pageBlueprint = {
  id: 'new',
  slug: '',
  title: '',
  text: '',
};

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
          page: action.payload.page,
          tempPage: action.payload.page,
        };
      case PAGE_READ_FAILED:
        return {
          ...initialState,
          error: true,
          errorMsg: action.payload.errorMsg,
        };
      case PAGE_UPDATE_SUCCEEDED:
        return {
          ...initialState,
          page: state.tempPage,
          tempPage: state.tempPage,
        };
      case PAGE_REVERT_TEMP_CHANGES:
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

function readPageSuccess(page) {
  return { type: PAGE_READ_SUCCEEDED, payload: { page } };
}

function readPageError(errorMsg) {
  return { type: PAGE_READ_FAILED, payload: { errorMsg } };
}

function* readPageAsync(action) {
  try {
    const { pageId } = action.payload;
    const page = pageId === 'new'
      ? pageBlueprint
      : yield call(pagesService.read, action.payload.pageId);
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

function updatePageError(errorMsg) {
  return { type: PAGE_UPDATE_FAILED, payload: { errorMsg } };
}

function* updatePageAsync() {
  try {
    const page = yield select(selectPage);
    const pageId = page.id;

    if (pageId === 'new') {
      const { id: newPageId } = yield call(pagesService.create, page);
      yield put(push(`/pages/${newPageId}`));
    } else {
      yield call(pagesService.update, pageId, page);
      yield put(updatePageSuccess());
    }

    yield put(readPages());
  } catch (e) {
    yield put(updatePageError(e.message));
  }
}

export function revertTempPage() {
  return { type: PAGE_REVERT_TEMP_CHANGES };
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
