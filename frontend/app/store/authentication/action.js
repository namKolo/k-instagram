// @flow

export const SENDING_REQUEST = 'SENDING_REQUEST';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const SET_TOKEN = 'SET_TOKEN';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export function loginRequest(params: { username: string, password: string }) {
  const { username, password } = params;
  return {
    type: LOGIN_REQUEST,
    payload: {
      username,
      password,
    },
  };
}
