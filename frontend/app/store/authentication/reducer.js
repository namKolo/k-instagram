// @flow
import { SENDING_REQUEST, REQUEST_ERROR, SET_TOKEN } from './action';

import auth from 'service/authentication';

// The initial application state
let initialState = {
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  token: '',
};

// Takes care of changing the application state
function reducer(state: Object = initialState, action: Object) {
  switch (action.type) {
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case REQUEST_ERROR:
      return { ...state, error: action.error };
    case SET_TOKEN:
      return { ...state, token: action.token, loggedIn: !!action.token };
    default:
      return state;
  }
}

export default reducer;
