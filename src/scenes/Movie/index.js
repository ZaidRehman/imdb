import React from "react";
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { Grid, makeStyles, Button } from "@material-ui/core";

import List from "./List";
import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "../../components/PrivateRoute";
import { LOGOUT } from "../Login/reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  header: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    height: 60,
    background: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  },
  title: {
    fontSize: 24,
    width: "fit-content",
    color: "#fff",
  },
  body: {
    height: "calc(100vh - 60px)",
    marginTop: 60,
    background: "#eaeaea",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
}));

export default function Movie() {
  const { url } = useRouteMatch();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = () => {
    history.push("/login");
  };
  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
      data: {
        isAuthenticated: true
      }
    });
  }
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.header}>
        <span className={classes.title}>IMDB</span>
        {(isAuthenticated && (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        )) || (
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Grid>
      <Grid item className={classes.body}>
        <Switch>
          <Redirect exact from={url} to={`${url}/list`} />
          <Route path={`${url}/list`} component={List} />
          <PrivateRoute
            authed={isAuthenticated}
            path={`${url}/form/:name`}
            component={Form}
          />
        </Switch>
      </Grid>
    </Grid>
  );
}
