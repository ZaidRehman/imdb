export const formValidator = (data) => {
  if (
    data.name === "" ||
    data.director === "" ||
    data.imdb_score === "" ||
    data["99popularity"] === ""
  ) {
    throw Error("Please fill all fields");
  }
  return ({
    ...data,
    imdb_score: parseInt(data.imdb_score),
    "99popularity": parseInt(data["99popularity"]),
  });
};
