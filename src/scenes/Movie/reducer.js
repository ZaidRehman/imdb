import movieList from "./movies.json";

export const ADD_MOVIE = "ADD_MOVIE";
export const REMOVE_MOVIE = "REMOVE_MOVIE";

export const initialState = {
  movieList,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MOVIE: {
      const movieIndex = state.movieList.findIndex(
        (x) => x.name === action.data.name
      );
      if (movieIndex > -1) {
        return {
          ...state,
          movieList: [
            ...state.movieList.slice(0, movieIndex),
            action.data,
            ...state.movieList.slice(movieIndex + 1),
          ],
        };
      } else {
        return {
          ...state,
          movieList: [...state.movieList, action.data],
        };
      }
    }
    case REMOVE_MOVIE: {
      return {
        ...state,
        movieList: state.movieList.filter((x) => x.name !== action.data),
      };
    }
    default:
      return state;
  }
};

export default reducer;
