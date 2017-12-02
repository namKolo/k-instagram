// @flow
import config from 'config';

let localStorage: Storage;

// If we're testing, use a local storage polyfill
if (global.process && config.env === 'test') {
  localStorage = require('localStorage');
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}

const authHelper = {
  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  },
  setToken(token: string) {
    localStorage.setItem('token', token);
  },
};

export default authHelper;
