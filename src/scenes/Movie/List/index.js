import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  Input,
  Select,
  Checkbox,
  ListItemText,
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import StickyHeadTable from "../../../components/StickyHeadTable";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@material-ui/icons";
import { REMOVE_MOVIE } from "../reducer";

const useStyles = makeStyles({
  root: {
    width: "auto",
    padding: 20,
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    margin: 15,
  },
  filter: {
    minWidth: 250,
    margin: 20,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function List() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.movie.movieList);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [data, setData] = useState([]);
  const [genre] = useState([...new Set(rows.map((s) => s.genre).flat())]);
  const [filter, setFilter] = useState([]);
  const [sortby, setSortBy] = useState("");
  const [search, setSearch] = useState("");

  const sortOptions = [
    { value: "name", text: "Name" },
    { value: "director", text: "Director" },
    { value: "99popularity", text: "99 Popularity" },
    { value: "imdb_score", text: "IMDB Rating" },
  ];
  const columns = [
    { id: "name", label: "Movie Name", minWidth: 170 },
    { id: "director", label: "Director", minWidth: 100 },
    {
      id: "imdb_score",
      label: "IMDB Score",
      minWidth: 170,
      align: "center",
    },
    {
      id: "99popularity",
      label: "99 Popularity",
      minWidth: 170,
      align: "center",
    },
    {
      id: "genre",
      label: "Genre",
      minWidth: 170,
      align: "left",
      component: (data) => data.genre.join(", "),
    },
  ];
  if (isAuthenticated) {
    columns.push({
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      component: (data) => (
        <Grid container direction="row">
          <Button color="primary" onClick={() => handleEdit(data)}>
            Edit
          </Button>
          <Button color="primary" onClick={() => handleDelete(data)}>
            Delete
          </Button>
        </Grid>
      ),
    });
  }

  const handleDelete = (d) => {
    dispatch({
      type: REMOVE_MOVIE,
      data: d.name,
    });
  };
  const handleEdit = (d) => {
    history.push("/movie/form/" + d.name);
  };
  const handleNewMovie = () => {
    history.push("/movie/form/0");
  };

  useEffect(() => {
    let d = [];
    if (filter.length > 0) {
      d = rows.filter((r) => r.genre.some((g) => filter.includes(g)));
    } else {
      d = rows;
    }
    if (search) {
      d = d.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.director.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortby) {
      d = [...d].sort((a, b) => {
        if (typeof a[sortby] === "string") {
          if (a[sortby] < b[sortby]) {
            return -1;
          }
          if (a[sortby] > b[sortby]) {
            return 1;
          }
          return 0;
        }
        return b[sortby] - a[sortby];
      });
    }
    setData(d);
  }, [rows, filter, sortby, search]);

  return (
    <Grid className={classes.root}>
      <Grid item className={classes.header}>
        {isAuthenticated && (
          <Button
            variant="outlined"
            margin={15}
            color="secondary"
            className={classes.button}
            onClick={handleNewMovie}
          >
            Add New Movie
          </Button>
        )}
        <FormControl variant="outlined" className={classes.filter}>
          <InputLabel id="genre-label">Filter</InputLabel>
          <Select
            labelId="genre-label"
            multiple
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip
                    color="primary"
                    key={value}
                    label={value}
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {genre.map((g) => (
              <MenuItem key={g} value={g}>
                <Checkbox checked={filter.indexOf(g) > -1} />
                <ListItemText primary={g} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.filter}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortby}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {sortOptions.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className={classes.filter}
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <StickyHeadTable columns={columns} rows={data} />
    </Grid>
  );
}
