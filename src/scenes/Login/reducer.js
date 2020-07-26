export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const initialState = {
  isAuthenticated: false,
};
let persistedState;

if (localStorage.getItem('auth')) {
  persistedState = JSON.parse(localStorage.getItem('auth'));
}

const reducer = (state = persistedState || initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.data,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default reducer;
