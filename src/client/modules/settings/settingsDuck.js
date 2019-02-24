import { all, call, put, takeLatest } from 'redux-saga/effects';
import { settingsService } from '../../services/settingsService';

const SETTINGS_FETCH_REQUESTED = 'SETTINGS_FETCH_REQUESTED';
const SETTINGS_FETCH_SUCCEEDED = 'SETTINGS_FETCH_SUCCEEDED';
export const SETTINGS_FETCH_FAILED = 'SETTINGS_FETCH_FAILED';

const SETTINGS_PERSIST_REQUESTED = 'SETTINGS_PERSIST_REQUESTED';
const SETTINGS_PERSIST_SUCCEEDED = 'SETTINGS_PERSIST_SUCCEEDED';
const SETTINGS_PERSIST_FAILED = 'SETTINGS_PERSIST_FAILED';

/*
const settingsService = {
  read: async () => ({
    siteName: 'My Site',
  }),
  update: async () => ({
    message: 'persisting settings was successful',
  }),
}
*/

const initialState = {
  loading: false,
  error: false,
  settings: undefined,
}

export const settingsReducer = {
  settings: (state = initialState, action) => {
    switch (action.type) {
      case SETTINGS_FETCH_REQUESTED:
        return {
          loading: true,
          error: false,
          settings: undefined,
        };
      case SETTINGS_FETCH_SUCCEEDED:
        return {
          loading: false,
          error: false,
          settings: action.payload,
        };
      case SETTINGS_FETCH_FAILED:
        return {
          loading: false,
          error: true,
          settings: undefined,
        };
      default:
        return state;
    }
  },
};

export function fetchSettings() {
  return { type: SETTINGS_FETCH_REQUESTED };
}

function fetchSettingsSuccess(payload) {
  return { type: SETTINGS_FETCH_SUCCEEDED, payload };
}

function fetchSettingsError() {
  return { type: SETTINGS_FETCH_FAILED };
}

function* fetchSettingsAsync() {
  try {
    const settings = yield call(settingsService.read);
    yield put(fetchSettingsSuccess(settings));
  } catch (e) {
    yield put(fetchSettingsError(e.message));
  }
}

function* persistSettings(action) {
  try {
    yield call(settingsService.update, action.payload.settings);
    yield put({ type: SETTINGS_PERSIST_SUCCEEDED });
  } catch (e) {
    yield put({ type: SETTINGS_PERSIST_FAILED, message: e.message });
  }
}

export function* settingsSaga() {
  yield all([
    yield takeLatest(SETTINGS_FETCH_REQUESTED, fetchSettingsAsync),
    yield takeLatest(SETTINGS_PERSIST_REQUESTED, persistSettings),
  ]);
}

export function selectSettings(state) {
  return state.settings.settings;
}

export default {
  settingsReducer,
  settingsSaga,
  fetchSettings,
  selectSettings,
}
