import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginMiddleware from '../scenes/Login/middleware';
import loginReducer from '../scenes/Login/reducer';
import movieReducer from '../scenes/Movie/reducer';

export const SET_SNACKBAR_TEXT = 'SET_SNACKBAR_TEXT';

export const showSnackbar = data => ({
  type: SET_SNACKBAR_TEXT,
  data,
});

const initialState = {
  snackbarText: '',
  snackbarType: 'warning',
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SNACKBAR_TEXT: {
      return {
        ...state,
        snackbarText: action.data.text,
        snackbarType: action.data.type,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  root: reducer,
  auth: loginReducer,
  movie: movieReducer,
});

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(loginMiddleware))
);
