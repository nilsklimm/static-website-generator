import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { settingsService } from '../../services/settingsService';

const SETTINGS_READ_REQUESTED = 'SETTINGS_READ_REQUESTED';
const SETTINGS_READ_SUCCEEDED = 'SETTINGS_READ_SUCCEEDED';
const SETTINGS_READ_FAILED = 'SETTINGS_READ_FAILED';

const SETTINGS_UPDATE_REQUESTED = 'SETTINGS_UPDATE_REQUESTED';
const SETTINGS_UPDATE_SUCCEEDED = 'SETTINGS_UPDATE_SUCCEEDED';
const SETTINGS_UPDATE_FAILED = 'SETTINGS_UPDATE_FAILED';

const SETTINGS_REVERT_TEMP_CHANGES = 'SETTINGS_REVERT_TEMP_CHANGES';
const SETTINGS_TEMP_FIELD_VALUE_CHANGE = 'SETTINGS_TEMP_FIELD_VALUE_CHANGE';

const initialState = {
  loading: false,
  error: false,
  modified: false,
  settings: undefined,
  tempSettings: undefined,
};

export const settingsReducer = {
  settings: (state = initialState, action) => {
    switch (action.type) {
      case SETTINGS_READ_REQUESTED:
        return {
          ...initialState,
          loading: true,
        };
      case SETTINGS_READ_SUCCEEDED:
        return {
          ...initialState,
          settings: action.payload.settings,
          tempSettings: action.payload.settings,
        };
      case SETTINGS_READ_FAILED:
        return {
          ...initialState,
          error: true,
          errorMsg: action.payload.errorMsg,
        };
      case SETTINGS_UPDATE_SUCCEEDED:
        return {
          ...initialState,
          settings: state.tempSettings,
          tempSettings: state.tempSettings,
        };
      case SETTINGS_REVERT_TEMP_CHANGES:
        return {
          ...state,
          tempSettings: state.settings,
        };
      case SETTINGS_TEMP_FIELD_VALUE_CHANGE:
        return {
          ...state,
          modified: true,
          tempSettings: {
            ...state.tempSettings,
            [action.payload.fieldName]: action.payload.value,
          },
        };
      default:
        return state;
    }
  },
};

export function readSettings() {
  return { type: SETTINGS_READ_REQUESTED };
}

function readSettingsSuccess(settings) {
  return { type: SETTINGS_READ_SUCCEEDED, payload: { settings } };
}

function readSettingsError(errorMsg) {
  return { type: SETTINGS_READ_FAILED, payload: { errorMsg } };
}

function* readSettingsAsync() {
  try {
    const settings = yield call(settingsService.read);
    yield put(readSettingsSuccess(settings));
  } catch (e) {
    yield put(readSettingsError(e.message));
  }
}

export function updateSettings() {
  return { type: SETTINGS_UPDATE_REQUESTED };
}

function updateSettingsSuccess() {
  return { type: SETTINGS_UPDATE_SUCCEEDED };
}

function updateSettingsError(errorMsg) {
  return { type: SETTINGS_UPDATE_FAILED, payload: { errorMsg } };
}

function* updateSettingsAsync() {
  try {
    const settings = yield select(selectSettings);
    yield call(settingsService.update, settings);
    yield put(updateSettingsSuccess());
  } catch (e) {
    yield put(updateSettingsError(e.message));
  }
}

export function revertTempSettings() {
  return { type: SETTINGS_REVERT_TEMP_CHANGES };
}

export function changeTempFieldValue(fieldName, value) {
  return { type: SETTINGS_TEMP_FIELD_VALUE_CHANGE, payload: { fieldName, value } };
}

export function* settingsSaga() {
  yield all([
    yield takeLatest(SETTINGS_READ_REQUESTED, readSettingsAsync),
    yield takeLatest(SETTINGS_UPDATE_REQUESTED, updateSettingsAsync),
  ]);
}

export function selectSettings(state) {
  return state.settings.tempSettings;
}

export default {
  settingsReducer,
  settingsSaga,
  readSettings,
  updateSettings,
  selectSettings,
};
