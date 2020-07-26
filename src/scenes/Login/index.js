import React, { useState } from "react";
import { makeStyles, Grid, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_SNACKBAR_TEXT } from "../../services/store";
import { LOGIN_SUCCESS } from "./reducer";

const useStyles = makeStyles({
  root: {
    padding: 20,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  field: {
    margin: 10,
    width: "100%",
  },
});

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username === "admin" && password === "admin") {
      dispatch({
        type: LOGIN_SUCCESS,
        data: {
          isAuthenticated: true,
        },
      });
      history.push("/movie/list");
    } else {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: "Invalid Credentials",
          type: "error",
        },
      });
    }
  };
  return (
      <Grid container direction="column" alignItems="center" className={classes.root}>
        <Grid item xs={12} md={6} className={classes.field}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.field}>
          <TextField
            label="Passwod"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.buttonWrapper}>
          <Button
            variant="outlined"
            margin={15}
            color="secondary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Grid>
      </Grid>
  );
}
