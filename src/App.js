import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SNACKBAR_TEXT } from './services/store';
import CustomizedSnackbars from './components/Snackbar';
import Login from './scenes/Login';
import Movie from './scenes/Movie';


function App() {
  const dispatch = useDispatch();
  const snackbarText = useSelector(state => state.root.snackbarText);
  const snackbarType = useSelector(state => state.root.snackbarType);

  const handleClose = () => {
    dispatch({
      type: SET_SNACKBAR_TEXT,
      data: {
        text: '',
        type: '',
      },
    });
  };

  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/movie" />
        <Route path="/login" component={Login} />
        <Route path="/movie" component={Movie} />
      </Switch>
      <CustomizedSnackbars
        text={snackbarText}
        open={!!snackbarText}
        handleClose={handleClose}
        type={snackbarType}
      />
    </>
  );
}

export default App;
