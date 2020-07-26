import { LOGIN_SUCCESS, LOGOUT, initialState } from './reducer';

export default () => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    localStorage.setItem('auth', JSON.stringify(action.data));
  } else if (action.type === LOGOUT) {
    localStorage.setItem('auth', JSON.stringify(initialState));
  }
  return next(action);
};
