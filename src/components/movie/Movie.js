import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, NavLink, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import SinemaHall from "../cinemaHall/CinemaHall";
import "./movie.css";

// Click the btn and return to main page...
const history = createBrowserHistory();
const Movie = (props) => {
  return (
    <Router history={history}>
      <div className="movie">
        <figure>
          <img
            alt="movie poster"
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${props.poster_path}`}
          />
          <figcaption>
            <h2 className="movie__title">{props.title}</h2>
            <NavLink
              activeClassName="one"
              exact
              to={{ pathname: `/session1/${props.title}` }}>
              {props.session[1].movieTime[0]}
            </NavLink>
            <NavLink
              activeClassName="one"
              exact
              to={{ pathname: `/session2/${props.title}` }}>
              {props.session[1].movieTime[1]}
            </NavLink>

            <Switch>
              <Route path="/session1/" component={SinemaHall} />
              <Route path="/session2/" component={SinemaHall} />
            </Switch>
          </figcaption>
        </figure>
      </div>
    </Router>
  );
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
};

export default Movie;
