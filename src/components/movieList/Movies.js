import React from "react";
import PropTypes from "prop-types";
import Movie from "../movie/Movie";

import "./movieList.css";

const Movies = (props) => {
  return (
    <ul className="movies">
      {props.movies.map((movie) => (
        <li key={movie.id}>
          <Movie {...movie} session={props.movieSessions} />
        </li>
      ))}
    </ul>
  );
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default Movies;
