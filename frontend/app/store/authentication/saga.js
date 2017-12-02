import { takeEvery, call, put, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import api from 'service/api';
import auth from 'service/authentication';

import { LOGIN_REQUEST, SENDING_REQUEST, REQUEST_ERROR } from './action';

export function* authorize(
  api,
  action: {
    payload: {
      username: string,
      password: string,
    },
  },
) {
  const { payload } = action;

  yield put({ type: SENDING_REQUEST, sending: true });

  try {
    const response = yield call([api, api.post], '/login', payload);
    return response;
  } catch (error) {
    yield put({ type: REQUEST_ERROR, error: error.message });
  } finally {
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

export function* watchLoginRequest(
  api: typeof api,
  action: {
    payload: {
      username: string,
      password: string,
    },
    meta?: {
      thunk?: boolean,
    },
  },
) {
  const response = yield call(authorize, api, action);
  if (response) {
    const { token } = response;
    yield all([auth.setToken(token), api.setToken(token), put({ type: 'SET_TOKEN', token })]);
    yield put(push('/'));
  }
}

export default function* root(settings: { api: typeof api }) {
  const { api } = settings;
  yield takeEvery(LOGIN_REQUEST, watchLoginRequest, api);
}
