import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  Chip,
  InputAdornment,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { formFactory } from "./factory";
import { formValidator } from "./validator";
import { ADD_MOVIE } from "../reducer";
import { SET_SNACKBAR_TEXT } from "../../../services/store";
import { useHistory, useParams } from "react-router-dom";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutlined";

const useStyles = makeStyles({
  root: {
    width: "auto",
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

export default function Form() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const movie = useSelector(store => store.movie.movieList.find(x => x.name === params.name))
  const dispatch = useDispatch();

  const [data, setData] = useState(formFactory());
  const [genre, setGenre] = useState("");

  const handleData = (d) => {
    setData({
      ...data,
      ...d,
    });
  };
  const handleDelete = (g) => {
    handleData({ genre: data.genre.filter((x) => x !== g) });
  };
  const addGenre = () => {
    if (genre) {
      handleData({ genre: [...data.genre, genre] });
      setGenre("");
    }
  };

  useEffect(() => {
    if(movie) {
      setData(movie)
    }
  }, [movie])

  const handleSubmit = () => {
    try {
      dispatch({
        type: ADD_MOVIE,
        data: formValidator(data),
      });
      history.push("/movie/list");
    } catch (e) {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: e.message,
          type: "error",
        },
      });
    }
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12} md={6} className={classes.field}>
        <TextField
          label="Movie Name"
          variant="outlined"
          fullWidth
          value={data.name}
          onChange={(e) => handleData({ name: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.field}>
        <TextField
          label="Director Name"
          variant="outlined"
          fullWidth
          value={data.director}
          onChange={(e) => handleData({ director: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.field}>
        <TextField
          label="IMDB Rating"
          variant="outlined"
          fullWidth
          type="number"
          value={data.imdb_score}
          onChange={(e) => handleData({ imdb_score: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.field}>
        <TextField
          label="99 Popularity"
          variant="outlined"
          fullWidth
          type="number"
          value={data["99popularity"]}
          onChange={(e) => handleData({ "99popularity": e.target.value })}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.field}>
        <Grid container direction="row">
          {data.genre.map((g) => (
            <Chip label={g} onDelete={() => handleDelete(g)} color="primary" />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={classes.field}>
        <TextField
          label="Add Genre"
          fullWidth
          variant="outlined"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={addGenre}>
                <AddCircleOutlined color="primary" />
              </InputAdornment>
            ),
          }}
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
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
